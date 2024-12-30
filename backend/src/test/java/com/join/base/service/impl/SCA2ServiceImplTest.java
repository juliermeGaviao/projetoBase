package com.join.base.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;

import com.join.base.configuration.security.SCA2Role;
import com.join.base.configuration.security.SCA2User;
import com.join.base.exception.LoginException;
import com.join.base.util.TestUtil;

@SpringBootTest
@AutoConfigureMockMvc
class SCA2ServiceImplTest {

	@Value("${spring.security.sca-logout}")
	private String sca2LogoutUrl;

	@Value("${spring.security.sca2-login-get-jwt}")
	private String urlDoLoginAndJwt;

	@Value("${spring.security.sca2-system-url}")
	private String sca2SystemUrl;

	@Value("${spring.security.sca-logout-redirect}")
	private String scaLogoutRedirect;

    SCA2ServiceImpl service;

	@Mock
	private HttpResponse<String> response;

    @BeforeEach
    void setUp() {
        service = new SCA2ServiceImpl(sca2LogoutUrl, urlDoLoginAndJwt, sca2SystemUrl, scaLogoutRedirect);

        final String adminRole =  "ROLE_MOD_LAF_INT_FUN_LAF_INT_FCA_ACESSAR";
		var fakeRole = new SCA2Role(adminRole);
		var fakeUser = new SCA2User();

		fakeUser.setEmail("fake-mail@fake.com");
		fakeUser.setLogin("fake-login");
		fakeUser.setNome("fakeName");
		fakeUser.setToken("fake-token");
		fakeUser.setRoles(List.of(fakeRole));
		fakeUser.setPodeAcessarSistema(true);

		var auth = new UsernamePasswordAuthenticationToken(fakeUser, "", fakeUser.getRoles());
		SecurityContextHolder.getContext().setAuthentication(auth);
    }

    @Test
    void login() throws Exception {
		when(response.statusCode()).thenReturn(200);
		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenReturn(response);

    	ResponseEntity<String> result = service.login("\"'ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq");

		assertTrue(result.getStatusCode().is2xxSuccessful());
    }

    @Test
    void loginInvalidTicket() {
        assertThrows(LoginException.class, () -> service.login(""));
        assertThrows(LoginException.class, () -> service.login("null"));
    }

    @Test
    void loginFailed() throws Exception {
		when(response.statusCode()).thenReturn(401);
		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenReturn(response);

    	ResponseEntity<String> result = service.login("\"'ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq");

		assertTrue(result.getStatusCode().is5xxServerError());
    }

    @Test
    void loginSCAConnectionFailed() throws Exception {
		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenThrow(IOException.class);

		ResponseEntity<String> result = service.login("ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq");

		assertTrue(result.getStatusCode().is5xxServerError());

		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenThrow(InterruptedException.class);

		result = service.login("ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq");

		assertTrue(result.getStatusCode().is5xxServerError());
    }

    @Test
    void logout() throws Exception {
		when(response.statusCode()).thenReturn(200);
		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenReturn(response);

    	ResponseEntity<String> result = service.logout();

		assertTrue(result.getStatusCode().is2xxSuccessful());
    }

    @Test
    void logoutUnsuccessfull() throws Exception {
		when(response.statusCode()).thenReturn(500);
		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenReturn(response);

    	ResponseEntity<String> result = service.logout();

		assertTrue(result.getStatusCode().is5xxServerError());
    }

    @Test
    void logoutWithoutCredential() throws Exception {
        var auth = new UsernamePasswordAuthenticationToken(null, "", null);
        SecurityContextHolder.getContext().setAuthentication(auth);

        ResponseEntity<String> result = service.logout();

		assertTrue(result.getStatusCode().is2xxSuccessful());
		assertEquals("Usuário não encontrado!", result.getBody());
    }

}