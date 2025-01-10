import { TestBed } from '@angular/core/testing'
import { MessageService } from "./message.service"

describe('MessageService', () => {
  let service: MessageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageService]
    })

    service = TestBed.inject(MessageService)
  })

  it('should show message for 10s', () => {
    service.showMessage('Sucesso', 'success', 10000)

    expect(service.message.text).toEqual('Sucesso')
  })

  it('should show message for indetermined time', () => {
    service.showMessage('Sucesso', 'success')

    expect(service.message.text).toEqual('Sucesso')
  })

})