import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierRegistrationService } from '../../../services/supplier-registration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-supplier-registration-process',
  templateUrl: './supplier-registration-process.component.html',
  styleUrls: ['./supplier-registration-process.component.scss']
})
export class SupplierRegistrationProcessComponent implements OnInit {

  isLocal: boolean = false;
  isIndividual: boolean = false;
  isInternational: boolean = false;

  constructor(
    private router: Router, 
    private alertService: AlertService
    // private supplierData: SupplierRegistrationService, 
    // private modalService: NgbModal,
    // private ActivatedRoute: ActivatedRoute, 
    // private sortByPipe: SortByPipe,
    // private searchPipe: FilterPipe,
    ) { }
    
  
  ngOnInit(): void {  
    // this.formData = this.supplierData.getdata();
    // this.employeeData = this.formData.employeDetails;
    // this.projectData = this.formData.projectDetails;
    // this.subContractorData = this.formData.subContractorDetails;
    // this.equipmentData = this.formData.equipmentDetails;
    // this.otherData = this.formData.otherDetails;
    if(localStorage.getItem('regType') === 'local'){
      this.isLocal = true
    }
    if(localStorage.getItem('regType') === 'individual'){
      this.isIndividual = true
    }
    if(localStorage.getItem('regType') === 'international'){
      this.isInternational = true
    }
    if (localStorage.getItem('RegStatus') === 'draft'){
      this.alertService.pushSuccess('Your Draft.')
    } else if(localStorage.getItem('RegStatus') === 'finish') {
      if(localStorage.getItem('arStatus') === 'pending') {
        this.alertService.pushWarning('you finish your registration wait for approval.')
        this.router.navigate(['/landing/supplier-registration/dashboard']); 
      } else if(localStorage.getItem('arStatus') === 'approved') {
        this.alertService.pushSuccess('Your Registration request is Approved.')
        this.router.navigate(['/landing/supplier-registration/transaction']); 
      } else if(localStorage.getItem('arStatus') === 'reject') {
        this.alertService.pushError('Your Registration request is Rejected.')
        this.router.navigate(['/landing/supplier-registration/dashboard']); 
      }
    }
  }

  // get f(){
  //   return this.form.controls;
  // }

  // open(content, address?) {
  //   if(address){
  //     this.form.patchValue(address);
  //   }

  //   this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

  //     this.closeResult = `Closed with: ${result}`;

  //   }, (reason) => {

  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return  `with: ${reason}`;
  //   }
  // }

  // submit(){
  //   if(this.form.status === 'VALID'){
  //     this.formData.address.addressDetails.push(this.form.value)
  //     this.form.reset();
  //   }
  // }

  // delete(data){
  //   this.formData.address.addressDetails.filter((d,i) => {
  //     if(d.poBox == data.poBox){
  //       this.formData.address.addressDetails.splice(i, 1);
  //     }
  //   })
  // }
  // registrationComplete(){
  //   this.completed = true;
  // }
  // // move(index: number) {
  // //   this.stepper.selectedIndex = index;
  // // }

  // Cancel(){
  //   this.router.navigate(['/landing/supplier-registration/dashboard']);
  // }

  // addNewRow(datatype){
  //   if(datatype === 'employee'){
  //     this.employeeData.map((data, i)=> {
  //       if(data.name == ""){
  //         this.employeeData.splice(i,1);
  //       }
  //     })
  //     this.newData = {
  //       "no": this.employeeData.length+1,
  //       "name": " * ",
  //       "qualification": "",
  //       "designation": "",
  //       "experience": "",
  //       "nationality": "",
  //       "category": "",
  //       "docCV":"",
  //       "isEdit": true
  //     };
  //     this.employeeData.push(this.newData);
  //   }
  //   if(datatype === 'project'){
  //     this.projectData.map((data, i)=> {
  //       if(data.name == ""){
  //         this.projectData.splice(i,1);
  //       }
  //     })
  //     this.newData = {
  //       "no": this.projectData.length+1,
  //       "name": " * ",
  //       "client": "",
  //       "consultent": "",
  //       "costConsultent": "",
  //       "value": "",
  //       "period": "",
  //       "completion": "",
  //       "documents": "",
  //       "isEdit": true
  //     };
  //     this.projectData.push(this.newData);
  //   }
  //   if(datatype === 'subContractor'){
  //     this.subContractorData.map((data, i)=> {
  //       if(data.nameOfWork == ""){
  //         this.subContractorData.splice(i,1);
  //       }
  //     })
  //     this.newData = {
  //       "no": this.subContractorData.length+1,
  //       "nameOfWork": " * ",
  //       "subContractor": "",
  //       "crNo": "",
  //       "telephone": "",
  //       "fax": "",
  //       "email": "",
  //       "regWithRca": "",
  //       "isEdit": true
  //     };
  //     this.subContractorData.push(this.newData);
  //   }
  //   if(datatype === 'equipment'){
  //     this.equipmentData.map((data, i)=> {
  //       if(data.type == ""){
  //         this.equipmentData.splice(i,1);
  //       }
  //     })
  //     this.newData = {
  //       "no": this.equipmentData.length+1,
  //       "type": " * ",
  //       "quantity": "",
  //       "capacity": "",
  //       "year": "",
  //       "regNo": "",
  //       "approxValue": "",
  //       "isEdit": true
  //     };
  //     this.equipmentData.push(this.newData);
  //   }
  //   if(datatype === 'other'){
  //     this.otherData.map((data, i)=> {
  //       if(data.nameOfWork == ""){
  //         this.otherData.splice(i,1);
  //       }
  //     })
  //     this.newData = {
  //       "no": this.otherData.length+1,
  //       "nameOfWork": " * ",
  //       "attachment": "",
  //       "isEdit": true
  //     };
  //     this.otherData.push(this.newData);
  //   }
  // }

  // enteredDetails(datatype, data){
  //   data.isEdit = false;
  //   if(datatype === 'employee'){
     
  //     if(data.name !== ""){
  //       this.employeeData.map((d, i) => {
  //         if(d.no == data.no){
  //           d = data
  //         }
  //       });
  //       if(data.name === " * "){
  //        data.name ="",
  //        data.isEdit = true;
  //       }
  //     } else {
  //       this.employeeData.map((data, i)=> {
  //         if(data.name == ""){
  //           this.employeeData.splice(i,1);
  //         }
  //       })
  //       this.alertService.pushError('name can not be empty.')
  //     }
  //   }
  //   if(datatype === 'project'){
      
  //     if(data.name !== ""){
  //       this.projectData.map((d, i) => {
  //         if(d.no == data.no){
  //           d = data
  //         }
  //       });
  //       if(data.name === " * "){
  //         data.name ="",
  //         data.isEdit = true;
  //        }
  //     } else {
  //       this.projectData.map((data, i)=> {
  //         if(data.name == ""){
  //           this.projectData.splice(i,1);
  //         }
  //       })
  //       this.alertService.pushError('name can not be empty.')
  //     }
  //   }
  //   if(datatype === 'subContractor'){
  //     if(data.nameOfWork !== ""){
  //       this.subContractorData.map((d, i) => {
  //         if(d.no == data.no){
  //           d = data
  //         }
  //       });
  //       if(data.nameOfWork === " * "){
  //         data.nameOfWork ="",
  //         data.isEdit = true;
  //        }
  //     } else {
  //       this.subContractorData.map((data, i)=> {
  //         if(data.nameOfWork == ""){
  //           this.subContractorData.splice(i,1);
  //         }
  //       })
  //       this.alertService.pushError('nameOfWork can not be empty.')
  //     }
  //   }
  //   if(datatype === 'equipment'){
  //     if(data.type !== ""){
  //       this.equipmentData.map((d, i) => {
  //         if(d.no == data.no){
  //           d = data
  //         }
  //       });
  //       if(data.type === " * "){
  //         data.type ="",
  //         data.isEdit = true;
  //        }
  //     } else {
  //       this.equipmentData.map((data, i)=> {
  //         if(data.type == ""){
  //           this.equipmentData.splice(i,1);
  //         }
  //       })
  //       this.alertService.pushError('type can not be empty.')
  //     }
  //   }
  //   if(datatype === 'other'){
  //     if(data.nameOfWork !== ""){
  //       this.otherData.map((d, i) => {
  //         if(d.no == data.no){
  //           d = data
  //         }
  //       });
  //       if(data.nameOfWork === " * "){
  //         data.nameOfWork ="",
  //         data.isEdit = true;
  //        }
  //     } else {
  //       this.otherData.map((data, i)=> {
  //         if(data.nameOfWork == ""){
  //           this.otherData.splice(i,1);
  //         }
  //       })
  //       this.alertService.pushError('nameOfWork can not be empty.')
  //     }
  //   }
    
  // }
  
  // sorting( property, str){
  //   this.order = !this.order;
  //   if(this.order === true){
  //     if(property === 'employee'){
  //       this.employeeData = this.sortByPipe.transform(this.formData.employeDetails,'asc',str)
  //     }
  //     if(property === 'project'){
  //       this.projectData = this.sortByPipe.transform(this.formData.projectDetails,'asc',str)
  //     }
  //     if(property === 'subcontractor'){
  //       this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails,'asc',str)
  //     }
  //     if(property === 'equipment'){
  //       this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails,'asc',str)
  //     }
  //     if(property === 'other'){
  //       this.otherData = this.sortByPipe.transform(this.formData.otherDetails,'asc',str)
  //     }
  //   }
  //   else{
  //     if(property === 'employee'){
  //       this.employeeData = this.sortByPipe.transform(this.formData.employeDetails,'desc',str)
  //     }
  //     if(property === 'project'){
  //       this.projectData = this.sortByPipe.transform(this.formData.projectDetails,'desc',str)
  //     }
  //     if(property === 'subcontractor'){
  //       this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails,'desc',str)
  //     }
  //     if(property === 'equipment'){
  //       this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails,'desc',str)
  //     }
  //     if(property === 'other'){
  //       this.otherData = this.sortByPipe.transform(this.formData.otherDetails,'desc',str)
  //     }
  //   }
  // }

 
  
 
}
