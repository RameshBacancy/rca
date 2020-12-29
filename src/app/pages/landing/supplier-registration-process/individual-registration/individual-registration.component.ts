import { GeneralInfoStepInd, PersonalDetailsInd, CommunicationDetailsStep } from './../../../../models/supplier.modal';
import { SupplierIndividualRegisterService } from './../../../../services/supplier-individual-register.service';
import { Component, OnInit, ViewChild, Input, ElementRef, OnDestroy } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
import { AlertService } from 'src/app/services/alert.service';
import { MatTabsModule } from '@angular/material/tabs';
import { UserService } from 'src/app/services/user.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { takeUntil } from 'rxjs/operators';
import { Observable, Subject, pipe } from 'rxjs';
import { GeneralInfoInd } from 'src/app/models/supplier.modal';
import * as uuid from 'uuid/v4';


@Component({
  selector: 'app-individual-registration',
  templateUrl: './individual-registration.component.html',
  styleUrls: ['./individual-registration.component.scss']
})
export class IndividualRegistrationComponent implements OnInit, OnDestroy {
  isDataMoci: any;
  allAddresses: any;
  editBank: boolean;
  editbankData: any;
  showBtn: boolean;

  constructor(
    private router: Router,
    private supplierService: SupplierRegistrationService,
    private modalService: NgbModal,
    private userService: UserService,
    // private ActivatedRoute: ActivatedRoute,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private spinner: SpinnerService,
    private alertService: AlertService,
    private individualService: SupplierIndividualRegisterService
  ) { }

  get f() {
    return this.form.controls;
  }
  get bf() {
    return this.bankform.controls;

  }

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  closeResult: string;
  order = false;
  completed = false;
  @Input('searchText') searchText: any;

  editCompanyDetails = false;
  editDirectorDetails = false;
  editGeneralManagerDetails = false;

  // address form
  form: FormGroup = new FormGroup({
    addressID: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    // language: new FormControl(''),
    country: new FormControl('', [Validators.required]),
    isMoci: new FormControl(false),
    isEdit: new FormControl(false),
    isUpdate: new FormControl()
  });

  bankform: FormGroup = new FormGroup({
    bankingID: new FormControl('', [Validators.required]),
    bankingIdname: new FormControl('', [Validators.required]),
    bankAcc: new FormControl('', [Validators.required, , Validators.pattern('^[0-9]*$')]),
    bankName: new FormControl('', [Validators.required]),
    bankBranch: new FormControl('', [Validators.required]),
    holderName: new FormControl('', [Validators.required]),
    isMoci: new FormControl(false),
    isUpdate: new FormControl()
  });

  staffData: any[];
  staffSearch: string;
  newData: any;
  communicationData: CommunicationDetailsStep;
  subContractorData: any[];
  equipmentData: any[];
  otherData: any[];
  activityData: any;

  isLocal = false;
  isIndividual = false;
  isInternational = false;
  personalData: PersonalDetailsInd[];
  BankDetails: any;
  internationalAddress: any[];
  selectedAddress: any;
  activityMenu: boolean;
  editAddress = false;
  selected = new FormControl(0);

  destroy$: Subject<boolean> = new Subject();
  generalInfoStep$: Observable<GeneralInfoStepInd>;


  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files = [];
  filesList = [];
  uploadData: any;
  selectedPage: any;

  // for send draft data
  individualRegisterDraft: any;

  // address for draft data;
  generalAddressDraft: any[] = [];
  personalDetailsDraft: any[] = [];
  bankDetailsDraft: any[] = [];
  otherInfoDraft: any[] = [];



  setDraftTime: any;


  loadData(data) {
    var d = [];
    d.push(data);
    this.formData = this.supplierService.getdata();
    this.internationalAddress = d;
  }

  ngOnInit(): void {
    this.setDraftTime = localStorage.getItem('setDraftTime');
    if (!(this.setDraftTime === 'null')) {
      const diff = this.getTimeDiff();
      if (diff > 72) {
        this.supplierService.deleteDraftData().subscribe(res => {
          this.spinner.openSpinner();
          const body = {
            civil_number: localStorage.getItem('civilReg'),
            cr_number: localStorage.getItem('commercialReg'),
            register_status: localStorage.getItem('RegStatus'),
            register_type: localStorage.getItem('regType')
          };
          this.userService.supplierRegistration(body);
          this.alertService.pushWarning('Your 72 hours save draft time over, your previous data erased.');
          this.loadFormData();
        })
      } else {
        this.loadFormData();
      }
    } else {
      this.loadFormData();
    }
    // this.setDraftTime = localStorage.getItem('setDraftTime');
    // this.loadFormData();


    this.showBtn = true;
    this.formData = this.supplierService.getdata();
    // this.selectedAddress = this.formData.generalInfoStep.generalInfo.address[0];
    // this.allAddresses = this.formData.generalInfoStep.generalInfo.address;
    // this.internationalAddress = this.formData.generalInfoStep.generalInfo.address;
    // this.personalData = this.formData.personalDetailsStep.personalDetails;
    // this.staffData = this.formData.staffDetails;
    // this.communicationData = this.formData.communicationDetailsStep;
    // this.subContractorData = this.formData.subContractorDetails;
    // this.equipmentData = this.formData.equipmentDetails;
    // this.BankDetails = this.formData.commercialInfoStep.bankInfoTab.bankDetails;
    // this.otherData = this.formData.commercialInfoStep.otherInfoTab.otherInfo;
    // this.activityData = this.formData.commercialInfoStep.activityInfoTab;
    // this.loadData(this.formData.generalInfoStep.generalInfo.address[0]);
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  getTimeDiff() {
    if (!(this.setDraftTime === 'null')) {
      const startTime: any = new Date(this.setDraftTime);
      const endTime: any = new Date();
      const timeDiff = Math.floor((endTime - startTime) / 3600000);
      return timeDiff;
    } else {
      return 0;
    }

  }

  private loadFormData(): void {

    if (!(this.setDraftTime === 'null')) {
      const diff = this.getTimeDiff();
      if (diff > 72) {
        this.alertService.pushWarning('Your 72 hours save draft time over, your previous data erased.');
      }
    }


    this.generalInfoStep$ = this.individualService.getGeneralInfoStep();
    this.generalInfoStep$.pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        this.selectedAddress = res.generalInfo.address[0];
        this.allAddresses = res.generalInfo.address;

        if (!this.allAddresses[0]) {
          this.selectedAddress = this.formData.generalInfoStep.generalInfo.address[0];
          this.allAddresses = this.formData.generalInfoStep.generalInfo.address;
        }
      });

    this.individualService.getPersonalInfoStep().pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        this.personalData = res.personalDetails;

        if (!this.personalData[0]) {
          this.personalData = this.formData.personalDetailsStep.personalDetails;
        }
      });

    this.individualService.getCommunicationInfoStep().pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        this.communicationData = res;

        if (!this.communicationData[0]) {
          this.communicationData = this.formData.communicationDetailsStep;
        }
      });

    this.individualService.getCommercialInfoStep().pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        this.BankDetails = res.bankInfoTab.bankDetails;
        this.otherData = res.otherInfoTab.otherInfo;
        this.activityData = res.activityInfoTab;

        if (!this.BankDetails[0]) {
          this.BankDetails = this.formData.commercialInfoStep.bankInfoTab.bankDetails;
        }
        if (!this.otherData[0]) {
          this.otherData = this.formData.commercialInfoStep.otherInfoTab.otherInfo;
        }
        // if(!this.activityData) {
        //   this.activityData = this.formData.commercialInfoStep.activityInfoTab;
        // }
      });

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
      this.bankform.patchValue({ bankingID: uuid(), isMoci: false, isUpdate: false });
      this.editbankData = this.bankform.value;
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
      this.form.patchValue({ addressID: uuid(), country: 'Oman', isEdit: false, isMoci: false, isUpdate: false });
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
      // if (this.editAddress == true) {
      //   this.allAddresses.filter((d, i) => {
      //     if (d.addressID == this.selectedAddress.addressID) {
      //       this.selectedAddress = this.form.value;
      //       this.allAddresses.splice(i, 1, this.form.value);
      //     }
      //   });
      //   this.editAddress = false;
      //   this.form.reset();
      // } else {
      //   this.allAddresses.push(this.form.value);
      // }
      if (this.editAddress == true) {
        this.allAddresses.filter((d, i) => {
          if (d.addressID == this.selectedAddress.addressID) {
            this.selectedAddress = this.form.value;
            this.allAddresses.splice(i, 1, this.form.value);
          }
        });
        this.editAddress = false;
        this.form.reset();
      } else {
        this.selectedAddress = this.form.value;
        this.allAddresses.push(this.form.value);
      }
      if (this.selectedAddress.isUpdate === null) {
        this.selectedAddress['isUpdate'] = true;
      }
      if (this.generalAddressDraft.length === 0) {
        this.generalAddressDraft.push({ ...this.selectedAddress });
      } else {
        const index = this.generalAddressDraft.findIndex(address => address.addressID === this.selectedAddress.addressID);
        index === -1 ?
          this.generalAddressDraft.push({ ...this.selectedAddress }) :
          this.generalAddressDraft[index] = { ...this.selectedAddress };
      }
      this.form.reset();
    }
  }
  submitRegistration() {
    this.completed = true;
    localStorage.setItem('1completeToken', 'true');
    localStorage.setItem('LocalRegComplete', 'true');
    localStorage.setItem('RegStatus', 'finish');
    this.spinner.openSpinner();
    const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    this.userService.supplierRegistration(body);
    // this.router.navigateByUrl('/landing/supplier-registration/transaction');
  }


  saveDraft(step: number = 0) {


    // this.localRegisterDraft = {
    //   supplierType: localStorage.getItem('regType'),
    //   status: 'Draft',
    //   supplierId: localStorage.getItem('supplierId'),
    //   setDraftTime: this.setDraftTime === 'null' ? new Date().toISOString() : null,
    //   removeDraftTime: false,
    //   stepper: String(step),
    //   data
    // };

    this.localDraftData(step, false);
    this.individualService.storeIndividualData(this.individualRegisterDraft)
      .subscribe(
        () => {
          this.callSupplierRegister();
        },
        (err) => {
          console.log('err :>> ', err);
        },
      );
    // console.log(this.localRegisterDraft)
    // call api for save draft

    // localStorage.setItem('RegStatus', 'draft');
    // this.spinner.openSpinner();
    // const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    // this.userService.supplierRegistration(body);
    // this.alertService.pushWarning('Your data will be saved for 72 hours.');
    // this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  callSupplierRegister() {
    localStorage.setItem('RegStatus', 'draft');
    this.spinner.openSpinner();
    const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    this.userService.supplierRegistration(body);
    this.alertService.pushWarning('Your data will be saved for 72 hours.');
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  localDraftData(step: number = 0, removeFlag: boolean = false) {

    const data: any = {};

    if (this.generalAddressDraft.length > 0) {
      data.generalInfoStep = [...this.generalAddressDraft];
    }

    if (this.personalDetailsDraft.length > 0) {
      data.personalDetailStep = [...this.personalDetailsDraft];
    }

    if (this.bankDetailsDraft.length > 0) {
      data.bankDetailStep = { BankDetails: this.bankDetailsDraft }
    }

    if (this.otherInfoDraft.length > 0) {
      data.bankDetailStep = { ...data.bankDetailStep, otherInfo: this.otherInfoDraft }
    }


    this.individualRegisterDraft = {
      supplierType: localStorage.getItem('regType'),
      status: 'Draft',
      supplierId: localStorage.getItem('supplierId'),
      setDraftTime: this.setDraftTime === 'null' ? new Date().toISOString() : null,
      removeDraftTime: removeFlag,
      stepper: String(step),
      data
    };
  }

  submitbank() {
    let bankAccFlag: boolean = false;
    if (this.bankform.status === 'VALID') {
      // check user has already addded this account or not
      this.BankDetails.filter(bank => {
        if (bank.bankAcc == this.bankform.value.bankAcc) {
          if (bank.bankingID != this.bankform.value.bankingID) {
            bankAccFlag = true;
          }
        }
      });

      // if already have added this account
      if (bankAccFlag) {
        this.alertService.pushError('Already added this Account.');
      } else {
        if (this.editBank == true) {
          this.BankDetails.filter((d, i) => {
            if (d.bankingID == this.editbankData.bankingID) {
              this.editbankData = this.bankform.value;
              // this.editbankData['isUpdate'] = true;
              this.BankDetails.splice(i, 1, this.bankform.value);
            }
          });
          this.editBank = false;
        } else {
          this.editbankData = this.bankform.value;
          this.BankDetails.push(this.bankform.value);
        }

        // check/set isUpdate 
        if (this.editbankData.isUpdate == null) {
          this.editbankData['isUpdate'] = true;
        }
        //add bank data to draft
        if (this.bankDetailsDraft.length === 0) {
          this.bankDetailsDraft.push({ ...this.editbankData });
        } else {
          const index = this.bankDetailsDraft.findIndex(bank =>
            (bank.bankingID === this.editbankData.bankingID));
          index === -1 ?
            this.bankDetailsDraft.push({ ...this.editbankData }) :
            this.bankDetailsDraft[index] = { ...this.editbankData };
        }
      }
      this.bankform.reset();
    }
  }

  delete(data) {
    this.formData.address.filter((d, i) => {
      if (d.poBox == data.poBox) {
        this.formData.address.splice(i, 1);
      }
    });
  }
  registrationComplete() {
    this.completed = true;
  }
  // move(index: number) {
  //   this.stepper.selectedIndex = index;
  // }

  Cancel() {
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  dblclick(data) {
    if (this.showBtn === true) {
      if (!data.isMoci) {
        data.isEdit = true;
        this.showBtn = false;
      }
    }
  }

  addNewRow(datatype) {
    this.showBtn = false;

    if (datatype === 'staff') {
      // this.staffData.map((data, i) => {
      //   if (data.name == '') {
      //     this.staffData.splice(i, 1);
      //   }
      // });
      // this.newData = {
      //   name: ' * ',
      //   qualification: '',
      //   specialization: '',
      //   jobTitle: '',
      //   designation: '',
      //   designationDate: '',
      //   expDate: '',
      //   experience: '',
      //   appointmentDate: '',
      //   status: '',
      //   statusDate: '',
      //   staffCategory: '',
      //   passportNum: '',
      //   recidentCard: '',
      //   civilNo: '',
      //   crNo: '',
      //   omaniratio: '',
      //   isEdit: true
      // };
      // this.staffData.push(this.newData);
    }
    if (datatype === 'communication') {
      //   this.communicationData.map((data, i) => {
      //     if (data.method == '') {
      //       this.communicationData.splice(i, 1);
      //     }
      //   });
      //   this.newData = {
      //     no: this.communicationData.length + 1,
      //     method: ' * ',
      //     value: ' ',
      //     isEdit: true
      //   };
      //   this.communicationData.push(this.newData);
    }
    if (datatype === 'subContractor') {
      // this.subContractorData.map((data, i) => {
      //   if (data.nameOfWork == '') {
      //     this.subContractorData.splice(i, 1);
      //   }
      // });
      // this.newData = {
      //   no: this.subContractorData.length + 1,
      //   nameOfWork: ' * ',
      //   subContractor: '',
      //   crNo: '',
      //   telephone: '',
      //   fax: '',
      //   email: '',
      //   regWithRca: '',
      //   isEdit: true
      // };
      // this.subContractorData.push(this.newData);
    }
    if (datatype === 'equipment') {
      //   this.equipmentData.map((data, i) => {
      //     if (data.type == '') {
      //       this.equipmentData.splice(i, 1);
      //     }
      //   });
      //   this.newData = {
      //     no: this.equipmentData.length + 1,
      //     type: ' * ',
      //     quantity: '',
      //     capacity: '',
      //     year: '',
      //     regNo: '',
      //     approxValue: '',
      //     isEdit: true
      //   };
      //   this.equipmentData.push(this.newData);
    }
    if (datatype === 'activity') {
      //   this.activityData.map((data, i) => {
      //     if (data.activityName == '') {
      //       this.activityData.splice(i, 1);
      //     }
      //   });
      //   this.newData = {
      //     activityName: '',
      //     subActivity: '',
      //     sagment: '',
      //     family: '',
      //     class: '',
      //     commodity: '',
      //     isEdit: true,
      //     isMoci: false
      //   };
      //   this.activityData.push(this.newData);
    }
    if (datatype === 'other') {
      this.otherData.map((data, i) => {
        if (data.name == '') {
          this.otherData.splice(i, 1);
        }
      });
      this.newData = {
        otherID: uuid(),
        name: "",
        value: "",
        isEdit: true,
        isUpdate: false
      };
      this.otherData.push(this.newData);
    }
    if (datatype === 'personal') {
      this.personalData.map((data, i) => {
        if (data.nationality == '') {
          this.personalData.splice(i, 1);
        }
      });
      this.newData = {
        personalID: uuid(),
        nationality: '',
        idtype: '',
        designation: '',
        age: '',
        dob: '',
        members: '',
        socialStatus: '',
        familySecurity: '',
        documents: [],
        isMoci: false,
        isEdit: true,
        isUpdate: false
      };
      this.personalData.push(this.newData);
    }
  }

  enteredDetails(datatype, data) {
    data.isEdit = false;
    if (datatype === 'staff') {
      // if (data.name !== '') {
      // this.staffData.map((d, i) => {
      //   if (d.name == data.name) {
      //     d = data;
      //   }
      // });
      //   if (data.name === ' * ') {
      //     data.name = '',
      //       data.isEdit = true;
      //   }
      //   this.showBtn = true;
      // } else {
      // this.staffData.map((data, i) => {
      //   if (data.name == '') {
      //     this.staffData.splice(i, 1);
      //   }
      // });
      //   data.isEdit = true;
      //   this.alertService.pushError('name can not be empty.');
      // }
    }
    if (datatype === 'communication') {

      //   if (data.method !== '') {
      //     this.communicationData.map((d, i) => {
      //       if (d.no == data.no) {
      //         d = data;
      //       }
      //     });
      //     if (data.method === ' * ') {
      //       data.method = '',
      //         data.isEdit = true;
      //     }
      //     this.showBtn = true;
      //   } else {
      //     // this.communicationData.map((data, i) => {
      //     //   if (data.method == '') {
      //     //     this.communicationData.splice(i, 1);
      //     //   }
      //     // });
      //     data.isEdit = true;
      //     this.alertService.pushError('Communication Method can not be empty.');
      //   }
    }
    if (datatype === 'subContractor') {
      // if (data.nameOfWork !== '') {
      // this.subContractorData.map((d, i) => {
      //   if (d.no == data.no) {
      //     d = data;
      //   }
      // });
      // if (data.nameOfWork === ' * ') {
      //   data.nameOfWork = '',
      //     data.isEdit = true;
      // }
      // this.showBtn = true;
      // } else {
      // this.subContractorData.map((data, i) => {
      //   if (data.nameOfWork == '') {
      //     this.subContractorData.splice(i, 1);
      //   }
      // });
      //   data.isEdit = true;
      //   this.alertService.pushError('nameOfWork can not be empty.');
      // }
    }
    if (datatype === 'equipment') {
      // if (data.type !== '') {
      // this.equipmentData.map((d, i) => {
      //   if (d.no == data.no) {
      //     d = data;
      //   }
      // });
      //   if (data.type === ' * ') {
      //     data.type = '',
      //       data.isEdit = true;
      //   }
      //   this.showBtn = true;
      // } else {
      // this.equipmentData.map((data, i) => {
      //   if (data.type == '') {
      //     this.equipmentData.splice(i, 1);
      //   }
      // });
      //   data.isEdit = true;
      //   this.alertService.pushError('type can not be empty.');
      // }
    }
    if (datatype === 'activity') {
      // if (data.activityName !== '') {
      //   this.activityData.map((d, i) => {
      //     if (d.no == data.no) {
      //       d = data;
      //     }
      //   });
      //   if (data.activityName === ' * ') {
      //     data.activityName = '',
      //       data.isEdit = true;
      //   }
      //   this.showBtn = true;
      // } else {
      // this.activityData.map((data, i) => {
      //   if (data.activityName == '') {
      //     this.activityData.splice(i, 1);
      //   }
      // });
      //   data.isEdit = true;
      //   this.alertService.pushError('Activity Name can not be empty.');
      // }
    }
    if (datatype === 'other') {
      if (data.name !== '') {
        this.otherData.map((d, i) => {
          if (d.otherID == data.otherID) {
            d = data;

            if (!d.hasOwnProperty('isUpdate')) {
              d['isUpdate'] = true;
            }
            if (this.otherInfoDraft.length === 0) {
              this.otherInfoDraft.push({ ...d });
            } else {
              const index = this.otherInfoDraft.findIndex(other => other.otherID === d.otherID);
              index === -1 ? this.otherInfoDraft.push({ ...d }) : this.otherInfoDraft[index] = { ...d };
            }
          }
        });
        this.showBtn = true;
      } else {
        // this.otherData.map((data, i) => {
        //   if (data.nameOfWork == '') {
        //     this.otherData.splice(i, 1);
        //   }
        // });
        data.isEdit = true;
        this.alertService.pushError('Name can not be empty.');
      }
    }
    if (datatype === 'personal') {
      if (data.nationality !== '') {
        this.personalData.map((d, i) => {
          if (d.personalID == data.personalID) {
            d = data;

            if (!d.hasOwnProperty('isUpdate')) {
              d['isUpdate'] = true;
            }
            if (this.personalDetailsDraft.length === 0) {
              this.personalDetailsDraft.push({ ...d });
            } else {
              const index = this.personalDetailsDraft.findIndex(personal => personal.personalID === d.personalID);
              index === -1 ? this.personalDetailsDraft.push({ ...d }) : this.personalDetailsDraft[index] = { ...d };
            }

          }
        });
        this.showBtn = true;
      } else {
        // this.personalData.map((data, i) => {
        //   if (data.nationality == '') {
        //     this.personalData.splice(i, 1);
        //   }
        // });
        data.isEdit = true;
        this.alertService.pushError('Nationality can not be empty.');
      }
    }

  }

  deleteRow(datatype, data) {
    this.showBtn = true;
    if (datatype === 'subContractor') {
      // this.subContractorData.map((d, i) => {
      //   if (d.no == data.no) {
      //     this.subContractorData.splice(i, 1);
      //   }
      // });
    }
    // if (datatype === 'equipment') {
    //   this.equipmentData.map((d, i) => {
    //     if (d.no == data.no) {
    //       this.equipmentData.splice(i, 1);
    //     }
    //   });
    // }
    if (datatype === 'other') {
      this.otherData.map((d, i) => {
        if (d.otherID == data.otherID) {
          this.otherData.splice(i, 1);
        }
      });
    }
    if (datatype === 'activity') {
      this.activityData.map((d, i) => {
        if (d.activityName == data.activityName) {
          this.activityData.splice(i, 1);
        }
      });
    }
    if (datatype === 'personal') {
      this.personalData.map((d, i) => {
        if (d.no == data.no) {
          this.personalData.splice(i, 1);
        }
      });
      let index = this.personalDetailsDraft.findIndex(personal => personal.personalID == data.personalID);
      index !== -1 ?
        this.personalDetailsDraft[index].isUpdate === false ?
          this.personalDetailsDraft.splice(index, 1) :
          this.personalDetailsDraft[index]['isDelete'] = true
        : null;
    }
  }

  sorting(property, str) {
    this.order = !this.order;
    if (this.order === true) {
      // if (property === 'staff') {
      //   this.staffData = this.sortByPipe.transform(this.formData.staffDetails, 'asc', str);
      // }
      // if (property === 'communication') {
      //   this.communicationData = this.sortByPipe.transform(this.formData.communicationDetailsStep, 'asc', str);
      // }
      // if (property === 'subcontractor') {
      //   this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails, 'asc', str);
      // }
      // if (property === 'equipment') {
      //   this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails, 'asc', str);
      // }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.otherData, 'asc', str);
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.formData.commercialInfoStep.activityInfoTab, 'asc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.personalData, 'asc', str);
      }
    } else {
      // if (property === 'staff') {
      //   this.staffData = this.sortByPipe.transform(this.formData.staffDetails, 'desc', str);
      // }
      // if (property === 'communication') {
      //   this.communicationData = this.sortByPipe.transform(this.formData.communicationDetailsStep, 'desc', str);
      // }
      // if (property === 'subcontractor') {
      //   this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetails, 'desc', str);
      // }
      // if (property === 'equipment') {
      //   this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetails, 'desc', str);
      // }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.otherData, 'desc', str);
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.formData.commercialInfoStep.activityInfoTab, 'desc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.personalData, 'desc', str);
      }
    }
  }

  selectChange(event) {
    var dp = this.formData;

    if (dp.generalInfoStep.generalInfo.address != undefined && event.target.selectedIndex > dp.generalInfoStep.generalInfo.address.length) {

      this.loadData(dp.generalInfoStep.generalInfo.address[event.target.selectedIndex]);
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

  callUploadService(file, data, flag) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    if (this.selectedPage === 'personal') {
      this.filesList = [];
      this.personalData.map((d, i) => {
        if (d.personalID == data.personalID) {
          this.filesList.push(d.documents);
        }
      });
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
        // this.filesList.filter(f => {
        //   if (f.name.toString() == file.name.toString()) {
        //     alert('already have similar name file.');
        //     flag = true;
        //   }
        // });
        // if (flag == false) {
        this.files = [];
        this.files.push({ data: file, inProgress: false, progress: 0 });
        // }
      }
      this.upload(data, flag);
    };
    fileInput.click();
  }

  openFile(content, page, data, isMoci) {
    this.isDataMoci = isMoci;
    this.selectedPage = page;
    this.uploadData = data;
    if (this.selectedPage === 'personal') {
      this.filesList = [];
      this.personalData.map((d, i) => {
        if (d.personalID == data.personalID) {
          this.filesList.push(d.documents);
        }
      });
    }
    this.open(content);
  }

  deleteFile(file) {
    if (confirm('Do you want to delete ' + file.name + '?')) {
      if (this.selectedPage === 'personal') {
        this.filesList = [];
        this.personalData.map((d) => {
          if (d.personalID == this.uploadData.personalID) {
            d.documents = {};
          }
        });
      }
    }
  }

}
