package com.join.base.configuration.security;

import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.core.env.ConfigurableEnvironment;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@SpringBootTest
@AutoConfigureMockMvc
class SecurityConfigurationTest {

	private SecurityConfiguration securityConfiguration;

	@Mock
	private SCA2TokenValidator validator;

	@Mock
	private ConfigurableEnvironment env;

	@Mock
	private HttpSecurity httpSecurity;

	@BeforeEach
    void setUp() {
		securityConfiguration = new SecurityConfiguration(validator, env);
    }

	@Test
	void securityFilterChain() throws Exception {
		when(env.matchesProfiles(anyString())).thenReturn(Boolean.FALSE);
		when(httpSecurity.csrf(any())).thenReturn(httpSecurity);
		when(httpSecurity.addFilterBefore(any(), any())).thenReturn(httpSecurity);
		when(httpSecurity.authorizeHttpRequests(any())).thenReturn(httpSecurity);
		when(httpSecurity.build()).thenReturn(null);

		SecurityFilterChain result = securityConfiguration.securityFilterChain(httpSecurity);

		assertNull(result);
	}

}
