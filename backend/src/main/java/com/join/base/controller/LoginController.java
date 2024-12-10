package com.join.base.controller;

import static java.net.URLEncoder.encode;
import static java.nio.charset.StandardCharsets.UTF_8;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.join.base.service.SCA2Service;

@RestController
@RequestMapping("/sso")
public class LoginController {

	@Value("${spring.security.sca2-login-redirect}")
	private String loginRedirect;

	@Value("${spring.security.sca2-system-url}")
	private String sca2SystemUrl;

	private SCA2Service sca2Service;

	public LoginController(SCA2Service sca2Service) {
		this.sca2Service = sca2Service;
	}

	@PostMapping("/token")
	public ResponseEntity<String> getJWT(@RequestBody String ticket) throws UnsupportedEncodingException {
		return sca2Service.login(ticket);
	}

	@GetMapping("/login")
	public ResponseEntity<String> login() throws UnsupportedEncodingException {
		return ResponseEntity.ok(String.format(loginRedirect, encode(sca2SystemUrl, UTF_8.toString())));
	}

	@GetMapping("/logout")
	public ResponseEntity<String> logout() throws java.io.IOException, java.lang.InterruptedException {
		return sca2Service.logout();
	}

}
