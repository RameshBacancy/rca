import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
// import { MatStepper } from '@angular/material/stepper';
// import { Router, ActivatedRoute } from '@angular/router';
// import { SupplierRegistrationService } from '../../../services/supplier-registration.service';
// import { FormGroup, FormControl, Validators } from '@angular/forms';
// import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
// import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
// import { AlertService } from 'src/app/services/alert.service';

@Component({
  templateUrl: './supplier-registration-process.component.html',
  selector: 'app-supplier-registration-process',
  styleUrls: ['./supplier-registration-process.component.scss']
})
export class SupplierRegistrationProcessComponent implements OnInit {

  // @ViewChild('mymodal') private hiddenBtn: ElementRef;
  @ViewChild('nodeInput' ) fileInput: ElementRef;
  isLocal: boolean = false;
  isIndividual: boolean = false;
  isInternational: boolean = false;

  status: string;
  approveRejectStatus: string;
  gotopath: string;
  closeResult: string;

  constructor(
    private alertService: AlertService,
    private router : Router,
    private modalService: NgbModal
    ) { }
    
  
  ngOnInit(): void { 
    this.modalService.dismissAll();
    localStorage.removeItem('1completeToken');
    if(localStorage.getItem('RegStatus') != 'finish') {
      if(localStorage.getItem('regType') === 'local'){
        this.isLocal = true
      }
      if(localStorage.getItem('regType') === 'individual'){
        this.isIndividual = true
      }
      if(localStorage.getItem('regType') === 'international'){
        this.isInternational = true
      }
    } else{
        this.alertService.pushWarning('You already completed your registration');
        this.router.navigateByUrl('/landing/supplier-registration/dashboard');
      }
  }
}
