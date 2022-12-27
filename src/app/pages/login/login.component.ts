import { DOCUMENT } from '@angular/common';
import { Component, OnInit, Renderer2, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginUserForm: FormGroup;
  hide = true;
  capsOn!: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private render: Renderer2,
    private route: ActivatedRoute,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.loginUserForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
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
    if (this.loginUserForm.invalid) {
      this.loginUserForm.reset();
      return;
    }
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
    if (this.f['email'].hasError('pattern')) {
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
