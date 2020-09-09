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
  completed:boolean = false;
  editCompanyDetails: boolean = false;
  editDirectorDetails: boolean = false;
  editGeneralManagerDetails: boolean = false;
  form: FormGroup = new FormGroup({
    // addressID: new FormControl('MCT2', [Validators.required]),
    poBox: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+')]),
    supplierBranch: new FormControl('', [Validators.required]),
    sponsorName: new FormControl('', [Validators.required]),
    SponsorNationalId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+')]),
    postalCode: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+')]),
    authorizedSignatory: new FormControl('', [Validators.required]),
    authorizedResidentId: new FormControl('', [Validators.required, Validators.pattern('^[0-9]+')]),
  });
  
  constructor(private router: Router, private supplierData: SupplierRegistrationService, private modalService: NgbModal) { }

  ngOnInit(): void {  
    this.formData = this.supplierData.getdata();
  }

  get f(){
    return this.form.controls;
  }

  open(content, address?) {
    if(address){
      this.form.patchValue(address);
      console.log(this.form);
    }

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
      this.formData.address.addressDetails.push(this.form.value)
      console.log(this.formData)
      this.form.reset();
    }
  }

  delete(data){
    this.formData.address.addressDetails.filter((d,i) => {
      if(d.poBox == data.poBox){
        this.formData.address.addressDetails.splice(i, 1);
      }
    })
  }
  registrationComplete(){
    this.completed = true;
  }
  // move(index: number) {
  //   this.stepper.selectedIndex = index;
  // }

  Cancel(){
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

}
