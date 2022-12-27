import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { initializeApp, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import {
  verifyPasswordResetCode,
  confirmPasswordReset,
  checkActionCode,
  applyActionCode,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-email-handler',
  templateUrl: './email-handler.component.html',
  styleUrls: ['./email-handler.component.scss'],
})
export class EmailHandlerComponent implements OnInit {
  headerText: string = '';
  auth: any;
  actionCode: any;
  recoverEmailStatus: boolean = false;
  verifyEmailStatus: boolean = false;
  resetPasswordStatus: boolean = false;
  pass: string = '';
  expired: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private spinner: SpinnerService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  ngOnInit(): void {
    this.spinner.getSpinnerObserver();
    this.spinner.requestStarted();
    this.route.queryParams.subscribe((params) => {
      const mode = params['mode'];
      const actionCode = params['oobCode'];
      const lang = params['lang'] || 'en';

      if (firebase.apps.length === 0) {
        const app = initializeApp(environment.firebase);
        const auth = getAuth(app);
        this.auth = auth;
        this.actionCode = actionCode;
        switch (mode) {
          case 'resetPassword':
            this.handleResetPassword(auth, actionCode, lang);
            break;
          case 'recoverEmail':
            this.recoverEmailStatus = true;
            this.headerText = 'Recover your email';
            this.handleRecoverEmail(auth, actionCode, lang);
            break;
          case 'verifyEmail':
            this.handleVerifyEmail(auth, actionCode, lang);
            break;
          default:
        }
      }
    });
  }

  getPass(event: any) {
    this.pass = event;
    let actionCode = this.actionCode;
    if (this.actionCode.length !== 0) {
      actionCode = this.actionCode[0];
    }
    verifyPasswordResetCode(this.auth, this.actionCode[0])
      .then((email) => {
        this.resetPasswordStatus = true;
        this.headerText = 'Reset Password';
        const newPassword = this.pass;
        confirmPasswordReset(this.auth, actionCode, newPassword)
          .then((resp) => {
            this.openSnackBar('Password successfully changed.', 'X');
            this.router.navigate(['/login']);
          })
          .catch((error) => {});
      })
      .catch((error) => {
        this.expired = true;
        this.resetPasswordStatus = false;
      });
  }

  handleResetPassword(auth: any, actionCode: any, lang: any) {
    verifyPasswordResetCode(auth, actionCode[0])
      .then((email) => {
        this.resetPasswordStatus = true;
        this.headerText = 'Reset Password';
      })
      .catch((error) => {
        this.expired = true;
        this.resetPasswordStatus = false;
      });
  }

  handleRecoverEmail(auth: any, actionCode: any, lang: any) {
    let restoredEmail: any = null;
    checkActionCode(auth, actionCode)
      .then((info) => {
        this.recoverEmailStatus = true;
        this.headerText = 'Recover your email';
        restoredEmail = info['data']['email'];
        return applyActionCode(auth, actionCode);
      })
      .then(() => {
        sendPasswordResetEmail(auth, restoredEmail)
          .then(() => {})
          .catch((error) => {});
      })
      .catch((error) => {
        this.expired = true;
        this.recoverEmailStatus = false;
      });
  }

  handleVerifyEmail(auth: any, actionCode: any, lang: any) {
    applyActionCode(auth, actionCode)
      .then((resp) => {
        this.verifyEmailStatus = true;
        this.headerText = 'Verify your email';
      })
      .catch((error) => {
        this.expired = true;
        this.recoverEmailStatus = false;
      });
  }
}
