import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from 'src/environments/environment';
import { verifyPasswordResetCode, confirmPasswordReset, checkActionCode, applyActionCode, sendPasswordResetEmail  } from "firebase/auth";

@Component({
  selector: 'app-email-handler',
  templateUrl: './email-handler.component.html',
  styleUrls: ['./email-handler.component.scss'],
})
export class EmailHandlerComponent implements OnInit {

  headerText:string = ''

  recoverEmailStatus:boolean = false
  verifyEmailStatus:boolean = false
  resetPasswordStatus:boolean = false

  constructor(private route: ActivatedRoute, private router:ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const mode = params['mode'];
      const actionCode = params['oobCode'];
      const lang = params['lang'] || 'en';

      const config = {
        apiKey: environment.firebase.apiKey,
      };
      const app = initializeApp(config);
      const auth = getAuth(app);

      switch (mode) {
        case 'resetPassword':
          this.resetPasswordStatus = true
          this.headerText = "Reset Password"
          this.handleResetPassword(auth, actionCode, lang);
          break;
        case 'recoverEmail':
          this.recoverEmailStatus = true
          this.headerText = "Recover your email"
          this.handleRecoverEmail(auth, actionCode, lang);
          break;
        case 'verifyEmail':
          this.verifyEmailStatus = true
          this.headerText = "Verify your email"
          this.handleVerifyEmail(auth, actionCode, lang);
          break;
        default:
      }
    });
  }

  handleResetPassword(auth:any, actionCode:any, lang:any) {
    verifyPasswordResetCode(auth, actionCode).then((email) => {
      const accountEmail = email;
      const newPassword = "...";
      confirmPasswordReset(auth, actionCode, newPassword).then((resp) => {

      }).catch((error) => {

      });
    }).catch((error) => {

    });
  }
  
  handleRecoverEmail(auth:any, actionCode:any, lang:any) {
    let restoredEmail:any = null;
    checkActionCode(auth, actionCode).then((info) => {
      restoredEmail = info['data']['email'];
  
      return applyActionCode(auth, actionCode);
    }).then(() => {

      sendPasswordResetEmail(auth, restoredEmail).then(() => {

      }).catch((error) => {

      });
    }).catch((error) => {

    });
  }

  handleVerifyEmail(auth:any, actionCode:any, lang:any) {
    applyActionCode(auth, actionCode).then((resp) => {
    }).catch((error) => {
 
    });
  }
}
