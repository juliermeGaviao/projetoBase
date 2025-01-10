import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  message: { state: string, text: string, show: boolean } = { state: '', text: '', show: false }

  showMessage(content: string, status: string, timer: number = null) {
    this.message = { state: status, text: content, show: true }

    if (timer) {
      setTimeout(() => { this.message = { state: '', text: '', show: false } }, timer)
    }
  }

}