import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  
  loginUserForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,private router: Router) {
    this.loginUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
      rememberMe: '',
    });
  }
  
  ngOnInit(): void {
  }
  
  get f() {
    return this.loginUserForm.controls;
  }
  
  onSubmit(){
    console.log("qwe")
   
    
  }

  getErrorMessage(){
    if (this.f['email'].hasError('required')) {
      return 'You must enter a value';
    }
    
    if (this.f['email'].hasError('email')) {
      return 'Email is invalid';
    }
    return null
  }

  getErrorMessagePassword(){
    if (this.f['password'].hasError('required')) {
      return 'You must enter a value';
    }
    
    if (this.f['password'].hasError('pattern')) {
      return 'Your password must contain more then 8 characters.'
    }
    return null
  }
  

}
