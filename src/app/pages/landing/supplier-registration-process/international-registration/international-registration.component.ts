import { SupplierInternationalRegisterService } from './../../../../services/supplier-international-register.service';
import { takeUntil } from 'rxjs/operators';
import { GeneralInfoStepInd, AddressInd, CommunicationDetailsStep } from './../../../../models/supplier.modal';
import { OtherInfo } from './../../../../models/tender.model';
import { Component, OnInit, ViewChild, Input, OnDestroy, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
import { SupplierIndividualRegisterService } from 'src/app/services/supplier-individual-register.service';
import { Observable, Subject } from 'rxjs';
import * as uuid from 'uuid/v4';



@Component({
  selector: 'app-international-registration',
  templateUrl: './international-registration.component.html',
  styleUrls: ['./international-registration.component.scss']
})
export class InternationalRegistrationComponent implements OnInit, OnDestroy, AfterViewInit {

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
    isUpdate: new FormControl(false),
    isEdit: new FormControl(false)
  });

  staffSearch: string;
  newData: any;
  subContractorData: any[];
  equipmentData: any[];

  isLocal = false;
  isIndividual = false;
  isInternational = false;
  activityMenu: boolean;
  editAddress = false;
  editBank: boolean;
  editbankData: any;

  selected = new FormControl(0);
  showBtn: boolean;

  selectedAddress: any;
  allAddresses: AddressInd[];
  personalData: any[];
  communicationData: CommunicationDetailsStep;
  staffData: any[];
  activityData: any[];
  activityDetail: any;
  bankDetails: any;
  otherData: any[];
  internationalAddress: any[];



  destroy$: Subject<boolean> = new Subject();
  generalInfoStep$: Observable<GeneralInfoStepInd>;


  // draft variable
  generalAddressDraft: any[] = [];
  personalDetailsDraft: any[] = [];
  bankActivityDraft: any[] = [];
  bankDetailDraft: any[] = [];
  bankOtherDraft: any[] = [];
  employeeDetailsDraft: any = [];
  internationalRegistrationDraft: any;

  setDraftTime: any;


  constructor(
    private router: Router,
    private supplierData: SupplierRegistrationService,
    private modalService: NgbModal,
    private userService: UserService,
    // private ActivatedRoute: ActivatedRoute,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private spinner: SpinnerService,
    private alertService: AlertService,
    private internationalService: SupplierInternationalRegisterService,
    private cdr: ChangeDetectorRef,
    private supplierService: SupplierRegistrationService
  ) { }

  loadData(data) {
    let d = [];
    d.push(data);
    this.formData = this.supplierData.getdata();
    this.internationalAddress = d;
  }

  ngOnInit(): void {
    this.setDraftTime = localStorage.getItem('setDraftTime');
    if (!(this.setDraftTime === 'null')) {
      const diff = this.getTimeDiff();
      if (diff > 72) {
        this.supplierService.deleteDraftData().subscribe(res => {
          this.spinner.openSpinner();
          const body =
          {
            email: localStorage.getItem('internationalEmail'),
            register_status: localStorage.getItem('RegStatus'),
            register_type: localStorage.getItem('regType')
          };
          this.userService.supplierRegistrationForDraft(body).subscribe(res => {
            this.alertService.pushWarning('Your 72 hours save draft time over, your previous data erased.');
            this.loadFormData();
          });
        });
      } else {
        this.loadFormData();
      }
    } else {
      this.loadFormData();
    }
    this.showBtn = true;

    // this.selectedAddress = this.formData.generalInfoStep.generalInfo.address[0];
    // this.allAddresses = this.formData.generalInfoStep.generalInfo.address;
    // this.internationalAddress = this.formData.generalInfoStep.generalInfo.address[0];
    // this.personalData = this.formData.personalDetailsStep.personalDetails;
    // this.staffData = this.formData.employeeDetailsStep.employeeDetails;
    // this.communicationData = this.formData.communicationDetailsStep;
    // this.subContractorData = this.formData.subContractorDetailsStep.subContractorDetails;
    // this.equipmentData = this.formData.equipmentDetailsStep.equipmentDetails;

    // this.BankDetails = this.formData.commercialInfoStep.bankInfoTab.bankDetails;
    // this.otherData = this.formData.commercialInfoStep.otherInfoTab.otherInfo;
    // this.activityData = this.formData.commercialInfoStep.activityInfoTab.activities;
    // this.activityDetail = this.formData.commercialInfoStep.activityInfoTab;
    // this.loadData(this.formData.individualAddress[0]); 
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  ngAfterViewInit() {
    this.stepper.selectedIndex = localStorage.getItem('stepper') === 'null' ? 0 : +localStorage.getItem('stepper');
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

  loadFormData(): void {
    this.supplierData.getdata('international').subscribe(data => {
      this.formData = data;
    });

    this.generalInfoStep$ = this.internationalService.getGeneralInfoStep();
    this.generalInfoStep$.pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.allAddresses = [...this.formData.generalInfoStep.generalInfo.address, ...res.generalInfo.address];
        this.selectedAddress = this.allAddresses[0];

        // if (!this.allAddresses[0]) {
        //   this.selectedAddress = this.formData.generalInfoStep.generalInfo.address[0];
        //   this.allAddresses = this.formData.generalInfoStep.generalInfo.address;
        // }
      });
    this.internationalService.getPersonalInfoStep().pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        this.personalData = [...this.formData.personalDetailsStep.personalDetails, ...res.personalDetails];

        // if (!this.personalData[0]) {
        //   this.personalData = this.formData.personalDetailsStep.personalDetails;
        // }
        this.cdr.detectChanges();
      });

    this.internationalService.getCommunicationInfoStep().pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        // this.communicationData = res;
        this.communicationData = this.formData.communicationDetailsStep;

      });

    this.internationalService.getEmployeeInfoStep().pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        this.staffData = [...this.formData.employeeDetailsStep.employeeDetails, ...res];

        // if (!this.staffData[0]) {
        //   this.staffData = this.formData.employeeDetailsStep.employeeDetails;
        // }
        this.cdr.detectChanges();
      });

    this.internationalService.getCommercialInfoStep().pipe(takeUntil(this.destroy$)).
      subscribe(res => {
        // this.activityDetail = res.activityInfoTab || this.formData.commercialInfoStep.activityInfoTab;
        this.activityDetail = this.formData.commercialInfoStep.activityInfoTab;
        this.activityData = [...this.formData.commercialInfoStep.activityInfoTab.activities, ...this.activityDetail.activities];
        this.bankDetails = [...this.formData.commercialInfoStep.bankInfoTab.bankDetails, ...res.bankInfoTab.bankDetails];
        this.otherData = [...this.formData.commercialInfoStep.otherInfoTab.otherInfo, ...res.otherInfoTab.otherInfo];

        // if (!this.activityData[0]) {
        //   this.activityDetail = this.formData.commercialInfoStep.activityInfoTab;
        //   this.activityData = this.formData.commercialInfoStep.activityInfoTab.activities;
        // }
        // if (!this.bankDetails[0]) {
        //   this.bankDetails = this.formData.commercialInfoStep.bankInfoTab.bankDetails;
        // }
        // if (!this.otherData[0]) {
        //   this.otherData = this.formData.commercialInfoStep.otherInfoTab.otherInfo;
        // }
        this.cdr.detectChanges();
      });
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
      this.bankform.reset();
      this.bankform.patchValue(details);
      this.editBank = true;
      this.editbankData = details;
      this.open(content);
    } else {
      this.bankform.reset();
      this.bankform.patchValue({ bankingID: uuid(), isMoci: false, isEdit: false, isUpdate: false });
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

    this.internationalDraftData(4, true);

    this.internationalService.storeInternationalData(this.internationalRegistrationDraft)
      .subscribe(
        () => {
          this.finishStepper();
        },
        (err) => {
          console.log('err :>> ', err);
        },
      );
  }

  private finishStepper() {
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


  private internationalDraftData(step: number = 0, removeFlag: boolean = false) {
    const data: any = {};

    if (this.generalAddressDraft.length > 0) {
      data.generalInfoStep = [...this.generalAddressDraft];
    }

    if (this.personalDetailsDraft.length > 0) {
      data.personalDetailsStep = [...this.personalDetailsDraft];
    }

    if (this.bankActivityDraft.length > 0) {
      data.commercialInfoStep = { activities: this.bankActivityDraft }
    }

    if (this.bankDetailDraft.length > 0) {
      data.commercialInfoStep = { ...data.commercialInfoStep, bankDetails: this.bankDetailDraft }
    }

    if (this.bankOtherDraft.length > 0) {
      data.commercialInfoStep = { ...data.commercialInfoStep, otherInfo: this.bankOtherDraft }
    }

    if (this.employeeDetailsDraft.length > 0) {
      data.employeeDetailsStep = [...this.employeeDetailsDraft];
    }


    this.internationalRegistrationDraft = {
      supplierType: localStorage.getItem('regType'),
      status: 'Draft',
      supplierId: localStorage.getItem('supplierId'),
      setDraftTime: this.setDraftTime === 'null' ? new Date().toISOString() : null,
      removeDraftTime: removeFlag,
      stepper: String(step),
      data
    };
  }


  saveDraft(step: number = 0) {

    this.internationalDraftData(step, false);

    this.internationalService.storeInternationalData(this.internationalRegistrationDraft)
      .subscribe(res => {
        this.callSupplierRegister();
      },
        (err) => console.log('err :>> ', err)
      );


  }

  private callSupplierRegister(): void {
    localStorage.setItem('RegStatus', 'draft');
    this.spinner.openSpinner();
    // tslint:disable-next-line: max-line-length
    const body = { email: localStorage.getItem('internationalEmail'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    this.userService.supplierRegistration(body);
    this.alertService.pushWarning('Your data will be saved for 72 hours.');
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  submitbank() {
    let bankAccFlag: boolean = false;
    if (this.bankform.status === 'VALID') {
      // check user has already addded this account or not
      this.bankDetails.filter(bank => {
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
          this.bankDetails.filter((d, i) => {
            if (d.bankingID == this.editbankData.bankingID) {
              this.editbankData = this.bankform.value;
              // this.editbankData['isUpdate'] = true;
              this.bankDetails.splice(i, 1, this.bankform.value);
            }
          });
          this.editBank = false;
        } else {
          this.editbankData = this.bankform.value;
          this.bankDetails.push(this.bankform.value);
        }

        // check/set isUpdate
        if (this.editbankData.isUpdate == null) {
          this.editbankData['isUpdate'] = true;
        }
        //add bank data to draft
        if (this.bankDetailDraft.length === 0) {
          this.bankDetailDraft.push({ ...this.editbankData });
        } else {
          const index = this.bankDetailDraft.findIndex(bank =>
            (bank.bankingID === this.editbankData.bankingID));
          index === -1 ?
            this.bankDetailDraft.push({ ...this.editbankData }) :
            this.bankDetailDraft[index] = { ...this.editbankData };
        }
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
      this.staffData.map((data, i) => {
        if (data.name == '') {
          this.staffData.splice(i, 1);
        }
      });
      this.newData = {
        employeeID: uuid(),
        name: '',
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
        isEdit: true,
        isUpdate: false,
        isMoci: false
      };
      this.staffData.push(this.newData);
    }
    // if (datatype === 'communication') {
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
    // }
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
        isEdit: true,
        isUpdate: false
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
        isEdit: true,
        isUpdate: false
      };
      this.equipmentData.push(this.newData);
    }
    if (datatype === 'other') {
      this.otherData.map((data, i) => {
        if (data.name == '') {
          this.otherData.splice(i, 1);
        }
      });
      this.newData = {
        otherID: uuid(),
        name: '',
        value: '',
        isEdit: true,
        isUpdate: false,
        isMoci: false
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
        activityID: uuid(),
        activityName: '',
        subActivity: '',
        sagment: '',
        family: '',
        class: '',
        commodity: '',
        isEdit: true,
        isMoci: false,
        isUpdate: false
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
        personalID: uuid(),
        personName: '',
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
        isMoci: false,
        isUpdate: false
      };
      this.personalData.push(this.newData);
    }
  }

  enteredDetails(datatype, data) {
    data.isEdit = false;
    if (datatype === 'staff') {

      if (data.name !== '') {
        this.staffData.map((d, i) => {
          if (d.employeeID == data.employeeID) {
            d = data;

            if (!d.hasOwnProperty('isUpdate')) {
              d['isUpdate'] = true;
            }
            if (this.employeeDetailsDraft.length === 0) {
              this.employeeDetailsDraft.push({ ...d });
            } else {
              const index = this.employeeDetailsDraft.findIndex(employee => employee.employeeID === d.employeeID);
              index === -1 ? this.employeeDetailsDraft.push({ ...d }) : this.employeeDetailsDraft[index] = { ...d };
            }
          }
        });
        this.showBtn = true;
      } else {
        // this.staffData.map((data, i) => {
        //   if (data.name == '') {
        //     this.staffData.splice(i, 1);
        //   }
        // });
        data.isEdit = true;
        this.alertService.pushError('Name can not be empty.');
      }
    }
    // if (datatype === 'communication') {

    // if (data.method !== '') {
    //   this.communicationData.map((d, i) => {
    //     if (d.no == data.no) {
    //       d = data;
    //     }
    //   });
    //   if (data.method === ' * ') {
    //     data.method = '',
    //       data.isEdit = true;
    //   }
    //   this.showBtn = true;
    // } else {
    // this.communicationData.map((data, i) => {
    //   if (data.method == '') {
    //     this.communicationData.splice(i, 1);
    //   }
    // });
    //   data.isEdit = true;
    //   this.alertService.pushError('Communication Method can not be empty.');
    // }
    // }
    // if (datatype === 'subContractor') {
    //   if (data.nameOfWork !== '') {
    //     this.subContractorData.map((d, i) => {
    //       if (d.no == data.no) {
    //         d = data;
    //       }
    //     });
    //     if (data.nameOfWork === ' * ') {
    //       data.nameOfWork = '',
    //         data.isEdit = true;
    //     }
    //     this.showBtn = true;
    //   } else {
    //     // this.subContractorData.map((data, i) => {
    //     //   if (data.nameOfWork == '') {
    //     //     this.subContractorData.splice(i, 1);
    //     //   }
    //     // });
    //     data.isEdit = true;
    //     this.alertService.pushError('nameOfWork can not be empty.');
    //   }
    // }
    // if (datatype === 'equipment') {
    //   if (data.type !== '') {
    //     this.equipmentData.map((d, i) => {
    //       if (d.no == data.no) {
    //         d = data;
    //       }
    //     });
    //     if (data.type === ' * ') {
    //       data.type = '',
    //         data.isEdit = true;
    //     }
    //     this.showBtn = true;
    //   } else {
    //     // this.equipmentData.map((data, i) => {
    //     //   if (data.type == '') {
    //     //     this.equipmentData.splice(i, 1);
    //     //   }
    //     // });
    //     data.isEdit = true;
    //     this.alertService.pushError('type can not be empty.');
    //   }
    // }
    if (datatype === 'other') {
      if (data.name !== '' && data.value !== '') {
        this.otherData.map((d, i) => {
          if (d.otherID == data.otherID) {
            d = data;

            if (!d.hasOwnProperty('isUpdate')) {
              d['isUpdate'] = true;
            }
            if (this.bankOtherDraft.length === 0) {
              this.bankOtherDraft.push({ ...d });
            } else {
              const index = this.bankOtherDraft.findIndex(other => other.otherID === d.otherID);
              index === -1 ? this.bankOtherDraft.push({ ...d }) : this.bankOtherDraft[index] = { ...d };
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
        this.alertService.pushError('Label and value both are required.');
      }
    }
    if (datatype === 'activity') {
      if (data.activityName !== '') {
        this.activityData.map((d, i) => {
          if (d.activityID == data.activityID) {
            d = data;

            if (!d.hasOwnProperty('isUpdate')) {
              d['isUpdate'] = true;
            }
            if (this.bankActivityDraft.length === 0) {
              this.bankActivityDraft.push({ ...d });
            } else {
              const index = this.bankActivityDraft.findIndex(activity => activity.activityID === d.activityID);
              index === -1 ? this.bankActivityDraft.push({ ...d }) : this.bankActivityDraft[index] = { ...d };
            }
          }
        });
        if (data.activityName === ' * ') {
          data.activityName = '',
            data.isEdit = true;
        }
        this.showBtn = true;
      } else {
        // this.activityData.map((data, i) => {
        //   if (data.activityName == '') {
        //     this.activityData.splice(i, 1);
        //   }
        // });
        data.isEdit = true;
        this.alertService.pushError('Activity Name can not be empty.');
      }
    }
    if (datatype === 'personal') {
      if (data.personName !== '') {
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
        //   if (data.personName == '') {
        //     this.personalData.splice(i, 1);
        //   }
        // });
        data.isEdit = true;
        this.alertService.pushError('Person Name can not be empty.');
      }
    }

  }

  deleteRow(datatype, data) {
    this.showBtn = true;
    if (datatype === 'staff') {
      this.staffData.map((d, i) => {
        if (d.employeeID == data.employeeID) {
          this.staffData.splice(i, 1);
          if (!data.hasOwnProperty('isUpdate') || data.isUpdate === true) {
            this.supplierService.singleDelete('employeedetails', data.employeeID).subscribe();
          }
        }
      });
      const index = this.employeeDetailsDraft.findIndex(employee => employee.employeeID === data.employeeID);
      index !== -1 ?
        this.employeeDetailsDraft[index].isUpdate === false ?
          this.employeeDetailsDraft.splice(index, 1) :
          this.employeeDetailsDraft[index]['isDelete'] = true
        : null;
    }
    // if (datatype === 'communication') {
    //   this.communicationData.map((d, i) => {
    //     if (d.no == data.no) {
    //       this.communicationData.splice(i, 1);
    //     }
    //   });
    // }
    // if (datatype === 'subContractor') {
    //   this.subContractorData.map((d, i) => {
    //     if (d.no == data.no) {
    //       this.subContractorData.splice(i, 1);
    //     }
    //   });
    // }
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
          if (!data.hasOwnProperty('isUpdate') || data.isUpdate === true) {
            this.supplierService.singleDelete('comotherdetails', data.otherID).subscribe();
          }
        }
      });
      const index = this.bankOtherDraft.findIndex(other => other.otherID === data.otherID);
      index !== -1 ?
        this.bankOtherDraft[index].isUpdate === false ?
          this.bankOtherDraft.splice(index, 1) :
          this.bankOtherDraft[index]['isDelete'] = true
        : null;
    }
    if (datatype === 'activity') {
      this.activityData.map((d, i) => {
        if (d.activityID == data.activityID) {
          this.activityData.splice(i, 1);
          if (!data.hasOwnProperty('isUpdate') || data.isUpdate === true) {
            this.supplierService.singleDelete('comactivitydetails', data.activityID).subscribe();
          }
        }
      });
      const index = this.bankActivityDraft.findIndex(activity => activity.activityID === data.activityID);
      index !== -1 ?
        this.bankActivityDraft[index].isUpdate === false ?
          this.bankActivityDraft.splice(index, 1) :
          this.bankActivityDraft[index]['isDelete'] = true
        : null;
    }
    if (datatype === 'personal') {
      this.personalData.map((d, i) => {
        if (d.personalID == data.personalID) {
          this.personalData.splice(i, 1);
          if (!data.hasOwnProperty('isUpdate') || data.isUpdate === true) {
            this.supplierService.singleDelete('personaldetails', data.personalID).subscribe();
          }
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
      if (property === 'staff') {
        this.staffData = this.sortByPipe.transform(this.staffData, 'asc', str);
      }
      // if (property === 'communication') {
      //   this.communicationData = this.sortByPipe.transform(this.formData.communicationDetailsStep, 'asc', str);
      // }
      // if (property === 'subcontractor') {
      //   this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetailsStep.subContractorDetails, 'asc', str);
      // }
      // if (property === 'equipment') {
      //   this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetailsStep.equipmentDetails, 'asc', str);
      // }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.otherData, 'asc', str);
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.activityData, 'asc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.personalData, 'asc', str);
      }
    } else {
      if (property === 'staff') {
        this.staffData = this.sortByPipe.transform(this.staffData, 'desc', str);
      }
      // if (property === 'communication') {
      //   this.communicationData = this.sortByPipe.transform(this.formData.communicationDetailsStep, 'desc', str);
      // }
      if (property === 'subcontractor') {
        this.subContractorData = this.sortByPipe.transform(this.formData.subContractorDetailsStep.subContractorDetails, 'desc', str);
      }
      // if (property === 'equipment') {
      //   this.equipmentData = this.sortByPipe.transform(this.formData.equipmentDetailsStep.equipmentDetails, 'desc', str);
      // }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.otherData, 'desc', str);
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.activityData, 'desc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.personalData, 'desc', str);
      }
    }
  }

  selectChange(event) {
    let dp = this.formData;

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

}
