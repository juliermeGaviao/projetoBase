package com.join.base.configuration.security;

import static org.junit.jupiter.api.Assertions.assertNull;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class SCA2RoleTest {

	@Test
	void testAuthority() {
		SCA2Role role = new SCA2Role();

		assertNull(role.getAuthority());
	}

}
