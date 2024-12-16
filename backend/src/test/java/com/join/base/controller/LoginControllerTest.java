package com.join.base.controller;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import com.join.base.service.SCA2Service;

@SpringBootTest
@AutoConfigureMockMvc
class LoginControllerTest {

	static final String API = "/sso";

	@Autowired
	MockMvc mockMvc;

	@MockBean
	private SCA2Service service;

	@Value("${spring.security.sca2-login-redirect}")
	private String loginRedirect;

	@Value("${spring.security.sca2-system-url}")
	private String sca2SystemUrl;

	@InjectMocks
	private LoginController controller = new LoginController(service, loginRedirect, sca2SystemUrl);

	@Test
	void getJWTTest() throws Exception {
		when(service.login(anyString())).thenReturn(ResponseEntity.ok("Sucesso"));

		mockMvc.perform(post(API + "/token").content("ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq").accept(MediaType.ALL)).andExpect(status().isOk());
	}

	@Test
	void loginTest() throws Exception {
		mockMvc.perform(get(API + "/login").accept(MediaType.ALL)).andExpect(status().isOk());
	}

	@Test
	void logoutTest() throws Exception {
		when(service.logout()).thenReturn(ResponseEntity.ok("Sucesso"));

		mockMvc.perform(get(API + "/logout").accept(MediaType.ALL)).andExpect(status().isOk());
	}

}
