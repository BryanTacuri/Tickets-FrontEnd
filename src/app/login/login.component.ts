import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

import { NzMessageService } from 'ng-zorro-antd/message';
import { ValueService } from '../services/value.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  validateFrm!: FormGroup;
  validateFrmRecuperar!: FormGroup;
  urlImageLogo: string;
  isVisible = false;
  passwordVisible = false;
  loading: boolean = false;
  constructor(
    private message: NzMessageService,
    private fb: FormBuilder,
    private router: Router,
    private userService: AuthService,
    private valueService: ValueService
  ) {
    this.valueService.CerrarSesion();
    this.urlImageLogo = 'assets/ticket.png';
  }

  ngOnInit(): void {
    this.validateFrm = this.fb.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
    this.validateFrmRecuperar = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }
  submitForm(): void {
    if (this.validateFrm.valid) {
      this.onLogin(this.validateFrm.value);
    } else {
      Object.values(this.validateFrm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  onLogin(formData: any): void {
    this.loading = true;

    this.userService.login(formData).subscribe({
      next: (res) => {
        this.loading = false;
        this.valueService.setIsAuth(true);
        this.valueService.isAuthenticated = true;

        this.valueService.setToken(res.access_token);
        this.valueService.setIsidAdmin(res.user.id);

        this.router.navigate(['/admin']);
      },
      error: (err) => {
        this.loading = false;
        this.message.error('Usuario o contraseña incorrectos');
      },
    });
  }
}
