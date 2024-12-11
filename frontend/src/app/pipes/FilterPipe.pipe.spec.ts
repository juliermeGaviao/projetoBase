import { FilterPipePipe } from '././FilterPipe.pipe'

describe('FilterPipePipe', () => {
  let pipe: FilterPipePipe

  beforeEach(() => {
    pipe = new FilterPipePipe()
  })

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy()
  })

  it('should return an empty array if items is null or undefined', () => {
    expect(pipe.transform(null, 'test')).toEqual([])
    expect(pipe.transform(undefined, 'test')).toEqual([])
  })

  it('should return the original array if searchText is empty', () => {
    const items = [
      { numero: '123', tipoSolicitacao: 'Request 1', situacao: 'Open', dataCriacao: '2024-11-19' },
    ]
    expect(pipe.transform(items, '')).toEqual(items)
  })

  it('should filter items based on searchText', () => {
    const items = [
      { numero: '123', tipoSolicitacao: 'Request 1', situacao: 'Open', dataCriacao: '2024-11-19' },
      { numero: '456', tipoSolicitacao: 'Request 2', situacao: 'Closed', dataCriacao: '2024-11-18' },
    ]
    const result = pipe.transform(items, '123')
    expect(result).toEqual([
      { numero: '123', tipoSolicitacao: 'Request 1', situacao: 'Open', dataCriacao: '2024-11-19' },
    ])
  })

  it('should return an empty array if no items match the searchText', () => {
    const items = [
      { numero: '123', tipoSolicitacao: 'Request 1', situacao: 'Open', dataCriacao: '2024-11-19' },
      { numero: '456', tipoSolicitacao: 'Request 2', situacao: 'Closed', dataCriacao: '2024-11-18' },
    ]
    const result = pipe.transform(items, '789')
    expect(result).toEqual([])
  })

  it('should filter items regardless of case sensitivity', () => {
    const items = [
      { numero: '123', tipoSolicitacao: 'Request 1', situacao: 'Open', dataCriacao: '2024-11-19' },
      { numero: '456', tipoSolicitacao: 'Request 2', situacao: 'Closed', dataCriacao: '2024-11-18' },
    ]
    const result = pipe.transform(items, 'request')
    expect(result).toEqual(items)
  })
})
