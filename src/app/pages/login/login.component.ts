import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUserForm: FormGroup;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private render: Renderer2,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loginUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [Validators.required, Validators.pattern('[A-Za-zd$@$!%*?&].{8,}')],
      ],
      rememberMe: '',
    });
  }

  ngOnInit(): void {
    this.render.setAttribute(this.document.body, 'class', '');
  }

  get f() {
    return this.loginUserForm.controls;
  }

  onSubmit() {
    this.authService.login(
      this.loginUserForm.value.email,
      this.loginUserForm.value.password
    );
  }

  getErrorMessage() {
    if (this.f['email'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.f['email'].hasError('email')) {
      return 'Email is invalid';
    }
    return null;
  }

  getErrorMessagePassword() {
    if (this.f['password'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.f['password'].hasError('pattern')) {
      return 'Your password must contain more then 8 characters.';
    }
    return null;
  }
}
