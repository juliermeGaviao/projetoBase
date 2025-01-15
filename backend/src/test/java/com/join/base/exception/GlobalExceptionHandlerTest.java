package com.join.base.exception;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;

@SpringBootTest
class GlobalExceptionHandlerTest {

	@Autowired
	private ConfigurableEnvironment env;

	GlobalExceptionHandler globalExceptionHandler;

	@BeforeEach
	void setupAll() {
		env.setActiveProfiles("local");
		globalExceptionHandler = new GlobalExceptionHandler(env);
	}

	@Test
	void handleGenericExceptionTest() {
		ProblemDetail problem = globalExceptionHandler.handleException(new RuntimeException());

		assertEquals("Ocorreu um erro inesperado", problem.getDetail());
	}

	@Test
	void handleParametrizedMessageExceptionTest() {
		ProblemDetail problem = globalExceptionHandler.handleException(new ParametrizedMessageException(HttpStatus.INTERNAL_SERVER_ERROR, "Mensagem de Erro"));

		assertEquals("Mensagem de Erro", problem.getDetail());
	}

	@Test
	void handleGenericExceptionTestProfile() {
		env.setActiveProfiles("test");

		ProblemDetail problem = globalExceptionHandler.handleException(new RuntimeException());

		assertEquals("Ocorreu um erro inesperado", problem.getDetail());
	}

	@Test
	void handleParametrizedMessageExceptionTestProfile() {
		env.setActiveProfiles("test");

		ProblemDetail problem = globalExceptionHandler.handleException(new ParametrizedMessageException(HttpStatus.INTERNAL_SERVER_ERROR, "Mensagem de Erro"));

		assertEquals("Mensagem de Erro", problem.getDetail());
	}

}
