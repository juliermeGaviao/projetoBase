package com.join.base.service;

import java.io.UnsupportedEncodingException;
import org.springframework.http.ResponseEntity;
import com.join.base.exception.LoginException;

public interface SCA2Service {

	public ResponseEntity<String> logout() throws java.io.IOException, java.lang.InterruptedException;

	public ResponseEntity<String> login(String ticket) throws LoginException, UnsupportedEncodingException;

}
