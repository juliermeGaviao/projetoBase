package com.join.base.configuration.security;

import java.io.IOException;
import java.net.http.HttpResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthFilter extends OncePerRequestFilter {

	private static final String AUTHORIZATION_HEADER = "Authorization";
	private static final String BEARER_PREFIX = "Bearer ";

	private final SCA2TokenValidator tokenValidator;

	public AuthFilter(SCA2TokenValidator tokenValidator) {
		this.tokenValidator = tokenValidator;
	}

	/**
	 * Realiza filtragem de requisições junto ao SCA 2, verificando a presença de um token válido de sessão de usuário.
	 *
	 * @param request
	 * @param response
	 * @param filterChain
	 * @throws ServletException
	 * @throws IOException
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
		String token = extractBearerToken(request);
		HttpResponse<String> sca2Response = tokenValidator.requestToSCA2(token);

		if (token != null && tokenValidator.validateToken(sca2Response)) {
			Authentication authentication = tokenValidator.getAuthentication(token, sca2Response);
			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}

	/**
	 * Extrai o token do Header do Request
	 * 
	 * @param request
	 * @return
	 */
	private String extractBearerToken(HttpServletRequest request) {
		String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(BEARER_PREFIX)) {
			return bearerToken.substring(7);
		}

		return null;
	}

}