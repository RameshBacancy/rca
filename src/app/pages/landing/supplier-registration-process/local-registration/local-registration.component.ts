import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
import { AlertService } from 'src/app/services/alert.service';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-local-registration',
  templateUrl: './local-registration.component.html',
  styleUrls: ['./local-registration.component.scss']
})
export class LocalRegistrationComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  closeResult: string;
  order: boolean = false;
  completed:boolean = false;
  @Input("searchText") searchText: any;

  editCompanyDetails: boolean = false;
  editDirectorDetails: boolean = false;
  editGeneralManagerDetails: boolean = false;

  form: FormGroup = new FormGroup({
    addressID: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    language: new FormControl('English', [Validators.required]),
    country: new FormControl('Oman', [Validators.required]),
  });
  bankform: FormGroup = new FormGroup({
    bankAcc: new FormControl('', [Validators.required]),
    bankName: new FormControl('', [Validators.required]),
    bankBranch: new FormControl('', [Validators.required]),
    holderName: new FormControl('', [Validators.required])
  });
  
  employeeData: any[];
  employeeSearch: string;
  newData:any; 
  projectData: any[];
  subContractorData: any[];
  equipmentData: any[];
  otherData: any[];

 
  selectedAddress: any;
  allAddresses: any;
  addressMenu: boolean;
  activityData: any;
  personalData: any;
  comunicationData: any;
  activityInfoData: any;
  BankDetails: any;
  compBranchInfoData: any;
  activityMenu: boolean;
  selected = new FormControl(0);
  
  constructor(
    private router: Router, 
    private supplierData: SupplierRegistrationService, 
    private modalService: NgbModal,
    private _userService:UserService,
    private ActivatedRoute: ActivatedRoute, 
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private alertService: AlertService) { }
    
  
  ngOnInit(): void {  
    this.formData = this.supplierData.getdata();
    this.allAddresses = this.formData.address.addressDetails;
    this.activityData = this.formData.activities;
    this.selectedAddress = this.formData.address.addressDetails[0];
    this.personalData = this.formData.personalDetails;
    this.comunicationData = this.formData.comunicationMethod;
    this.personalData = this.formData.personalDetails;
    this.compBranchInfoData = this.formData.commercialInfo.compBranchInfo;
    this.BankDetails = this.formData.commercialInfo.BankDetails;
    this.activityInfoData = this.formData.commercialInfo.activityInfo;
    this.employeeData = this.formData.employeDetails;
    this.projectData = this.formData.projectDetails;
    this.subContractorData = this.formData.subContractorDetails;
    this.equipmentData = this.formData.equipmentDetails;
    this.otherData = this.formData.otherDetails;
  }

  get f(){
    return this.form.controls;
  }

  get bf(){
    return this.bankform.controls;
  }

  changeTab() {
    this.selected.setValue(this.selected.value+1);
  }
  previousTab() {
    this.selected.setValue(this.selected.value-1);
  }
  newStep(){
    this.selected.setValue(0);
  }

  open(content, address?) {
    if(address){
      this.form.patchValue(address);
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

  submitRegistration(){
    this.completed = true;
    localStorage.setItem('LocalRegComplete',"true");
    localStorage.setItem('RegStatus','finish');
    const body = { civil_number:localStorage.getItem('civilReg'),cr_number:localStorage.getItem('commercialReg'),register_status:localStorage.getItem('RegStatus'), register_type:localStorage.getItem('regType')}
      this._userService.supplierRegistration(body).subscribe(d => { })
      this.alertService.pushSuccess('Your data is submitted.');
    // this.router.navigateByUrl('/landing/supplier-registration/transaction');
  }

  saveDraft(){
    localStorage.setItem('RegStatus','draft');
    const body = { civil_number:localStorage.getItem('civilReg'),cr_number:localStorage.getItem('commercialReg'),register_status:localStorage.getItem('RegStatus'), register_type:localStorage.getItem('regType')}
    this._userService.supplierRegistration(body).subscribe(d => { })
    this.alertService.pushWarning('Your data will be saved for 72 hours.');
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  submit(){
    if(this.form.status === 'VALID'){
      this.formData.address.addressDetails.push(this.form.value)
      this.form.reset();
    }
  }
  submitbank(){
    if(this.bankform.status === 'VALID'){
      this.BankDetails.push(this.bankform.value);
      this.bankform.reset();
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

  Cancel(){
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  addNewRow(datatype){
    if(datatype === 'employee'){
      this.employeeData.map((data, i)=> {
        if(data.name == ""){
          this.employeeData.splice(i,1);
        }
      })
      this.newData = {
        "name": " * ",
        "qualification": "",
        "specialization": "",
        "jobTitle": "",
        "designation": "",
        "designationDate": "",
        "expDate": "",
        "experience": "",
        "appointmentDate": "",
        "status": "",
        "statusDate": "",
        "staffCategory": "",
        "passportNum": "",
        "recidentCard": "",
        "civilNo": "",
        "crNo": "",
        "omaniratio": "",
        "isEdit": true
      };
      this.employeeData.push(this.newData);
    }
    if(datatype === 'project'){
      this.projectData.map((data, i)=> {
        if(data.name == ""){
          this.projectData.splice(i,1);
        }
      })
      this.newData = {
        "no": this.projectData.length+1,
        "name": " * ",
        "client": "",
        "consultent": "",
        "costConsultent": "",
        "value": "",
        "period": "",
        "completion": "",
        "documents": "",
        "isEdit": true
      };
      this.projectData.push(this.newData);
    }
    if(datatype === 'subContractor'){
      this.subContractorData.map((data, i)=> {
        if(data.nameOfWork == ""){
          this.subContractorData.splice(i,1);
        }
      })
      this.newData = {
        "no": this.subContractorData.length+1,
        "nameOfWork": " * ",
        "subContractor": "",
        "crNo": "",
        "telephone": "",
        "fax": "",
        "email": "",
        "regWithRca": "",
        "isEdit": true
      };
      this.subContractorData.push(this.newData);
    }
    if(datatype === 'equipment'){
      this.equipmentData.map((data, i)=> {
        if(data.type == ""){
          this.equipmentData.splice(i,1);
        }
      })
      this.newData = {
        "no": this.equipmentData.length+1,
        "type": " * ",
        "quantity": "",
        "capacity": "",
        "year": "",
        "regNo": "",
        "approxValue": "",
        "isEdit": true
      };
      this.equipmentData.push(this.newData);
    }
    if(datatype === 'other'){
      this.otherData.map((data, i)=> {
        if(data.nameOfWork == ""){
          this.otherData.splice(i,1);
        }
      })
      this.newData = {
        "no": this.otherData.length+1,
        "nameOfWork": " * ",
        "attachment": "",
        "isEdit": true
      };
      this.otherData.push(this.newData);
    }
    if(datatype === 'activity'){
      this.activityData.map((data, i)=> {
        if(data.activityName == ""){
          this.activityData.splice(i,1);
        }
      })
      this.newData = {
        "activityName": " * ",
        "subActivity": "",
        "sagment": "",
        "family": "",
        "class": "",
        "commodity": "",
        "isEdit": true
      };
      this.activityData.push(this.newData);
    }
    if(datatype === 'personal'){
      this.personalData.map((data, i)=> {
        if(data.personName == ""){
          this.personalData.splice(i,1);
        }
      })
      this.newData = {
        "personName": " * ",
        "nationality": "",
        "idType": "",
        "idNo": "",
        "designation":"",
        "noOfShares": '',
        "perShares": "",
        "authorizationType": "",
        "authorizationLimit": "",
        "note": "",
        "regDate": "",
        "isEdit": true
      };
      this.personalData.push(this.newData);
    }
    if(datatype === 'activityInfo'){
      this.activityInfoData.map((data, i)=> {
        if(data.activityName == ""){
          this.activityInfoData.splice(i,1);
        }
      })
      this.newData = {
        "activityName": " * ",
        "subActivity": "",
        "establishmentDate": "",
        "regDate": "",
        "expDate": "",
        "duration": "",
        "companyGrade": "",
        "location": "",
        "Document": "",
        "isEdit": true
      };
      this.activityInfoData.push(this.newData);
    }
  }

  enteredDetails(datatype, data){
    data.isEdit = false;
    if(datatype === 'employee'){
     
      if(data.name !== ""){
        this.employeeData.map((d, i) => {
          if(d.name == data.name){
            d = data
          }
        });
        if(data.name === " * "){
         data.name ="",
         data.isEdit = true;
        }
      } else {
        this.employeeData.map((data, i)=> {
          if(data.name == ""){
            this.employeeData.splice(i,1);
          }
        })
        this.alertService.pushError('name can not be empty.')
      }
    }
    if(datatype === 'project'){
      
      if(data.name !== ""){
        this.projectData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.name === " * "){
          data.name ="",
          data.isEdit = true;
         }
      } else {
        this.projectData.map((data, i)=> {
          if(data.name == ""){
            this.projectData.splice(i,1);
          }
        })
        this.alertService.pushError('name can not be empty.')
      }
    }
    if(datatype === 'subContractor'){
      if(data.nameOfWork !== ""){
        this.subContractorData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.nameOfWork === " * "){
          data.nameOfWork ="",
          data.isEdit = true;
         }
      } else {
        this.subContractorData.map((data, i)=> {
          if(data.nameOfWork == ""){
            this.subContractorData.splice(i,1);
          }
        })
        this.alertService.pushError('nameOfWork can not be empty.')
      }
    }
    if(datatype === 'equipment'){
      if(data.type !== ""){
        this.equipmentData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.type === " * "){
          data.type ="",
          data.isEdit = true;
         }
      } else {
        this.equipmentData.map((data, i)=> {
          if(data.type == ""){
            this.equipmentData.splice(i,1);
          }
        })
        this.alertService.pushError('type can not be empty.')
      }
    }
    if(datatype === 'other'){
      if(data.nameOfWork !== ""){
        this.otherData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.nameOfWork === " * "){
          data.nameOfWork ="",
          data.isEdit = true;
         }
      } else {
        this.otherData.map((data, i)=> {
          if(data.nameOfWork == ""){
            this.otherData.splice(i,1);
          }
        })
        this.alertService.pushError('nameOfWork can not be empty.')
      }
    }
    if(datatype === 'activity'){
      if(data.activityName !== ""){
        this.activityData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.activityName === " * "){
          data.activityName ="",
          data.isEdit = true;
         }
      } else {
        this.activityData.map((data, i)=> {
          if(data.activityName == ""){
            this.activityData.splice(i,1);
          }
        })
        this.alertService.pushError('Activity Name can not be empty.')
      }
    }
    if(datatype === 'personal'){
      if(data.personName !== ""){
        this.personalData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.personName === " * "){
          data.personName ="",
          data.isEdit = true;
         }
      } else {
        this.personalData.map((data, i)=> {
          if(data.personName == ""){
            this.personalData.splice(i,1);
          }
        })
        this.alertService.pushError('Person Name can not be empty.')
      }
    }
    if(datatype === 'activityInfo'){
      if(data.activityName !== ""){
        this.activityInfoData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.activityName === " * "){
          data.activityName ="",
          data.isEdit = true;
         }
      } else {
        this.activityInfoData.map((data, i)=> {
          if(data.activityName == ""){
            this.activityInfoData.splice(i,1);
          }
        })
        this.alertService.pushError('Activity Name can not be empty.')
      }
    }
  }
  
  sorting( property, str){
    this.order = !this.order;
    if(this.order === true){
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
      if(property === 'activity'){
        this.activityData = this.sortByPipe.transform(this.formData.activities,'asc',str)
      }
      if(property === 'personal'){
        this.personalData = this.sortByPipe.transform(this.formData.personalDetails,'asc',str)
      }
      if(property === 'activityInfo'){
        this.activityInfoData = this.sortByPipe.transform(this.formData.commercialInfo.activityInfo,'asc',str)
      }
      if(property === 'branchInfo'){
        this.compBranchInfoData = this.sortByPipe.transform(this.formData.commercialInfo.compBranchInfo,'asc',str)
      }
    }
    else{
      if(property === 'employee'){
        this.employeeData = this.sortByPipe.transform(this.formData.employeDetails,'desc',str)
      }
      if(property === 'project'){
        this.projectData = this.sortByPipe.transform(this.formData.projectDetails,'desc',str)
      }
      if(property === 'subcontractor'){
        this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails,'desc',str)
      }
      if(property === 'equipment'){
        this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails,'desc',str)
      }
      if(property === 'other'){
        this.otherData = this.sortByPipe.transform(this.formData.otherDetails,'desc',str)
      }
      if(property === 'activity'){
        this.activityData = this.sortByPipe.transform(this.formData.activities,'desc',str)
      }
      if(property === 'personal'){
        this.personalData = this.sortByPipe.transform(this.formData.personalDetails,'desc',str)
      }
      if(property === 'activityInfo'){
        this.activityInfoData = this.sortByPipe.transform(this.formData.commercialInfo.activityInfo,'desc',str)
      }
      if(property === 'branchInfo'){
        this.compBranchInfoData = this.sortByPipe.transform(this.formData.commercialInfo.compBranchInfo,'desc',str)
      }
    }
  }

  public openMenu() {
    this.activityMenu = !this.activityMenu;
  }

  public handleClickOutside() {
    this.addressMenu = false;
  }
  
}
