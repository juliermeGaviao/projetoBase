import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  token: string;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) {}

  ngOnInit() {
    this.token = localStorage.getItem('token_SCA2')
    if(!this.token) {
      this.getAdressToPromoveTicket();
    } else {
      this.router.navigate(['home']);
    }
  }

  getAdressToPromoveTicket() {
    this.authService.login()
      .pipe(take(1))
      .subscribe({
        next: (resp: any) => {
          if (resp) {
            window.location.href = resp;
          }
        },
        error: (error) => {
          this.router.navigate(['error-page']);
        },
      });
  }
}