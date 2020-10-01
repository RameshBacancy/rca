import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit, AfterViewInit {

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  paymentComplete: boolean;

  constructor(private router: Router, private modelService: NgbModal) { }

  ngOnInit(): void { 
    this.modelService.dismissAll();
    
  }
  ngAfterViewInit(){
    if(localStorage.getItem('paymentStep')){
      this.move(2) 
    }
  }

  payment(){
    localStorage.setItem('paymentStep','true')
    if(localStorage.getItem('paymentStep')){
      this.router.navigate(['/landing/supplier-registration/payment']);
    }
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  Cancel(){
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }
}
