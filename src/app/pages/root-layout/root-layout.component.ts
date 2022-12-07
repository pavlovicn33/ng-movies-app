import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/shared/services/auth/auth.service';

@Component({
  selector: 'app-root-layout',
  templateUrl: './root-layout.component.html',
  styleUrls: ['./root-layout.component.scss']
})
export class RootLayoutComponent implements OnInit {

  constructor(private authService:AuthService){

  }

  ngOnInit(): void {
      
  }

  signOut(){
    this.authService.signOut()
  }
}
