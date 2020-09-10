import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { SupplierRegistrationService } from '../../../services/supplier-registration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';

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
  
  employeeData: any[];
  employeeSearch: string;
  newEmployee:any; 
  projectData: any[];
  subContractorData: any[];
  equipmentData: any[];
  otherData: any[];

  constructor(
    private router: Router, 
    private supplierData: SupplierRegistrationService, 
    private modalService: NgbModal, 
    private sortByPipe: SortByPipe) { }
    
  
  ngOnInit(): void {  
    this.formData = this.supplierData.getdata();
    this.employeeData = this.formData.employeDetails;
    this.projectData = this.formData.projectDetails;
    this.subContractorData = this.formData.subContractorDetails;
    this.equipmentData = this.formData.equipmentDetails;
    this.otherData = this.formData.otherDetails;
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

  addNewRow(){
    this.employeeData.map((data, i)=> {
      if(data.name == ""){
        this.employeeData.splice(i,1);
      }
    })
    this.newEmployee = {
      "no": this.employeeData.length+1,
      "name": "",
      "qualification": "",
      "designation": "",
      "experience": "",
      "nationality": "",
      "category": "",
      "docCV":"",
      "isEdit": true
    };
    this.employeeData.push(this.newEmployee);
   
    console.log(this.employeeData.length)
  }

  enteredDetails(data){
    data.isEdit = false;
    if(data.name !== "", data.qualification !== ""){
      this.employeeData.map((d, i) => {
        if(d.no == data.no){
          d = data
        }
      })
    }
  }
  
  sorting( property, str){
    if(property === 'employee'){
      this.employeeData = this.sortByPipe.transform(this.formData.employeDetails,'asc',str)
    }
    if(property === 'project'){
      this.projectData = this.sortByPipe.transform(this.formData.projectDetails,'asc',str)
    }
    if(property === 'subcontractor'){
      this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails,'asc',str)
    }
    if(property === 'equipment'){
      this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails,'asc',str)
    }
    if(property === 'other'){
      this.otherData = this.sortByPipe.transform(this.formData.otherDetails,'asc',str)
    }
  }
 
}
