import { environment } from './environment.prod'

describe('Environment Production', () => {
  it('should have production mode enabled', () => {
    expect(environment.production).toBe(true)
  })

  it('should have the correct API URL', () => {
    expect(environment.apiUrl).toBe(
      'https://bensapreendidos-rest.dev.ibama.gov.br/'
    )
  })

  it('should have the correct home URL', () => {
    expect(environment.home).toBe(
      'https://bensapreendidos.dev.ibama.gov.br/'
    )
  })
})
