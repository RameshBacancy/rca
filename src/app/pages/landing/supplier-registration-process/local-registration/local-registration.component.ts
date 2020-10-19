import { Component, OnInit, ViewChild, Input, ElementRef, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
import { AlertService } from 'src/app/services/alert.service';
import { MatStepper } from '@angular/material/stepper';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';

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
  completed: boolean = false;
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
    isMoci: new FormControl(false)
  });
  bankform: FormGroup = new FormGroup({
    bankingId: new FormControl('', [Validators.required]),
    bankingIdname: new FormControl('', [Validators.required]),
    bankAcc: new FormControl('', [Validators.required]),
    bankName: new FormControl('', [Validators.required]),
    bankBranch: new FormControl('', [Validators.required]),
    holderName: new FormControl('', [Validators.required]),
    isMoci: new FormControl(false)
  });

  employeeData: any[];
  employeeSearch: string;
  newData: any;
  projectData: any[];
  subContractorData: any[];
  equipmentData: any[];
  otherData: any[];


  selectedAddress: any;
  allAddresses: any;
  addressMenu: boolean;
  activityData: any;
  personalData: any;
  communicationData: any;
  activityInfoData: any;
  BankDetails: any;
  compBranchInfoData: any;
  activityMenu: boolean = false;
  selected = new FormControl(0);
  editAddress: boolean = false;

  @ViewChild("fileInput", { static: false }) fileInput: ElementRef;
  files = [];
  filesList = [];
  uploadData: any;
  selectedPage: any;
  arrayOfCatagory= [];
  staffCategory: any[];
  crNo: string;
  civilNo: string;
  editBank: boolean = false;
  editbankData: any;
  siteVisitData: any;
  isSiteVisit: any = 'no';

  constructor(
    private router: Router,
    private supplierData: SupplierRegistrationService,
    private modalService: NgbModal,
    private _userService: UserService,
    private ActivatedRoute: ActivatedRoute,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private alertService: AlertService,
    private spinner: SpinnerService,
  ) { }


  ngOnInit(): void {
    this.formData = this.supplierData.getdata();
    this.allAddresses = this.formData.address.addressDetails;
    this.activityData = this.formData.activities;
    this.selectedAddress = this.formData.address.addressDetails[0];
    this.personalData = this.formData.personalDetails;
    this.communicationData = this.formData.comunicationMethod;
    this.compBranchInfoData = this.formData.commercialInfo.compBranchInfo;
    this.BankDetails = this.formData.commercialInfo.BankDetails;
    this.activityInfoData = this.formData.commercialInfo.activityInfo;
    this.employeeData = this.formData.employeDetails;
    this.projectData = this.formData.projectDetails;
    this.subContractorData = this.formData.subContractorDetails;
    this.equipmentData = this.formData.equipmentDetails;
    this.otherData = this.formData.commercialInfo.otherDetails;
    this.siteVisitData = this.formData.siteVisit;
    this.getEmployeeCategories();
    this.crNo = localStorage.getItem('commercialReg');
    this.civilNo = localStorage.getItem('civilReg');
  }

  get f() {
    return this.form.controls;
  }

  get bf() {
    return this.bankform.controls;
  }

  getEmployeeCategories(){
    this.staffCategory = [];
    this.arrayOfCatagory = [];
    this.formData.employeDetails.filter( d => {
      this.arrayOfCatagory.push(d.staffCategory);
    })
    this.arrayOfCatagory = [... new Set(this.arrayOfCatagory)];
    this.staffCategory = []
    this.arrayOfCatagory.map( a => {
      let index = 0;
      this.formData.employeDetails.map( (d) => {
        if(d.staffCategory == a){
          index = index+1;
        }
      })
      this.staffCategory.push({category: a, number: index});
    })
  }

  changeTab() {
    this.selected.setValue(this.selected.value + 1);
  }
  previousTab() {
    this.selected.setValue(this.selected.value - 1);
  }
  newStep() {
    this.selected.setValue(0);
  }

  preStep(number){
    this.selected.setValue(number);
  }

  callUploadService(file, data, flag) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    if (this.selectedPage === 'project') {
      this.filesList = [];
      this.projectData.map((d, i) => {
        if (d.no == data.no) {
          if (flag == false) {
            d.documents.push(file.data);
          }
          d.documents.map((d1) => {
            this.filesList.push(d1);
            file.inProgress = false;
          })
        }
      });
    }
    if (this.selectedPage === 'employee') {
      this.filesList = [];
      this.employeeData.map((d, i) => {
        if (d.name == data.name) {
          if (flag == false) {
            d.documents.push(file.data);
          }
          d.documents.map((d1) => {
            this.filesList.push(d1)
            file.inProgress = false;
          })
        }
      });
    }
    if (this.selectedPage === 'activityInfo') {
      this.filesList = [];
      this.activityInfoData.map((d, i) => {
        if (d.activityName == data.activityName) {
          if (flag == false) {
            d.documents.push(file.data);
          }
          d.documents.map((d1) => {
            this.filesList.push(d1)
            file.inProgress = false;
          })
        }
      });
    }
    if (this.selectedPage === 'regCerti') {
      this.filesList = [];
      if (flag == false) {
        this.formData.ministriesData1.regCerti.push(file.data);
      }
      this.filesList =  this.formData.ministriesData1.regCerti;
    }
    if (this.selectedPage === 'hplicenses') {
      this.filesList = [];
      if (flag == false) {
        this.formData.ministriesData2.hplicenses.push(file.data);
      }
      this.filesList =  this.formData.ministriesData2.hplicenses;
    }
    if (this.selectedPage === 'pLOfCC') {
      this.filesList = [];
      if (flag == false) {
        this.formData.ministriesData2.pLOfCC.push(file.data);
      }
      this.filesList =  this.formData.ministriesData2.pLOfCC;
    }
    if (this.selectedPage === 'lOTQI') {
      this.filesList = [];
      if (flag == false) {
        this.formData.ministriesData2.lOTQI.push(file.data);
      }
      this.filesList =  this.formData.ministriesData2.lOTQI;
    }
    if (this.selectedPage === 'loftc') {
      this.filesList = [];
      if (flag == false) {
        this.formData.ministriesData3.loftc.push(file.data);
      }
      this.filesList =  this.formData.ministriesData3.loftc;
    }
  }

  private upload(data, flag) {
    this.fileInput.nativeElement.value = '';
    this.files.forEach(file => {
      this.callUploadService(file, data, flag);
    });
  }

  onClick() {
    let data = this.uploadData;
    const fileInput = this.fileInput.nativeElement;
    var flag = false;
    fileInput.onchange = () => {
      for (let index = 0; index < fileInput.files.length; index++) {
        const file = fileInput.files[index];
        this.filesList.filter(f => {
          if (f.name.toString() == file.name.toString()) {
            alert('already have similar name file.');
            flag = true;
          }
        });
        if (flag == false) {
          this.files = [];
          this.files.push({ data: file, inProgress: false, progress: 0 });
        }
      }
      this.upload(data, flag);
    };
    fileInput.click();
  }

  openFile(content, page, data) {
    this.selectedPage = page;
    this.uploadData = data;
    if (this.selectedPage === 'project') {
      this.filesList = [];
      this.projectData.map((d, i) => {
        if (d.no == data.no) {
          d.documents.map((d1) => {
            this.filesList.push(d1)
          })
        }
      });
    }
    if (this.selectedPage === 'employee') {
      this.filesList = [];
      this.employeeData.map((d, i) => {
        if (d.name == data.name) {
          d.documents.map((d1) => {
            this.filesList.push(d1)
          })
        }
      });
    }
    if (this.selectedPage === 'activityInfo') {
      this.filesList = [];
      this.activityInfoData.map((d, i) => {
        if (d.activityName == data.activityName) {
          d.documents.map((d1) => {
            this.filesList.push(d1)
          })
        }
      });
    }
    if(this.selectedPage === 'regCerti'){
      this.filesList = [];
      this.filesList = this.formData.ministriesData1.regCerti;
    }
    if(this.selectedPage === 'hplicenses'){
      this.filesList = [];
      this.filesList = this.formData.ministriesData2.hplicenses;
    }
    if(this.selectedPage === 'pLOfCC'){
      this.filesList = [];
      this.filesList = this.formData.ministriesData2.pLOfCC;
    }
    if(this.selectedPage === 'lOTQI'){
      this.filesList = [];
      this.filesList = this.formData.ministriesData2.lOTQI;
    }
    if(this.selectedPage === 'loftc'){
      this.filesList = [];
      this.filesList = this.formData.ministriesData3.loftc;
    }
    this.open(content)
  }

  deleteFile(file) {
    if (confirm('Do you want to delete ' + file.name + '?')) {
      if (this.selectedPage === 'project') {
        this.filesList = [];
        this.projectData.map((d) => {
          if (d.no == this.uploadData.no) {
            d.documents.filter((f, i) => {
              if (f.name == file.name) {
                d.documents.splice(i, 1);
                this.filesList = d.documents
              }
            })
          }
        });
      }
      if (this.selectedPage === 'employee') {
        this.filesList = [];
        this.employeeData.map((d, i) => {
          if (d.name == this.uploadData.name) {
            d.documents.filter((f, i) => {
              if (f.name == file.name) {
                d.documents.splice(i, 1)
                this.filesList = d.documents
              }
            })
          }
        });
      }
      if (this.selectedPage === 'activityInfo') {
        this.filesList = [];
        this.activityInfoData.map((d, i) => {
          if (d.activityName == this.uploadData.activityName) {
            d.documents.filter((f, i) => {
              if (f.name == file.name) {
                d.documents.splice(i, 1)
                this.filesList = d.documents
              }
            })
          }
        });
      }
      if (this.selectedPage === 'regCerti') {
        this.filesList = [];
        this.formData.ministriesData1.regCerti.filter((f, i) => {
          if (f.name == file.name) {
            this.formData.ministriesData1.regCerti.splice(i, 1);
            this.filesList = this.formData.ministriesData1.regCerti;
          }
        })
      }
      if (this.selectedPage === 'hplicenses') {
        this.filesList = [];
        this.formData.ministriesData2.hplicenses.filter((f, i) => {
          if (f.name == file.name) {
            this.formData.ministriesData2.hplicenses.splice(i, 1);
            this.filesList = this.formData.ministriesData2.hplicenses;
          }
        })
      }
      if (this.selectedPage === 'pLOfCC') {
        this.filesList = [];
        this.formData.ministriesData2.pLOfCC.filter((f, i) => {
          if (f.name == file.name) {
            this.formData.ministriesData2.pLOfCC.splice(i, 1);
            this.filesList = this.formData.ministriesData2.pLOfCC;
          }
        })
      }
      if (this.selectedPage === 'lOTQI') {
        this.filesList = [];
        this.formData.ministriesData2.lOTQI.filter((f, i) => {
          if (f.name == file.name) {
            this.formData.ministriesData2.lOTQI.splice(i, 1);
            this.filesList = this.formData.ministriesData2.lOTQI;
          }
        })
      }
      if (this.selectedPage === 'loftc') {
        this.filesList = [];
        this.formData.ministriesData3.loftc.filter((f, i) => {
          if (f.name == file.name) {
            this.formData.ministriesData3.loftc.splice(i, 1);
            this.filesList = this.formData.ministriesData3.loftc;
          }
        })
      }
    }
  }

  openbank(content, details?){
    if (details) {
      this.bankform.patchValue(details);
      this.editBank = true;
      this.editbankData = details;
      this.open(content);
    }
  }
  open(content, address?) {
    if (address) {
      this.form.patchValue(address);
      this.editAddress = true;
    }
    else{
      this.form.patchValue({'addressID': this.formData.address.addressDetails.length+1 ,
      'language':'English',
      'country':'Oman'});
    }

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

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
      return `with: ${reason}`;
    }
  }

  submitRegistration() {
    this.completed = true;
    localStorage.setItem('1completeToken', 'true');
    localStorage.setItem('LocalRegComplete', "true");
    localStorage.setItem('RegStatus', 'finish');
    this.spinner.openSpinner();
    const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') }
    this._userService.supplierRegistration(body)
    this.alertService.pushSuccess('Your data is submitted.');
    // this.router.navigateByUrl('/landing/supplier-registration/transaction');
  }

  saveDraft() {
    localStorage.setItem('RegStatus', 'draft');
    this.spinner.openSpinner();
    const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') }
    this._userService.supplierRegistration(body)
    this.alertService.pushWarning('Your data will be saved for 72 hours.');
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  submit() {
    if (this.form.status === 'VALID') {
      if (this.editAddress == true) {
        this.formData.address.addressDetails.filter((d, i) => {
          if (d.addressID == this.selectedAddress.addressID) {
            this.selectedAddress = this.form.value
            this.formData.address.addressDetails.splice(i, 1, this.form.value);
          }
        });
        this.editAddress = false;
        this.form.reset();
      }
      else {
        this.formData.address.addressDetails.push(this.form.value)
      }
      this.form.reset();
    }
  }

  submitbank() {
    if (this.bankform.status === 'VALID') {
      if (this.editBank == true) {
        this.formData.commercialInfo.BankDetails.filter((d,i) => {
          if (d.bankAcc == this.editbankData.bankAcc) {
            this.formData.commercialInfo.BankDetails.splice(i,1,this.bankform.value)
          }
        });
        this.editBank = false;
      }
      else{
        this.BankDetails.push(this.bankform.value);
      }
      this.bankform.reset();
    }
  }

  delete(data) {
    this.formData.address.addressDetails.filter((d, i) => {
      if (d.poBox == data.poBox) {
        this.formData.address.addressDetails.splice(i, 1);
      }
    })
  }

  registrationComplete() {
    this.completed = true;
  }

  Cancel() {
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  addNewRow(datatype) {
    if (datatype === 'employee') {
      this.employeeData.map((data, i) => {
        if (data.name == "") {
          this.employeeData.splice(i, 1);
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
        "isEdit": true,
        "isMoci": false
      };
      this.employeeData.push(this.newData);
    }
    if (datatype === 'project') {
      this.projectData.map((data, i) => {
        if (data.name == "") {
          this.projectData.splice(i, 1);
        }
      })
      this.newData = {
        "no": this.projectData.length + 1,
        "name": " * ",
        "client": "",
        "consultent": "",
        "costConsultent": "",
        "value": "",
        "period": "",
        "completion": "",
        "documents": [],
        "isEdit": true,
        "isMoci": false
      };
      this.projectData.push(this.newData);
    }
    if (datatype === 'subContractor') {
      this.subContractorData.map((data, i) => {
        if (data.nameOfWork == "") {
          this.subContractorData.splice(i, 1);
        }
      })
      this.newData = {
        "no": this.subContractorData.length + 1,
        "nameOfWork": " * ",
        "subContractor": "",
        "crNo": "",
        "telephone": "",
        "fax": "",
        "email": "",
        "regWithRca": "",
        "isEdit": true,
        "isMoci": false
      };
      this.subContractorData.push(this.newData);
    }
    if (datatype === 'equipment') {
      this.equipmentData.map((data, i) => {
        if (data.type == "") {
          this.equipmentData.splice(i, 1);
        }
      })
      this.newData = {
        "no": this.equipmentData.length + 1,
        "type": " * ",
        "quantity": "",
        "capacity": "",
        "year": "",
        "regNo": "",
        "approxValue": "",
        "isEdit": true,
        "isMoci": false
      };
      this.equipmentData.push(this.newData);
    }
    if (datatype === 'other') {
      this.otherData.map((data, i) => {
        if (data.nameOfWork == "") {
          this.otherData.splice(i, 1);
        }
      })
      this.newData = {
        "no": this.otherData.length + 1,
        "nameOfWork": " * ",
        "attachment": "",
        "isEdit": true
      };
      this.otherData.push(this.newData);
    }
    if (datatype === 'activity') {
      this.activityData.map((data, i) => {
        if (data.activityName == "") {
          this.activityData.splice(i, 1);
        }
      })
      this.newData = {
        "activityName": " * ",
        "subActivity": "",
        "sagment": "",
        "family": "",
        "class": "",
        "commodity": "",
        "isEdit": true,
        "isMoci": false
      };
      this.activityData.push(this.newData);
    }
    if (datatype === 'personal') {
      this.personalData.map((data, i) => {
        if (data.personName == "") {
          this.personalData.splice(i, 1);
        }
      })
      this.newData = {
        "personName": " * ",
        "nationality": "",
        "idType": "",
        "idNo": "",
        "designation": "",
        "noOfShares": '',
        "perShares": "",
        "authorizationType": "",
        "authorizationLimit": "",
        "note": "",
        "regDate": "",
        "isEdit": true,
        "isMoci": false
      };
      this.personalData.push(this.newData);
    }
    if (datatype === 'activityInfo') {
      this.activityInfoData.map((data, i) => {
        if (data.activityName == "") {
          this.activityInfoData.splice(i, 1);
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
        "documents": [],
        "isEdit": true,
        "isMoci": false
      };
      this.activityInfoData.push(this.newData);
    }
    if(datatype === 'communication'){
      this.communicationData.map((data, i)=> {
        if(data.method == ""){
          this.communicationData.splice(i,1);
        }
      })
      this.newData = {
        "no": this.communicationData.length+1,
        "method":" * ",
        "value":" ",
        "isEdit": true,
        "isMoci": false
      };
      this.communicationData.push(this.newData);
    }
    if(datatype === 'siteVisit') {
      this.siteVisitData.map((data, i)=> {
        if(data.label == ""){
          this.siteVisitData.splice(i,1);
        }
      })
      this.newData = {
        "no": this.siteVisitData.length+1,
        "label":" * ",
        "value":" ",
        "isEdit": true,
        "isMoci": false
      };
      this.siteVisitData.push(this.newData);
    }
  }

  enteredDetails(datatype, data) {
    data.isEdit = false;
    if (datatype === 'employee') {

      if (data.name !== "") {
        this.employeeData.map((d, i) => {
          if (d.name == data.name) {
            if(data.staffCategory == "") {
              data.staffCategory = "-";
            }
            d = data;
          }
        });
        if (data.name === " * ") {
          data.name = "",
          data.isEdit = true;
        }
      } else {
        this.employeeData.map((data, i) => {
          if (data.name == "") {
            this.employeeData.splice(i, 1);
          }
          
        })
        this.alertService.pushError('name can not be empty.')
      }
    this.getEmployeeCategories();
    }
    if (datatype === 'project') {

      if (data.name !== "") {
        this.projectData.map((d, i) => {
          if (d.no == data.no) {
            d = data
          }
        });
        if (data.name === " * ") {
          data.name = "",
            data.isEdit = true;
        }
      } else {
        this.projectData.map((data, i) => {
          if (data.name == "") {
            this.projectData.splice(i, 1);
          }
        })
        this.alertService.pushError('name can not be empty.')
      }
    }
    if (datatype === 'subContractor') {
      if (data.nameOfWork !== "") {
        this.subContractorData.map((d, i) => {
          if (d.no == data.no) {
            d = data
          }
        });
        if (data.nameOfWork === " * ") {
          data.nameOfWork = "",
            data.isEdit = true;
        }
      } else {
        this.subContractorData.map((data, i) => {
          if (data.nameOfWork == "") {
            this.subContractorData.splice(i, 1);
          }
        })
        this.alertService.pushError('nameOfWork can not be empty.')
      }
    }
    if (datatype === 'equipment') {
      if (data.type !== "") {
        this.equipmentData.map((d, i) => {
          if (d.no == data.no) {
            d = data
          }
        });
        if (data.type === " * ") {
          data.type = "",
            data.isEdit = true;
        }
      } else {
        this.equipmentData.map((data, i) => {
          if (data.type == "") {
            this.equipmentData.splice(i, 1);
          }
        })
        this.alertService.pushError('type can not be empty.')
      }
    }
    if (datatype === 'other') {
      if (data.nameOfWork !== "") {
        this.otherData.map((d, i) => {
          if (d.no == data.no) {
            d = data
          }
        });
        if (data.nameOfWork === " * ") {
          data.nameOfWork = "",
            data.isEdit = true;
        }
      } else {
        this.otherData.map((data, i) => {
          if (data.nameOfWork == "") {
            this.otherData.splice(i, 1);
          }
        })
        this.alertService.pushError('nameOfWork can not be empty.')
      }
    }
    if (datatype === 'activity') {
      if (data.activityName !== "") {
        this.activityData.map((d, i) => {
          if (d.activityName == data.activityName) {
            d = data
          }
        });
        if (data.activityName === " * ") {
          data.activityName = "",
            data.isEdit = true;
        }
      } else {
        this.activityData.map((data, i) => {
          if (data.activityName == "") {
            this.activityData.splice(i, 1);
          }
        })
        this.alertService.pushError('Activity Name can not be empty.')
      }
    }
    if (datatype === 'personal') {
      if (data.personName !== "") {
        this.personalData.map((d, i) => {
          if (d.no == data.no) {
            d = data
          }
        });
        if (data.personName === " * ") {
          data.personName = "",
            data.isEdit = true;
        }
      } else {
        this.personalData.map((data, i) => {
          if (data.personName == "") {
            this.personalData.splice(i, 1);
          }
        })
        this.alertService.pushError('Person Name can not be empty.')
      }
    }
    if (datatype === 'activityInfo') {
      if (data.activityName !== "") {
        this.activityInfoData.map((d, i) => {
          if (d.activityName == data.activityName) {
            d = data
          }
        });
        if (data.activityName === " * ") {
          data.activityName = "",
            data.isEdit = true;
        }
      } else {
        this.activityInfoData.map((data, i) => {
          if (data.activityName == "") {
            this.activityInfoData.splice(i, 1);
          }
        })
        this.alertService.pushError('Activity Name can not be empty.')
      }
    }
    if(datatype === 'communication'){
      
      if(data.method !== ""){
        this.communicationData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.method === " * "){
          data.method ="",
          data.isEdit = true;
         }
      } else {
        this.communicationData.map((data, i)=> {
          if(data.method == ""){
            this.communicationData.splice(i,1);
          }
        })
        this.alertService.pushError('Communication Method can not be empty.')
      }
    }
    if(datatype === 'siteVisit'){
      
      if(data.label !== ""){
        this.siteVisitData.map((d, i) => {
          if(d.no == data.no){
            d = data
          }
        });
        if(data.label === " * "){
          data.label ="",
          data.isEdit = true;
         }
      } else {
        this.siteVisitData.map((data, i)=> {
          if(data.label == ""){
            this.siteVisitData.splice(i,1);
          }
        })
        this.alertService.pushError('Label can not be empty.')
      }
    }
  }

  sorting(property, str) {
    this.order = !this.order;
    if (this.order === true) {
      if (property === 'employee') {
        this.employeeData = this.sortByPipe.transform(this.formData.employeDetails, 'asc', str)
      }
      if (property === 'project') {
        this.projectData = this.sortByPipe.transform(this.formData.projectDetails, 'asc', str)
      }
      if (property === 'subcontractor') {
        this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails, 'asc', str)
      }
      if (property === 'equipment') {
        this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails, 'asc', str)
      }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.formData.otherDetails, 'asc', str)
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.formData.activities, 'asc', str)
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.formData.personalDetails, 'asc', str)
      }
      if (property === 'activityInfo') {
        this.activityInfoData = this.sortByPipe.transform(this.formData.commercialInfo.activityInfo, 'asc', str)
      }
      if (property === 'branchInfo') {
        this.compBranchInfoData = this.sortByPipe.transform(this.formData.commercialInfo.compBranchInfo, 'asc', str)
      }
      if(property === 'communication'){
        this.communicationData = this.sortByPipe.transform(this.formData.communicationDetails,'asc',str)
      }
      if(property === 'communication'){
        this.siteVisitData = this.sortByPipe.transform(this.formData.siteVisit,'asc',str)
      }
    }
    else {
      if (property === 'employee') {
        this.employeeData = this.sortByPipe.transform(this.formData.employeDetails, 'desc', str)
      }
      if (property === 'project') {
        this.projectData = this.sortByPipe.transform(this.formData.projectDetails, 'desc', str)
      }
      if (property === 'subcontractor') {
        this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails, 'desc', str)
      }
      if (property === 'equipment') {
        this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails, 'desc', str)
      }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.formData.otherDetails, 'desc', str)
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.formData.activities, 'desc', str)
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.formData.personalDetails, 'desc', str)
      }
      if (property === 'activityInfo') {
        this.activityInfoData = this.sortByPipe.transform(this.formData.commercialInfo.activityInfo, 'desc', str)
      }
      if (property === 'branchInfo') {
        this.compBranchInfoData = this.sortByPipe.transform(this.formData.commercialInfo.compBranchInfo, 'desc', str)
      }
      if(property === 'communication'){
        this.communicationData = this.sortByPipe.transform(this.formData.communicationDetails,'desc',str)
      }
      if(property === 'communication'){
        this.siteVisitData = this.sortByPipe.transform(this.formData.siteVisit,'desc',str)
      }
    }
  }

  public openMenu() {
    this.activityMenu = !this.activityMenu;
  }

  changeSite(){
    console.log(this.isSiteVisit)
  }
}
