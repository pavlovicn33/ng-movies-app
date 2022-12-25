import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss'],
})
export class PasswordDialogComponent implements OnInit {
  hide = true;
  password: string = '';

  constructor(private authService:AuthService) {}

  ngOnInit(): void {}

  submit(){
    this.authService.password = this.password
  }
}
