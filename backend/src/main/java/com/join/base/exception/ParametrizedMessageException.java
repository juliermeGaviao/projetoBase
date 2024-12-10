package com.join.base.exception;

import org.springframework.http.HttpStatus;


public class ParametrizedMessageException extends RuntimeException {

    private static final long serialVersionUID = 3768322017267470198L;

	private final HttpStatus httpStatus;
    private final String title;
    private final String detail;

    public ParametrizedMessageException(HttpStatus httpStatus, String titleCode, String message) {
        this.httpStatus = httpStatus;
        this.title = titleCode;
        this.detail = message;
    }

    public ParametrizedMessageException(HttpStatus httpStatus, String titleCode) {
        this.httpStatus = httpStatus;
        this.title = titleCode;
        this.detail = titleCode;
    }

    public HttpStatus getHttpStatus() {
        return httpStatus;
    }

    public String getTitle() {
        return title;
    }

    public String getDetail() {
        return detail;
    }
}