import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { User } from 'src/shared/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/shared/components/snackbar/snackbar.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {
  registerUserForm: FormGroup;
  emailForm: FormGroup;
  passwordForm: FormGroup;
  hide = true;
  user: User;
  userId: string = '';
  showError!: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore,
    private snackbar: MatSnackBar
  ) {
    this.user = {
      name: '',
      lastName: '',
      email: '',
    };

    this.emailForm = this.fb.group({
      newEmail: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
    this.passwordForm = this.fb.group({
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-zd$@$!%*?&](?=.*?[#?!@$%^&*-]).{8,}'),
        ],
      ],
      newPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-zd$@$!%*?&](?=.*?[#?!@$%^&*-]).{8,}'),
        ],
      ],
      confirmPassword: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-zd$@$!%*?&](?=.*?[#?!@$%^&*-]).{8,}'),
        ],
      ],
    });
    this.registerUserForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  async getUser() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    this.db
      .collection('users')
      .doc(userId)
      .get()
      .subscribe((data: any) => {
        this.user = data.data();
      });
  }

  get e() {
    return this.emailForm.controls;
  }
  get r() {
    return this.registerUserForm.controls;
  }
  get p() {
    return this.passwordForm.controls;
  }

  onEmailSubmit() {
    if (this.emailForm.invalid) {
      return;
    }
    this.authService.updateEmail(
      this.emailForm.value.email,
      this.emailForm.value.newEmail
    );
  }

  onSubmit() {
    if (this.registerUserForm.invalid) {
      return;
    }
    this.snackbar.openFromComponent(SnackbarComponent, {
      data: `Successfully changed name and last name`,
      duration: 2500,
    });
    this.authService.updateNameAndLastName(
      this.registerUserForm.value.name,
      this.registerUserForm.value.lastName
    );
  }

  getEmailError() {
    if (this.e['email'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.e['email'].hasError('email')) {
      return 'Email is invalid';
    }
    if (this.e['email'].hasError('pattern')) {
      return 'Email is invalid';
    }
    return null;
  }
  getNewEmailError() {
    if (this.e['newEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.e['newEmail'].hasError('email')) {
      return 'Email is invalid';
    }
    if (this.e['newEmail'].hasError('pattern')) {
      return 'Email is invalid';
    }
    return null;
  }

  getErrorMessagePassword() {
    if (this.p['password'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.p['password'].hasError('pattern')) {
      return 'Your password must contain more then 8 characters and a special sign.';
    }
    return null;
  }
}
