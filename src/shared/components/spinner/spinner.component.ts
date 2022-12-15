import { Component,OnInit,ChangeDetectorRef } from '@angular/core';
import { SpinnerService } from 'src/shared/services/spinner/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  showSpinner:boolean = false

  constructor(private spinnerService:SpinnerService,private cdRef:ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.spinnerService.getSpinnerObserver().subscribe((status:any) => {
      this.showSpinner = status === 'start'
      this.cdRef.detectChanges()
    })
  }
}
