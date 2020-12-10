import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-international-registration',
  templateUrl: './international-registration.component.html',
  styleUrls: ['./international-registration.component.scss']
})
export class InternationalRegistrationComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  closeResult: string;
  order = false;
  completed = false;
  @Input('searchText') searchText: any;

  editCompanyDetails = false;
  editDirectorDetails = false;
  editGeneralManagerDetails = false;

  form: FormGroup = new FormGroup({
    addressID: new FormControl('', [Validators.required]),
    addressline1: new FormControl('', [Validators.required]),
    addressline2: new FormControl('', [Validators.required]),
    // language: new FormControl('English', [Validators.required]),
    country: new FormControl('Oman', [Validators.required]),
    isMoci: new FormControl(false)
  });

  bankform: FormGroup = new FormGroup({
    bankingId: new FormControl('', [Validators.required]),
    bankingIdname: new FormControl('', [Validators.required]),
    bankAcc: new FormControl('', [Validators.required, , Validators.pattern('^[0-9]*$')]),
    bankName: new FormControl('', [Validators.required]),
    bankBranch: new FormControl('', [Validators.required]),
    holderName: new FormControl('', [Validators.required]),
    isMoci: new FormControl(false)
  });

  staffData: any[];
  staffSearch: string;
  newData: any;
  communicationData: any[];
  subContractorData: any[];
  equipmentData: any[];
  otherData: any[];
  activityData: any[];

  isLocal = false;
  isIndividual = false;
  isInternational = false;
  personalData: any;
  BankDetails: any;
  internationalAddress: any[];
  selectedAddress: any;
  activityMenu: boolean;
  editAddress = false;
  allAddresses: any;
  editBank: boolean;
  editbankData: any;

  selected = new FormControl(0);


  constructor(
    private router: Router,
    private supplierData: SupplierRegistrationService,
    private modalService: NgbModal,
    private userService: UserService,
    // private ActivatedRoute: ActivatedRoute,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private spinner: SpinnerService,
    private alertService: AlertService
  ) { }

  loadData(data) {
    let d = [];
    d.push(data);
    this.formData = this.supplierData.getdata();
    this.internationalAddress = d;
  }

  ngOnInit(): void {
    this.formData = this.supplierData.getdata();
    this.selectedAddress = this.formData.individualAddress[0];
    this.allAddresses = this.formData.individualAddress;
    this.internationalAddress = this.formData.individualAddress;
    this.personalData = this.formData.personalDetails;
    this.staffData = this.formData.staffDetails;
    this.communicationData = this.formData.communicationDetails;
    this.subContractorData = this.formData.subContractorDetails;
    this.equipmentData = this.formData.equipmentDetails;
    this.BankDetails = this.formData.BankDetails;
    this.otherData = this.formData.otherDetails;
    this.activityData = this.formData.activities;
    // this.loadData(this.formData.individualAddress[0]); 
  }

  get f() {
    return this.form.controls;
  }
  get bf() {
    return this.bankform.controls;

  }

  public openMenu() {
    this.activityMenu = !this.activityMenu;
  }

  openbank(content, details?) {
    if (details) {
      this.bankform.patchValue(details);
      this.editBank = true;
      this.editbankData = details;
      this.open(content);
    } else {
      this.bankform.reset();
      this.open(content);
    }
  }

  open(content, address?) {
    if (address) {
      if (!address.isMoci) {
        this.selectedAddress = address;
        this.form.patchValue(address);
        this.editAddress = true;
      }
    } else {
      this.form.reset();
      this.form.patchValue({ addressID: this.formData.individualAddress.length + 1, country: 'Oman' });
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

  submit() {
    if (this.form.status === 'VALID') {
      if (this.editAddress == true) {
        this.formData.individualAddress.filter((d, i) => {
          if (d.addressID == this.selectedAddress.addressID) {
            this.selectedAddress = this.form.value;
            this.formData.individualAddress.splice(i, 1, this.form.value);
          }
        });
        this.editAddress = false;
        this.form.reset();
      } else {
        this.formData.individualAddress.push(this.form.value);
      }
      this.form.reset();
    }
  }
  submitRegistration() {
    this.completed = true;
    localStorage.setItem('LocalRegComplete', 'true');
    localStorage.setItem('1completeToken', 'true');
    localStorage.setItem('RegStatus', 'finish');
    this.spinner.openSpinner();
    // tslint:disable-next-line: max-line-length
    const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), email: localStorage.getItem('internationalEmail'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    this.userService.supplierRegistration(body);
    this.alertService.pushSuccess('Your data is submitted.');
    // this.router.navigateByUrl('/landing/supplier-registration/transaction');
  }
  saveDraft() {
    localStorage.setItem('RegStatus', 'draft');
    this.spinner.openSpinner();
    // tslint:disable-next-line: max-line-length
    const body = { email: localStorage.getItem('internationalEmail'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    this.userService.supplierRegistration(body);
    this.alertService.pushWarning('Your data will be saved for 72 hours.');
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  submitbank() {
    if (this.bankform.status === 'VALID') {
      if (this.editBank == true) {
        this.formData.BankDetails.filter((d, i) => {
          if (d.bankAcc == this.editbankData.bankAcc) {
            this.formData.BankDetails.splice(i, 1, this.bankform.value);
          }
        });
        this.editBank = false;
      } else {
        this.BankDetails.push(this.bankform.value);
      }
      this.bankform.reset();
    }
  }

  // delete(data){
  //   this.formData.address.addressDetails.filter((d,i) => {
  //     if(d.poBox == data.poBox){
  //       this.formData.address.addressDetails.splice(i, 1);
  //     }
  //   })
  // }
  registrationComplete() {
    this.completed = true;
  }
  // move(index: number) {
  //   this.stepper.selectedIndex = index;
  // }

  Cancel() {
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  addNewRow(datatype) {
    if (datatype === 'staff') {
      this.staffData.map((data, i) => {
        if (data.name == '') {
          this.staffData.splice(i, 1);
        }
      });
      this.newData = {
        name: ' * ',
        qualification: '',
        specialization: '',
        jobTitle: '',
        designation: '',
        designationDate: '',
        expDate: '',
        experience: '',
        appointmentDate: '',
        status: '',
        statusDate: '',
        staffCategory: '',
        passportNum: '',
        recidentCard: '',
        civilNo: '',
        crNo: '',
        omaniratio: '',
        isEdit: true
      };
      this.staffData.push(this.newData);
    }
    if (datatype === 'communication') {
      this.communicationData.map((data, i) => {
        if (data.method == '') {
          this.communicationData.splice(i, 1);
        }
      });
      this.newData = {
        no: this.communicationData.length + 1,
        method: ' * ',
        value: ' ',
        isEdit: true
      };
      this.communicationData.push(this.newData);
    }
    if (datatype === 'subContractor') {
      this.subContractorData.map((data, i) => {
        if (data.nameOfWork == '') {
          this.subContractorData.splice(i, 1);
        }
      });
      this.newData = {
        no: this.subContractorData.length + 1,
        nameOfWork: ' * ',
        subContractor: '',
        crNo: '',
        telephone: '',
        fax: '',
        email: '',
        regWithRca: '',
        isEdit: true
      };
      this.subContractorData.push(this.newData);
    }
    if (datatype === 'equipment') {
      this.equipmentData.map((data, i) => {
        if (data.type == '') {
          this.equipmentData.splice(i, 1);
        }
      });
      this.newData = {
        no: this.equipmentData.length + 1,
        type: ' * ',
        quantity: '',
        capacity: '',
        year: '',
        regNo: '',
        approxValue: '',
        isEdit: true
      };
      this.equipmentData.push(this.newData);
    }
    if (datatype === 'other') {
      this.otherData.map((data, i) => {
        if (data.nameOfWork == '') {
          this.otherData.splice(i, 1);
        }
      });
      this.newData = {
        no: this.otherData.length + 1,
        nameOfWork: ' * ',
        attachment: '',
        isEdit: true
      };
      this.otherData.push(this.newData);
    }
    if (datatype === 'activity') {
      this.activityData.map((data, i) => {
        if (data.activityName == '') {
          this.activityData.splice(i, 1);
        }
      });
      this.newData = {
        activityName: ' * ',
        subActivity: '',
        sagment: '',
        family: '',
        class: '',
        commodity: '',
        isEdit: true,
        isMoci: false
      };
      this.activityData.push(this.newData);
    }
    if (datatype === 'personal') {
      this.personalData.map((data, i) => {
        if (data.personName == '') {
          this.personalData.splice(i, 1);
        }
      });
      this.newData = {
        personName: ' * ',
        nationality: '',
        idType: '',
        idNo: '',
        designation: '',
        noOfShares: '',
        perShares: '',
        authorizationType: '',
        authorizationLimit: '',
        note: '',
        regDate: '',
        isEdit: true,
        isMoci: false
      };
      this.personalData.push(this.newData);
    }
  }

  enteredDetails(datatype, data) {
    data.isEdit = false;
    if (datatype === 'staff') {

      if (data.name !== '') {
        this.staffData.map((d, i) => {
          if (d.name == data.name) {
            d = data;
          }
        });
        if (data.name === ' * ') {
          data.name = '',
            data.isEdit = true;
        }
      } else {
        this.staffData.map((data, i) => {
          if (data.name == '') {
            this.staffData.splice(i, 1);
          }
        });
        this.alertService.pushError('name can not be empty.');
      }
    }
    if (datatype === 'communication') {

      if (data.method !== '') {
        this.communicationData.map((d, i) => {
          if (d.no == data.no) {
            d = data;
          }
        });
        if (data.method === ' * ') {
          data.method = '',
            data.isEdit = true;
        }
      } else {
        this.communicationData.map((data, i) => {
          if (data.method == '') {
            this.communicationData.splice(i, 1);
          }
        });
        this.alertService.pushError('Communication Method can not be empty.');
      }
    }
    if (datatype === 'subContractor') {
      if (data.nameOfWork !== '') {
        this.subContractorData.map((d, i) => {
          if (d.no == data.no) {
            d = data;
          }
        });
        if (data.nameOfWork === ' * ') {
          data.nameOfWork = '',
            data.isEdit = true;
        }
      } else {
        this.subContractorData.map((data, i) => {
          if (data.nameOfWork == '') {
            this.subContractorData.splice(i, 1);
          }
        });
        this.alertService.pushError('nameOfWork can not be empty.');
      }
    }
    if (datatype === 'equipment') {
      if (data.type !== '') {
        this.equipmentData.map((d, i) => {
          if (d.no == data.no) {
            d = data;
          }
        });
        if (data.type === ' * ') {
          data.type = '',
            data.isEdit = true;
        }
      } else {
        this.equipmentData.map((data, i) => {
          if (data.type == '') {
            this.equipmentData.splice(i, 1);
          }
        });
        this.alertService.pushError('type can not be empty.');
      }
    }
    if (datatype === 'other') {
      if (data.nameOfWork !== '') {
        this.otherData.map((d, i) => {
          if (d.no == data.no) {
            d = data;
          }
        });
        if (data.nameOfWork === ' * ') {
          data.nameOfWork = '',
            data.isEdit = true;
        }
      } else {
        this.otherData.map((data, i) => {
          if (data.nameOfWork == '') {
            this.otherData.splice(i, 1);
          }
        });
        this.alertService.pushError('nameOfWork can not be empty.');
      }
    }
    if (datatype === 'activity') {
      if (data.activityName !== '') {
        this.activityData.map((d, i) => {
          if (d.no == data.no) {
            d = data;
          }
        });
        if (data.activityName === ' * ') {
          data.activityName = '',
            data.isEdit = true;
        }
      } else {
        this.activityData.map((data, i) => {
          if (data.activityName == '') {
            this.activityData.splice(i, 1);
          }
        });
        this.alertService.pushError('Activity Name can not be empty.');
      }
    }
    if (datatype === 'personal') {
      if (data.personName !== '') {
        this.personalData.map((d, i) => {
          if (d.no == data.no) {
            d = data;
          }
        });
        if (data.personName === ' * ') {
          data.personName = '',
            data.isEdit = true;
        }
      } else {
        this.personalData.map((data, i) => {
          if (data.personName == '') {
            this.personalData.splice(i, 1);
          }
        });
        this.alertService.pushError('Person Name can not be empty.');
      }
    }

  }

  sorting(property, str) {
    this.order = !this.order;
    if (this.order === true) {
      if (property === 'staff') {
        this.staffData = this.sortByPipe.transform(this.formData.staffDetails, 'asc', str);
      }
      if (property === 'communication') {
        this.communicationData = this.sortByPipe.transform(this.formData.communicationDetails, 'asc', str);
      }
      if (property === 'subcontractor') {
        this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails, 'asc', str);
      }
      if (property === 'equipment') {
        this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails, 'asc', str);
      }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.formData.otherDetails, 'asc', str);
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.formData.activities, 'asc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.formData.personalDetails, 'asc', str);
      }
    } else {
      if (property === 'staff') {
        this.staffData = this.sortByPipe.transform(this.formData.staffDetails, 'desc', str);
      }
      if (property === 'communication') {
        this.communicationData = this.sortByPipe.transform(this.formData.communicationDetails, 'desc', str);
      }
      if (property === 'subcontractor') {
        this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails, 'desc', str);
      }
      if (property === 'equipment') {
        this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails, 'desc', str);
      }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.formData.otherDetails, 'desc', str);
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.formData.activities, 'desc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.formData.personalDetails, 'desc', str);
      }
    }
  }

  selectChange(event) {
    let dp = this.formData;

    if (dp.individualAddress != undefined && event.target.selectedIndex > dp.individualAddress.length) {

      this.loadData(dp.individualAddress[event.target.selectedIndex]);
    } else {

      this.loadData(dp.dropdownAll[event.target.selectedIndex]);
    }

  }
  changeTab() {
    this.selected.setValue(this.selected.value + 1);
  }
  previousTab() {
    this.selected.setValue(this.selected.value - 1);
  }

}
