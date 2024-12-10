package com.join.base.exception;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ProblemDetail;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

	private static final Logger loggerGlobal = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	private ConfigurableEnvironment env;

	public GlobalExceptionHandler(ConfigurableEnvironment env) {
		this.env = env;
	}

	/**
	 *
	 * @param e
	 * @return
	 */
	@ExceptionHandler(Exception.class)
	ProblemDetail handleException(Exception e) {
		ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.INTERNAL_SERVER_ERROR, e.getLocalizedMessage());

		problemDetail.setTitle("Erro Interno!");
		problemDetail.setDetail("Ocorreu um erro inesperado");
		loadTraceAndDate(problemDetail, e);

        if (!env.matchesProfiles("test")) {
        	loggerGlobal.error("Erro inesperado!", e);
        }

		return problemDetail;
	}

	/**
	 *
	 * @param e
	 * @return
	 */
	@ExceptionHandler(ParametrizedMessageException.class)
	ProblemDetail handleException(ParametrizedMessageException e) {
		ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(e.getHttpStatus(), e.getLocalizedMessage());

		problemDetail.setTitle(e.getTitle());
		problemDetail.setDetail(e.getDetail());
		loadTraceAndDate(problemDetail, e);

        if (!env.matchesProfiles("test")) {
        	loggerGlobal.error("Erro ParametrizedMessageException: ", e);
        }

		return problemDetail;
	}

	/**
	 *
	 * @param problemDetail
	 * @param e
	 */
	private void loadTraceAndDate(ProblemDetail problemDetail, Exception e) {
		problemDetail.setProperty("StackTrace", e.getStackTrace());
		problemDetail.setProperty("TimeStamp", Instant.now());
	}

	@ExceptionHandler(DataIntegrityViolationException.class)
	ProblemDetail handleLoginException(DataIntegrityViolationException e) {
		ProblemDetail problemDetail = ProblemDetail.forStatusAndDetail(HttpStatus.UNPROCESSABLE_ENTITY, e.getLocalizedMessage());

		problemDetail.setTitle("Erro de integridade no banco de dados");
		problemDetail.setDetail(e.getMessage());
		loadTraceAndDate(problemDetail, e);

		return problemDetail;
	}

}