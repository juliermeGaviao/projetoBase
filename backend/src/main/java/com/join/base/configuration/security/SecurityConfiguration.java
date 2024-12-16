package com.join.base.configuration.security;

import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfiguration {

	private SCA2TokenValidator tokenValidator;

	private ConfigurableEnvironment env;

	public SecurityConfiguration(SCA2TokenValidator tokenValidator, ConfigurableEnvironment env) {
		this.tokenValidator = tokenValidator;
		this.env = env;
	}

	/**
	 *
	 * @param httpSecurity
	 * @return
	 * @throws Exception
	 */
	@Bean
	SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        if (env.matchesProfiles("test")) {
        	httpSecurity.authorizeHttpRequests(req -> req.anyRequest().permitAll());
		} else {
			// Intercepta os requests, verificando se estão autenticados
			httpSecurity.addFilterBefore(new AuthFilter(tokenValidator), UsernamePasswordAuthenticationFilter.class)

			// define os paths autorizados a excutar sem autenticação e os path necessários autenticação
			//.authorizeHttpRequests(req -> req.requestMatchers("/sso/**").permitAll().anyRequest().authenticated());
			.authorizeHttpRequests(req -> req.anyRequest().authenticated());
		}

        httpSecurity.cors(c -> c.configurationSource(this::getCorsConfiguration));

		return httpSecurity.build();
	}

	/**
	 * Regras de CORS do Sistema
	 * 
	 * @param request
	 * @return
	 */
	public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
		CorsConfiguration config = new CorsConfiguration();

		config.setAllowedOrigins(List.of("*"));
		config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
		config.setAllowedHeaders(List.of("*"));
		request.getClass();

		return config;
	}

	/**
	 * Configuration to make h2-console accessible without authentication
	 */
	@Bean
	WebSecurityCustomizer webSecurityCustomizer() {
		return web -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/h2-console/**"));
	}

	/**
	 * Configuration to make swagger accessible without authentication
	 */
	@Bean
	WebSecurityCustomizer webSecurityCustomizerSwagger() {
		return web -> web.ignoring()
				.requestMatchers(new AntPathRequestMatcher("/swagger-ui/**"))
				.requestMatchers(new AntPathRequestMatcher("/v3/api-docs/**"));
	}

}
