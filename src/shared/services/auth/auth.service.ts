import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router:Router, private _snackBar: MatSnackBar) { }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000
    });
  }

  login(email:string,password:string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.router.navigate(['/ngmovies'])
      }else{
        this.openSnackBar('Confirm your account through email verification', 'X')
      }

    },err => {
      this.openSnackBar('The email adress or password is incorrect. Please try again', 'X')
      this.router.navigate(['/login'])
    })
  }

  register(email:string, password:string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      this.router.navigate(['/login'])
      this.openSnackBar('Confirmation Email Sent', 'X')
      this.sendEmailVerification(res.user)
    },err => {
      this.openSnackBar('The email address is badly formatted', 'X')
      this.router.navigate(['/registration'])
    })
  }

  signOut(){
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('token')
      this.router.navigate(['/login'])
    },err => {
      this.openSnackBar(err.message, 'X')
    })
  }

  forgotPassword(email:string) {
    this.fireauth.sendPasswordResetEmail(email).then( () => {
      this.openSnackBar('Email Sent', 'X')
    }, err => {
      this.router.navigate(['/verify-email'])
      this.openSnackBar('Something went wrong', 'X')
    })
  }

  sendEmailVerification(user: any){
    user.sendEmailVerification().subscribe((res:any) => {
      this.openSnackBar('Confirmation Email Sent', 'X')
    }, (err:any) => {
      this.openSnackBar('Something went wrong', 'X')
    })
  }
}
