import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  loginUserForm: FormGroup;
  hide = true;
  capsOn!: any;
  @Output()
  emitPass: EventEmitter<string> = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.loginUserForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-zd$@$!%*?&](?=.*?[#?!@$%^&*-]).{8,}'),
        ],
      ],
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.loginUserForm.controls;
  }
  onSubmit() {
    if (this.loginUserForm.invalid) {
      this.loginUserForm.reset();
      return;
    }
    this.emitPass.emit(this.loginUserForm.value['password']);
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
