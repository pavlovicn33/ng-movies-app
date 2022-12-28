import { DOCUMENT } from '@angular/common';
import { Component, Inject, Renderer2 } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { AuthService } from 'src/shared/services/auth/auth.service';
import { User } from 'src/shared/models/user';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from 'src/shared/components/snackbar/snackbar.component';
import { MyErrorStateMatcher } from 'src/shared/models/errorStateMatcherClass';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

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
  hideNewPass = true;
  hideConfirmPass = true;
  hideConfirmEmailPass = true;
  matcher = new MyErrorStateMatcher();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
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
          this.matchingValuesValidator('newEmail'),
        ],
      ],
      passwordEmail: [
        '',
        [
          Validators.required,
          Validators.pattern('[A-Za-zd$@$!%*?&](?=.*?[#?!@$%^&*-]).{8,}'),
        ],
      ],
    });
    this.passwordForm = this.fb.group(
      {
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
        confirmPassword: [''],
      },
      { validators: this.checkPasswords }
    );
    this.registerUserForm = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

  checkPasswords: ValidatorFn = (
    group: AbstractControl
  ): ValidationErrors | null => {
    let pass = group.get('newPassword')!.value;
    let confirmPass = group.get('confirmPassword')!.value;
    return pass === confirmPass ? null : { notSame: true };
  };
  matchingValuesValidator(controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      let email = this.user.email;
      if (email) {
        const matchingValue = email;
        if (control.value == matchingValue) {
          return { matchingValues: { value: control.value } };
        }
      }
      return null;
    };
  }

  async getUser() {
    const auth = getAuth();
    const userId = auth.currentUser?.uid;
    // this.db
    //   .collection('users')
    //   .doc(userId)
    //   .ref.onSnapshot(
    //     {
    //       includeMetadataChanges: true,
    //     },
    //     (doc: any) => {
    //       this.db
    //         .collection('users')
    //         .doc(userId)
    //         .get()
    //         .subscribe((data: any) => {
    //           this.user = data.data();
    //         });
    //     }
    // );
    this.db
      .collection('users')
      .doc(userId)
      .get()
      .subscribe((data: any) => {
        this.user = data.data();
        if (auth.currentUser?.email) {
          this.user.email = auth.currentUser?.email;
        }
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
      this.emailForm.value.newEmail,
      this.emailForm.value.passwordEmail,
      this.emailForm
    );
  }

  onPasswordSubmit() {
    if (this.passwordForm.invalid) {
      return;
    }
    this.authService.updatePassword(
      this.passwordForm.value.password,
      this.passwordForm.value.newPassword,
      this.passwordForm
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

  openDeleteModal() {
    this.authService.deleteAccount();
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

  getEmailPassError() {
    if (this.e['passwordEmail'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.e['passwordEmail'].hasError('pattern')) {
      return 'Your password must contain more then 8 characters and a special sign.';
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
  getErrorMessageNewPassword() {
    if (this.p['newPassword'].hasError('required')) {
      return 'You must enter a value';
    }

    if (this.p['newPassword'].value == this.p['password'].value) {
      return 'New password cannot be the same as old password.';
    }

    if (this.p['newPassword'].hasError('pattern')) {
      return 'Your password must contain more then 8 characters and a special sign.';
    }
    return null;
  }
}
