import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerUserForm: FormGroup;
  hide = true;
  showError!: any;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.registerUserForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
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
        [
          Validators.required,
          Validators.pattern('[A-Za-zd$@$!%*?&](?=.*?[#?!@$%^&*-]).{8,}'),
        ],
      ],
      rememberMe: '',
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.registerUserForm.controls;
  }

  onSubmit() {
    if (this.registerUserForm.invalid) {
      this.registerUserForm.reset();
      return;
    }
    this.authService.register(
      this.registerUserForm.value.email,
      this.registerUserForm.value.password,
      this.registerUserForm.value.name,
      this.registerUserForm.value.lastName
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
      return 'Your password must contain more then 8 characters and a special sign.';
    }
    return null;
  }
}
