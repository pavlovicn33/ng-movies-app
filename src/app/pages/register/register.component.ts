import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerUserForm: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder,private router: Router) {
    this.registerUserForm = this.fb.group({
      name:['' , [Validators.required]],
      lastName:['' , [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'
          ),
        ],
      ],
      rememberMe: '',
    });
  }
  
  ngOnInit(): void {
  }
  
  get f() {
    return this.registerUserForm.controls;
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
      return 'Your password must contain more then 8 characters and a special sign.'
    }
    return null
  }
  
}
