import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-registration',
  templateUrl: './detailed-registration.component.html',
  styleUrls: ['./detailed-registration.component.scss']
})
export class DetailedRegistrationComponent implements OnInit {

 
  @ViewChild('stepper') private stepper: MatStepper;
  
  constructor(private router: Router) { }

  ngOnInit(): void {
   
  }


  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  Cancel(){
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

}
