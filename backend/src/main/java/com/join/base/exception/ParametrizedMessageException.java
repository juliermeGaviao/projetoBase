package com.join.base.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class ParametrizedMessageException extends RuntimeException {

    private static final long serialVersionUID = 3768322017267470198L;

	private final HttpStatus httpStatus;
    private final String title;
    private final String detail;

    public ParametrizedMessageException(HttpStatus httpStatus, String titleCode) {
        this.httpStatus = httpStatus;
        this.title = titleCode;
        this.detail = titleCode;
    }

}