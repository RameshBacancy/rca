import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { SupplierRegistrationService } from '../../../services/supplier-registration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-supplier-registration-process',
  templateUrl: './supplier-registration-process.component.html',
  styleUrls: ['./supplier-registration-process.component.scss']
})
export class SupplierRegistrationProcessComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  closeResult: string;
  form: FormGroup = new FormGroup({
    poBox: new FormControl('12345', [Validators.required, Validators.pattern('^[0-9]+')]),
    supplierBranch: new FormControl('Muscat – Al Ghubra', [Validators.required]),
    sponsorName: new FormControl('B. Balasubramanian', [Validators.required]),
    SponsorNationalId: new FormControl('11337788', [Validators.required, Validators.pattern('^[0-9]+')]),
    postalCode: new FormControl('1208', [Validators.required, Validators.pattern('^[0-9]+')]),
    authorizedSignatory: new FormControl('Muhammad Wadahi', [Validators.required]),
    authorizedResidentId: new FormControl('11337788', [Validators.required, Validators.pattern('^[0-9]+')]),
  });
  
  constructor(private router: Router, private supplierData: SupplierRegistrationService, private modalService: NgbModal) { }

  ngOnInit(): void {  
    this.formData = this.supplierData.getdata();
  }

  get f(){
    return this.form.controls;
  }

  open(content) {

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

  submit(){
    if(this.form.status === 'VALID'){
      console.log(this.form.value);
    }
  }

  move(index: number) {
    this.stepper.selectedIndex = index;
  }

  Cancel(){
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

}
