package com.join.base.configuration.security;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.security.core.Authentication;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletResponse;

@SpringBootTest
class AuthFilterTest {

	private AuthFilter filter;

	@Mock
	private SCA2TokenValidator validator;

	@Mock
	private HttpResponse<String> httpResponse;

	@Mock
	private Authentication authentication;

	@Mock
	private FilterChain filterChain;

	@Mock
	private HttpServletResponse response;

	@BeforeEach
    void setUp() {
		filter = new AuthFilter(validator);
    }

	@Test
	void doInternalFilter() throws IOException, ServletException {
		MockHttpServletRequest request = new MockHttpServletRequest();

		request.addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODgzNTUzNDAyMCIsImlhdCI6MTczMzE0MzQ4OH0.b2Qs-YiDVrSKHuZNT5FXLZDZM27gy8tjsJoUzSpfcVMDLkKyuVB0wPyYNtt542ckM65Rlnj0nKV4pscF8YUTfQ");

		when(validator.requestToSCA2(anyString())).thenReturn(httpResponse);
		when(validator.validateToken(any())).thenReturn(Boolean.TRUE);
		when(validator.getAuthentication(anyString(), any())).thenReturn(authentication);
		doNothing().when(filterChain).doFilter(any(), any());

		filter.doFilter(request, response, filterChain);

		assertNotNull(filter.getEnvironment());
	}

	@Test
	void doInternalFilterTokenNull() throws IOException, ServletException {
		MockHttpServletRequest request = new MockHttpServletRequest();

		when(validator.requestToSCA2(anyString())).thenReturn(httpResponse);
		when(validator.validateToken(any())).thenReturn(Boolean.TRUE);
		when(validator.getAuthentication(anyString(), any())).thenReturn(authentication);
		doNothing().when(filterChain).doFilter(any(), any());

		filter.doFilter(request, response, filterChain);

		assertNotNull(filter.getEnvironment());
	}

	@Test
	void doInternalFilterTokenEmpty() throws IOException, ServletException {
		MockHttpServletRequest request = new MockHttpServletRequest();

		request.addHeader("Authorization", "Bear");

		when(validator.requestToSCA2(anyString())).thenReturn(httpResponse);
		when(validator.validateToken(any())).thenReturn(Boolean.TRUE);
		when(validator.getAuthentication(anyString(), any())).thenReturn(authentication);
		doNothing().when(filterChain).doFilter(any(), any());

		filter.doFilter(request, response, filterChain);

		assertNotNull(filter.getEnvironment());
	}

	@Test
	void doInternalFilterInvalidToken() throws IOException, ServletException {
		MockHttpServletRequest request = new MockHttpServletRequest();

		request.addHeader("Authorization", "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODgzNTUzNDAyMCIsImlhdCI6MTczMzE0MzQ4OH0.b2Qs-YiDVrSKHuZNT5FXLZDZM27gy8tjsJoUzSpfcVMDLkKyuVB0wPyYNtt542ckM65Rlnj0nKV4pscF8YUTfQ");

		when(validator.requestToSCA2(anyString())).thenReturn(httpResponse);
		when(validator.validateToken(any())).thenReturn(Boolean.FALSE);
		when(validator.getAuthentication(anyString(), any())).thenReturn(authentication);
		doNothing().when(filterChain).doFilter(any(), any());

		filter.doFilter(request, response, filterChain);

		assertNotNull(filter.getEnvironment());
	}

}
