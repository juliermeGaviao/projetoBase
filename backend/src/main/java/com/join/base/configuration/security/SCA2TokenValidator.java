package com.join.base.configuration.security;

import static org.springframework.http.HttpStatus.OK;

import java.io.IOException;
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.join.base.exception.AuthException;

@Service
public class SCA2TokenValidator {

	private String urlToValidateJWT;

	public SCA2TokenValidator(@Value("${spring.security.sca-token-validator}") String urlToValidateJWT) {
		this.urlToValidateJWT = urlToValidateJWT;
	}

	/**
	 *
	 * @param token
	 * @return
	 */
	public HttpResponse<String> requestToSCA2(String token) {
		try (HttpClient client = HttpClient.newHttpClient()) {
			HttpRequest request = HttpRequest.newBuilder()
				.header("Authorization", "Bearer " + token)
				.uri(URI.create(urlToValidateJWT))
				.POST(HttpRequest.BodyPublishers.noBody())
				.build();

			return client.send(request, HttpResponse.BodyHandlers.ofString());
		} catch (IOException e) {
			throw new AuthException(e);
		} catch (InterruptedException e) {
			/* Clean up whatever needs to be handled before interrupting */
			Thread.currentThread().interrupt();
			throw new AuthException(e);
		}
	}

	/**
	 *
	 * @param response
	 * @return
	 */
	public boolean validateToken(HttpResponse<String> response) {
		return response.statusCode() == OK.value();
	}

	/**
	 *
	 * @param response
	 * @return
	 */
	public Authentication getAuthentication(String token, HttpResponse<String> response) {
		try {
			SCA2User sca2User = new ObjectMapper().disable(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES).readValue(response.body(), SCA2User.class);

			sca2User.setToken(token);

			return new UsernamePasswordAuthenticationToken(sca2User, "", sca2User.getRoles());
		} catch (JsonProcessingException e) {
			throw new AuthException(e);
		}
	}

}
