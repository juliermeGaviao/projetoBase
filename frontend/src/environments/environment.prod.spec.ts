import { environment } from './environment.prod'

describe('Environment Production', () => {
  it('should have production mode enabled', () => {
    expect(environment.production).toBe(true)
  })

  it('should have the correct API URL', () => {
    expect(environment.apiUrl).toBe(
      'http://127.0.0.1:8080/'
    )
  })

  it('should have the correct home URL', () => {
    expect(environment.home).toBe(
      'http://127.0.0.1:80/'
    )
  })
})
