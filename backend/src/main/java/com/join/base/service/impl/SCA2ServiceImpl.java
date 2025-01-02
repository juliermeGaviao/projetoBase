package com.join.base.service.impl;

import static java.net.URLEncoder.encode;
import static java.nio.charset.StandardCharsets.UTF_8;
import static org.springframework.http.HttpStatus.OK;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.join.base.configuration.security.SCA2User;
import com.join.base.exception.LoginException;
import com.join.base.service.SCA2Service;

@Service
public class SCA2ServiceImpl implements SCA2Service {

	private String sca2LogoutUrl;

	private String urlDoLoginAndJwt;

	private String sca2SystemUrl;

	private String scaLogoutRedirect;

	public SCA2ServiceImpl(
			@Value("${spring.security.sca-logout}") String sca2LogoutUrl,
			@Value("${spring.security.sca2-login-get-jwt}") String urlDoLoginAndJwt,
			@Value("${spring.security.sca2-system-url}") String sca2SystemUrl,
			@Value("${spring.security.sca-logout-redirect}") String scaLogoutRedirect) {
		this.sca2LogoutUrl = sca2LogoutUrl;
		this.urlDoLoginAndJwt = urlDoLoginAndJwt;
		this.sca2SystemUrl = sca2SystemUrl;
		this.scaLogoutRedirect = scaLogoutRedirect;
	}

	/***
	 *
	 * @return
	 * @throws Exception
	 */
	public ResponseEntity<String> logout() throws java.io.IOException, java.lang.InterruptedException {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

		if (!(authentication.getPrincipal() instanceof SCA2User)) {
			throw new LoginException(HttpStatus.BAD_REQUEST.value(), "Usuário não encontrado na sessão");
		}

		SCA2User sca2User = (SCA2User) authentication.getPrincipal();

		HttpRequest request = HttpRequest.newBuilder()
			.header("Authorization", "Bearer " + sca2User.getToken())
			.uri(URI.create(sca2LogoutUrl)).POST(HttpRequest.BodyPublishers.noBody())
			.build();

		try (HttpClient client = HttpClient.newHttpClient()) {
			HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

			if (response.statusCode() == OK.value()) {
				return ResponseEntity.ok(scaLogoutRedirect + encode(sca2SystemUrl, UTF_8.toString()));
			}

			return ResponseEntity.internalServerError().body("Erro ao realizar integração com SCA2");
		}
	}

	/***
	 *
	 * @param ticket
	 * @return
	 * @throws Exception
	 */
	public ResponseEntity<String> login(String ticket) throws LoginException, UnsupportedEncodingException {
		ticket = ticket.replace("\"", "").replace("'", "");

		if (ObjectUtils.isEmpty(ticket) || ticket.equals("null")) {
			throw new LoginException(HttpStatus.BAD_REQUEST.value(), "Token inválido");
		}

		HttpRequest request = HttpRequest.newBuilder()
				// informa a url cadastrada no SCA2 e o token recebido do '/cas/login'
				.uri(URI.create(String.format(urlDoLoginAndJwt, encode(sca2SystemUrl, UTF_8.toString()), ticket)))
				.POST(HttpRequest.BodyPublishers.noBody()).build();

		try (HttpClient client = HttpClient.newHttpClient()) {
			HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

			if (response.statusCode() == OK.value()) {
				return ResponseEntity.ok(response.body());
			} else {
				return ResponseEntity.internalServerError().body("Autenticação não realizada");
			}
		} catch (IOException e) {
			return ResponseEntity.internalServerError().body("Erro ao realizar a consulta no serviço SCA2");
		} catch (InterruptedException e) {
			Thread.currentThread().interrupt();
			return ResponseEntity.internalServerError().body("Erro ao realizar a consulta no serviço SCA2");
		}
	}

}
