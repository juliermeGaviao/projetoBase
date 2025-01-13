package com.join.base.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import org.springframework.http.ResponseEntity;
import com.join.base.exception.LoginException;

public interface SCA2Service {

	public ResponseEntity<String> logout() throws InterruptedException, IOException;

	public ResponseEntity<String> login(String ticket) throws LoginException, UnsupportedEncodingException;

}
