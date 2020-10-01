import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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

    private router : Router,
    private modalService: NgbModal
    ) { }
    
  
  ngOnInit(): void { 
    this.modalService.dismissAll();
    localStorage.removeItem('abcd')
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
 
  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.
    if(!localStorage.getItem('abcd')){
      if(localStorage.getItem('RegStatus') === 'finish') {
        this.fileInput.nativeElement.click();
      }
    }
    
  }
  onRegistrationClick(){
    if(localStorage.getItem('RegStatus') === 'finish') {
      if(localStorage.getItem('arStatus') === 'pending') {
        this.status = "Wait For Approval";
        this.approveRejectStatus = "You finish your registration proccess. <br/> Admin will shortly review your details.  <br/>"
        this.gotopath = '/#/landing/supplier-registration/dashboard';
      } else if(localStorage.getItem('arStatus') === 'approved') {
        this.status = "Approved";
        this.approveRejectStatus = "Your Registration request is Approved by the Admin. <br/> For further procedure complete your payment. <br/>"
        this.gotopath = '/#/landing/supplier-registration/transaction'; 
      } else if(localStorage.getItem('arStatus') === 'reject') {
        this.status = "Rejected";
        this.approveRejectStatus = "Your Registration request is Rejected by the Admin. <br/> If you have any queries regarding to this then contact with admin. <br/>"
        this.gotopath = '/#/landing/supplier-registration/dashboard'; 
      }
    }
  }

  open(content) {

    this.onRegistrationClick();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

      this.closeResult = `Closed with: ${result}`;

    }, (reason) => {

      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
