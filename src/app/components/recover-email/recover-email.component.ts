import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recover-email',
  templateUrl: './recover-email.component.html',
  styleUrls: ['./recover-email.component.scss']
})
export class RecoverEmailComponent implements OnInit{
  @Input()
  email:string = ''

  constructor() {}

  ngOnInit(): void {
      
  }

}
