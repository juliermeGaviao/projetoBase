package com.join.base.configuration.security;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SCA2User {

	private String token;
	private String login;
	private String nome;
	private long numPessoa;
	private String email;
	private boolean usuarioInterno;

	private ListaPerfilUnidades perfilUnidadesVinculadas;
	private List<SCA2Role> roles;
	private RoleSuprimida rolesSuprimidas;

	private String loginVia;
	private boolean emissorCertificadoSerpro;
	private String tipoFuncionario;
	private boolean podeAcessarSistema;
	private boolean autenticacaoMultifator;
	private String tipoCertificado;
	private boolean isRoleSuprimidaPorLoginSemCertificado;

}
