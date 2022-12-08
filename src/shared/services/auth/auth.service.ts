import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router:Router, private _snackBar: MatSnackBar,private db:AngularFirestore) { }

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

  register(email:string, password:string,name:string,lastName:string){
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      if (res.user) {
        this.db.collection('users').doc(res.user.uid).set({
          name:name,
          lastName:lastName,
          email:email
        })
      }
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
