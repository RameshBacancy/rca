import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  isLocal: boolean = false;
  isIndividual: boolean = false;
  isInternational: boolean = false;

  constructor(
    private modalService: NgbModal
    ) { }
    
  
  ngOnInit(): void { 
    this.modalService.dismissAll();
    if(localStorage.getItem('regType') === 'local'){
      this.isLocal = true
    }
    if(localStorage.getItem('regType') === 'individual'){
      this.isIndividual = true
    }
    if(localStorage.getItem('regType') === 'international'){
      this.isInternational = true
    }
  }
 
}
