package com.join.base.configuration.security;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.io.IOException;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.Authentication;

import com.join.base.exception.AuthException;
import com.join.base.util.TestUtil;

@SpringBootTest
@AutoConfigureMockMvc
class SCA2TokenValidatorTest {

	@Value("${spring.security.sca-token-validator}")
	private String urlToValidateJWT;

    private SCA2TokenValidator validator;

	@Mock
	private HttpResponse<String> response;

    @BeforeEach
    void setUp() {
    	validator = new SCA2TokenValidator(urlToValidateJWT);
    }

    @Test
    void requestToSCA2Test() throws Exception {
		when(response.statusCode()).thenReturn(200);
		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenReturn(response);

		HttpResponse<String> result = validator.requestToSCA2("ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq");

		assertEquals(200, result.statusCode());
    }

    @Test
    void requestToSCA2Exception() throws Exception {
		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenThrow(new IOException("Erro"));

		assertThrows(AuthException.class, () -> { validator.requestToSCA2("ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq"); });

		when(TestUtil.getHttpClientMock().send(any(HttpRequest.class), ArgumentMatchers.<HttpResponse.BodyHandler<String>>any())).thenThrow(new InterruptedException("Erro"));

		assertThrows(AuthException.class, () -> { validator.requestToSCA2("ST-3818-cvwwZuzQXiImPxj-3vuQwJbuJpssso2-bf65d944-f45kq"); });
    }

    @Test
    void validateTokenTest() {
		when(response.statusCode()).thenReturn(200);

		assertTrue(validator.validateToken(response));

		when(response.statusCode()).thenReturn(401);

		assertFalse(validator.validateToken(response));
    }

    @Test
    void getAuthenticationTest() {
    	String body = "{\"login\":\"99999999999\",\"nome\":\"Nononono\",\"numPessoa\":65178865,\"email\":\"nome@gmail.com\",\"usuarioInterno\":true,\"perfilUnidadesVinculadas\":{\"lstPerfilUnidades\":[]},\"roles\":[{\"authority\":\"ROLE_MOD_LAF_INT_FUN_LAF_INT_FCA_ACESSAR\"}],\"rolesSuprimidas\":{\"certificadoA3\":[],\"govBrOuro\":[],\"govBrPrata\":[]},\"loginVia\":\"USUARIO_SENHA\",\"emissorCertificadoSerpro\":false,\"tipoFuncionario\":\"1\",\"podeAcessarSistema\":true,\"autenticacaoMultifator\":false,\"tipoCertificado\":null,\"isRoleSuprimidaPorLoginSemCertificado\":false}";

		when(response.body()).thenReturn(body);

		Authentication authentication = validator.getAuthentication("token", response);

		assertTrue(authentication.isAuthenticated());
    }

}
