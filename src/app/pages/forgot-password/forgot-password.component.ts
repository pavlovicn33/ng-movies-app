import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/shared/services/auth/auth.service';
import {
  style,
  state,
  animate,
  transition,
  trigger,
} from '@angular/animations';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(1200, style({ opacity: 1 })),
      ]),
      transition(':leave', [animate(1200, style({ opacity: 0 }))]),
    ]),
  ],
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordUserForm: FormGroup;
  display: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordUserForm = this.fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.forgotPasswordUserForm.controls;
  }

  onSubmit() {
    if (this.forgotPasswordUserForm.invalid) {
      this.forgotPasswordUserForm.reset();
      return;
    }
    if (!this.getErrorMessage()) {
      this.authService.forgotPassword(
        this.forgotPasswordUserForm.value['email']
      );
      this.display = true;
    }
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
}
