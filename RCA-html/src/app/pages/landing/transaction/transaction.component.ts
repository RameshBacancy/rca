import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  
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
