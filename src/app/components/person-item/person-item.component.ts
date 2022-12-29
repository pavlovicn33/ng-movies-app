import { Component, Input, OnInit } from '@angular/core';
import { PeopleDetails } from 'src/shared/models/people';

@Component({
  selector: 'app-person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.scss']
})
export class PersonItemComponent implements OnInit{

  @Input()
  data!:PeopleDetails

  constructor() {}

  ngOnInit(): void {
      
  }
}
