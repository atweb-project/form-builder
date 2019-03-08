import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PasswordValidation, EmailValidation } from '../core/utils/validations';
import { AuthenticationService } from '../core/auth/authentication.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = '';
  loading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', EmailValidation],
      password: ['', PasswordValidation]
    });
  }

  async login(form: FormGroup) {
    this.loading = true;
    this.authenticationService
      .login(form.value.email, form.value.password)
      .subscribe(
        authStatus => {
          this.loading = false;
          this.router.navigate(['/']);
        },
        error => (
          (this.loading = false),
          (this.loginError = error),
          this.snackBar.open(error.message, '', {
            duration: 7000
          })
        )
      );
  }
}
