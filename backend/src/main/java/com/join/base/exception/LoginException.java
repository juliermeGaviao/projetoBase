package com.join.base.exception;

public class LoginException extends RuntimeException {

    private static final long serialVersionUID = 2505085615663441379L;

	private final int codeStatus;

    public LoginException(int status, String msg) {
        super(msg);
        this.codeStatus = status;
    }

    public int getCodeStatus() {
        return codeStatus;
    }
}