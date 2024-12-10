export interface UsuarioResponse {
  sessionToken: string
  service: string
  usuario: Usuario
}

export interface Usuario {
  login: string
  nome: string
  numPessoa: number
  email: any
  usuarioInterno: boolean
  perfilUnidadesVinculadas: PerfilUnidadesVinculadas
  roles: any[]
  rolesSuprimidas: RolesSuprimidas
  loginVia: string
  emissorCertificadoSerpro: boolean
  tipoFuncionario: string
  podeAcessarSistema: boolean
  autenticacaoMultifator: boolean
  tipoCertificado: any
  isRoleSuprimidaPorLoginSemCertificado: boolean
}

export interface PerfilUnidadesVinculadas {
  lstPerfilUnidades: any[]
}

export interface RolesSuprimidas {
  certificadoA3: any[]
  govBrOuro: any[]
  govBrPrata: any[]
}
