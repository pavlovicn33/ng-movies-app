import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, TitleStrategy } from '@angular/router';
import {
  getAuth,
  updateEmail,
  sendEmailVerification,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updatePassword,
  deleteUser,
} from 'firebase/auth';
import { Observable } from 'rxjs';
import { PasswordDialogComponent } from 'src/app/components/password-dialog/password-dialog.component';
import { environment } from 'src/environments/environment';
import { DialogComponent } from 'src/shared/components/dialog/dialog.component';
import { GoogleAuthProvider } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  password: string = '';
  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private _snackBar: MatSnackBar,
    private db: AngularFirestore,
    public dialog: MatDialog,
    private http: HttpClient
  ) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
    });
  }

  googleSignIn() {
    return this.authLogin(new GoogleAuthProvider());
  }

  authLogin(provider: any) {
    return this.fireauth
      .signInWithPopup(provider)
      .then((result) => {
        if (result.user?.emailVerified == true) {
          let e = this.db.collection('users').doc(result.user.uid).get();
          e.forEach((el) => {
            if (!el.exists) {
              if (result.user) {
                this.db
                  .collection('users')
                  .doc(result.user.uid)
                  .set({
                    name: result.user.displayName?.split(' ')[0],
                    lastName: result.user.displayName?.split(' ')[1],
                    email: result.user.email,
                    subscription: 'Free',
                  });
              }
            }
          });
          localStorage.setItem('token', 'true');
          this.getSessionTmdb();
          this.router.navigate(['/ngmovies/subscriptions']);
        } else {
          this.openSnackBar(
            'Confirm your account through email verification',
            'X'
          );
          this.sendEmailVerification(result.user);
        }
      })
      .catch((error) => {
        if (error.code == 'auth/too-many-requests') {
          this.openSnackBar(
            'Access to this account has been temporarily disabled due to many failed login attempts. Try again later',
            'X'
          );
          return;
        }
        this.router.navigate(['/login']);
      });
  }

  getSessionTmdb() {
    this.http
      .get(
        `${environment.baseURL}/authentication/guest_session/new${environment.apiKey}`
      )
      .subscribe((data: any) => {
        localStorage.setItem('sessionTmdb', `${data.guest_session_id}`);
      });
  }

  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user?.emailVerified == true) {
          localStorage.setItem('token', 'true');
          this.getSessionTmdb();
          this.router.navigate(['/ngmovies/subscriptions']);
        } else {
          this.openSnackBar(
            'Confirm your account through email verification',
            'X'
          );
          this.sendEmailVerification(res.user);
        }
      },
      (err) => {
        if (err.code == 'auth/too-many-requests') {
          this.openSnackBar(
            'Access to this account has been temporarily disabled due to many failed login attempts. Try again later',
            'X'
          );
          return;
        }
        this.openSnackBar(
          'The email adress or password is incorrect. Please try again',
          'X'
        );
        this.router.navigate(['/login']);
      }
    );
  }

  register(email: string, password: string, name: string, lastName: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(
      (res) => {
        if (res.user) {
          this.db.collection('users').doc(res.user.uid).set({
            name: name,
            lastName: lastName,
            email: email,
            subscription: 'Free',
          });
        }
        this.openSnackBar('Confirmation Email Sent', 'X');
        this.sendEmailVerification(res.user);
        this.router.navigate(['/login']);
      },
      (err) => {
        this.openSnackBar('The email address is badly formatted', 'X');
        this.router.navigate(['/registration']);
      }
    );
  }

  signOut() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        this.openSnackBar(err.message, 'X');
      }
    );
  }

  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(
      () => {
        this.openSnackBar('Confirmation Email Sent', 'X');
      },
      (err) => {
        this.router.navigate(['/verify-email']);
        this.openSnackBar('Something went wrong', 'X');
      }
    );
  }

  sendEmailVerification(user: any) {
    user.sendEmailVerification();
  }

  updateNameAndLastName(name: string, lastName: string) {
    let id = getAuth().currentUser?.uid;
    this.db.collection('users').doc(id).update({
      name: name,
      lastName: lastName,
    });
  }

  addProfileImage(file: string) {
    let id = getAuth().currentUser?.uid;
    this.db.collection('users').doc(id).update({
      profileImage: file,
    });
    this.openSnackBar('You have successfully changed your profile image', 'X');
  }

  updateSubscription(subscription: string, subscriptionId?: string) {
    let id = getAuth().currentUser?.uid;
    this.db.collection('users').doc(id).update({
      subscription: subscription,
    });
    if (subscriptionId) {
      this.db.collection('users').doc(id).update({
        subscriptionId: subscriptionId,
      });
    }
  }

  async updateEmail(newEmail: string, password: string, form: FormGroup) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        option: 'email',
        title: 'Confirmation',
        description: 'this action will update your',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        const user = getAuth().currentUser;
        if (user && user.email) {
          const credential = EmailAuthProvider.credential(user.email, password);
          reauthenticateWithCredential(user, credential).then(
            () => {
              updateEmail(user, newEmail).then(
                () => {
                  sendEmailVerification(user).then(() => {});
                  this.openSnackBar('Confirmation Email Sent', 'X');
                  this.db.collection('users').doc(user?.uid).update({
                    email: newEmail,
                  });
                },
                (error) => {
                  this.openSnackBar('The email adress is already in use.', 'X');
                }
              );
            },
            (error) => {
              form.reset();
              this.openSnackBar(
                'The password is incorrect. Please try again',
                'X'
              );
            }
          );
        }
        return;
      }
      this.openSnackBar('You have cancelled', 'X');
    });
  }
  async updatePassword(
    currentPassword: string,
    newPassword: string,
    form: FormGroup
  ) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        option: 'password',
        title: 'Confirmation',
        description: 'this action will update your',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        const user = getAuth().currentUser;
        if (user && user.email) {
          const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
          );
          reauthenticateWithCredential(user, credential).then(
            () => {
              if (currentPassword == newPassword) {
                form.reset();
                this.openSnackBar(
                  'New password cannot be same as old password',
                  'X'
                );
                return;
              }
              updatePassword(user, newPassword).then(() => {
                sendEmailVerification(user).then(() => {});
              });
              form.reset();
              this.openSnackBar('Password successfully changed', 'X');
            },
            (error) => {
              form.reset();
              this.openSnackBar(
                'The password is incorrect. Please try again',
                'X'
              );
            }
          );
        }
        return;
      }
      this.openSnackBar('You have cancelled', 'X');
    });
  }

  deleteAccount() {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: {
        title: 'Delete Confirmation',
        description:
          'Deleting this data will permanently remove your account, and this cannot be recovered.',
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == true) {
        this.dialog
          .open(PasswordDialogComponent)
          .afterClosed()
          .subscribe((result) => {
            if (result == true) {
              const user = getAuth().currentUser;
              if (user && user.email) {
                const credential = EmailAuthProvider.credential(
                  user.email,
                  this.password
                );
                reauthenticateWithCredential(user, credential).then(
                  () => {
                    deleteUser(user).then(() => {
                      sendEmailVerification(user).then(() => {});
                    });
                    this.router.navigate(['/login']);
                    this.openSnackBar('Account deleted', 'X');
                  },
                  (error) => {
                    this.openSnackBar(
                      'The password is incorrect. Please try again',
                      'X'
                    );
                  }
                );
              }
              return;
            }
            this.openSnackBar('You have cancelled', 'X');
          });
      }
    });
  }

  getCurrency(): Observable<any> {
    const headerDict = {
      apiKey: `${environment.currencyApiKey}`,
    };
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.get<any>(
      `${environment.currencyBaseURL}/latest?currencies=EUR%2CUSD%2CGBP&base_currency=EUR`,
      requestOptions
    );
  }

  sendEmail() {
    return this.http.get('https://backend-gwhl.onrender.com/sendMail');
  }
}
