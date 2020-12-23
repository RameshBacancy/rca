import { GeneralInfoStep, GeneralInfoTab, Address, Activities, PersonalDetailsStep, PersonalDetails, CommunicationMethodStep, CommunicationMethod, ActivityInfo, BankDetails, CompFinanceInfo, CompBranchInfo, OtherDetails, BankDetailStep, EmployeeDetailsStep, EmployeDetails, MinistriesData1Step, ProjectDetailsStep, ProjectDetails, MinistriesData2Step, MinistriesData3Step, SubContractorDetailsStep, SubContractorDetails, EquipmentDetailsStep, EquipmentDetails } from './../../../../models/supplier.modal';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { Component, OnInit, ViewChild, Input, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
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
import * as uuid from 'uuid/v4';


@Component({
  selector: 'app-local-registration',
  templateUrl: './local-registration.component.html',
  styleUrls: ['./local-registration.component.scss']
})
export class LocalRegistrationComponent implements OnInit, OnDestroy {

  @ViewChild('stepper') private stepper: MatStepper;
  @Input('searchText') searchText: any;
  formData: any;

  //close model pop-up
  closeResult: string;

  // for order of sorting
  order = false;

  completed = false;

  editCompanyDetails = false;
  editDirectorDetails = false;
  editGeneralManagerDetails = false;

  form: FormGroup = new FormGroup({
    addressID: new FormControl('', [Validators.required]),
    addressLine1: new FormControl('', [Validators.required]),
    addressLine2: new FormControl('', [Validators.required]),
    // language: new FormControl(''),
    country: new FormControl('', [Validators.required]),
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


  // employeeSearch: string;

  //to add new blank data 
  newData: any;




  // addressMenu: boolean;

  //personal detail tab
  personalData$: Observable<PersonalDetailsStep>;
  personalData: PersonalDetails[];

  // bank detail step
  bankDetailStep$: Observable<BankDetailStep>;
  activityInfoData: ActivityInfo[];
  BankDetails: BankDetails[];
  compFinanceInfoData: CompFinanceInfo;
  compBranchInfoData: CompBranchInfo[];
  otherData: OtherDetails[];
  editBank = false;
  editbankData: any;

  //communication method step
  communicationData$: Observable<CommunicationMethodStep>;
  communicationData: CommunicationMethod[]

  // general info step
  activityData: Activities[];
  allAddresses: Address[];
  generalInfo$: Observable<any>;
  selectedAddress: Address;
  editAddress = false;

  //employee detail step
  employeeData$: Observable<EmployeeDetailsStep>;
  employeeData: EmployeDetails[];
  arrayOfCatagory = [];
  staffCategory: any[];
  showTable: boolean;

  //ministries1 data step
  ministriesData1$: Observable<MinistriesData1Step>;
  ministriesData1: MinistriesData1Step;

  //ministries2 data step
  ministriesData2$: Observable<MinistriesData2Step>;
  ministriesData2: MinistriesData2Step;

  //ministries3 data step
  ministriesData3$: Observable<MinistriesData3Step>;
  ministriesData3: MinistriesData3Step;

  //project detial step
  projectData$: Observable<ProjectDetailsStep>;
  projectData: ProjectDetails[];

  //subContrator info step
  subContractorData$: Observable<SubContractorDetailsStep>;
  subContractorData: SubContractorDetails[];

  //equipment info stop
  equipmentData$: Observable<EquipmentDetailsStep>;
  equipmentData: EquipmentDetails[];

  activityMenu = false;
  selected = new FormControl(0);

  // file input 
  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files = [];
  filesList = [];
  uploadData: any;
  selectedPage: any;
  isDataMoci: any;

  crNo: string;
  civilNo: string;

  // site visit step
  siteVisitData: any;
  isSiteVisit: any = 'no';

  //show-hide buttons
  showBtn: boolean;

  destroy$: Subject<boolean> = new Subject();


  constructor(
    private router: Router,
    private supplierService: SupplierRegistrationService,
    private modalService: NgbModal,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private alertService: AlertService,
    private spinner: SpinnerService,
  ) { }


  ngOnInit(): void {
    this.loadData();
    this.showBtn = true;
    this.showTable = false;
    this.formData = this.supplierService.getdata();
    // this.generalInfo = this.formData.generalInfoStep.generalInfoTab;
    // this.generalInfo = this.formData.generalInfoStep.generalInfoTab;
    // this.activityData = this.formData.generalInfoStep.generalInfoTab.activities;
    // this.allAddresses = this.formData.generalInfoStep.addressInfoTab.address;
    // this.selectedAddress = this.formData.generalInfoStep.addressInfoTab.address[0];
    // this.personalData = this.formData.personalDetailsStep.personalDetails;
    // this.communicationData$ = this.formData.communicationMethodStep.communicationMethod;
    // this.activityInfoData = this.formData.bankDetailStep.activityInfoTab.activityInfo;
    // this.BankDetails = this.formData.bankDetailStep.bankDetailsTab.BankDetails;
    // this.compFinanceInfoData = this.formData.bankDetailStep.companyInfoTab.compFinanceInfo;
    // this.compBranchInfoData = this.formData.bankDetailStep.companyInfoTab.compBranchInfo;
    // this.otherData = this.formData.bankDetailStep.otherInfoTab.otherDetails;
    // this.ministriesData1 = this.formData.ministriesData1Step;
    // this.ministriesData2 = this.formData.ministriesData2Step;
    // this.ministriesData3 = this.formData.ministriesData3Step;
    // this.employeeData = this.formData.employeeDetailsStep.employeDetails;
    // this.projectData = this.formData.projectDetailsStep.projectDetails;
    // this.subContractorData = this.formData.subContractorDetailsStep.subContractorDetails;
    // this.equipmentData = this.formData.equipmentDetailsStep.equipmentDetails;
    // this.siteVisitData = this.formData.siteVisit;
    // this.getEmployeeCategories();
    this.crNo = localStorage.getItem('commercialReg');
    this.civilNo = localStorage.getItem('civilReg');
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

  loadData() {
    // general info step
    this.generalInfo$ = this.supplierService.getGeneralInfoStep();
    this.generalInfo$.
      pipe(
        takeUntil(this.destroy$)
      ).subscribe((res: GeneralInfoStep) => {
        this.activityData = res.generalInfoTab.generalInfoDetails;
        this.allAddresses = res.addressInfoTab.address;
        this.selectedAddress = res.addressInfoTab.address[0];
        if (!this.activityData[0]) {
          this.activityData = this.formData.generalInfoStep.generalInfoTab.activities;
          this.allAddresses = this.formData.generalInfoStep.addressInfoTab.address;
          this.selectedAddress = this.formData.generalInfoStep.addressInfoTab.address[0];
        }
      });

    //personal detail step
    this.personalData$ = this.supplierService.getPersonalInfoStep();
    this.personalData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: PersonalDetailsStep) => {
      this.personalData = res.personalDetails;
      if (!this.personalData[0]) {
        this.personalData = this.formData.personalDetailsStep.personalDetails;
      }
    });

    //communication method step
    this.communicationData$ = this.supplierService.getCommunticationInfoStep();
    this.communicationData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: CommunicationMethodStep) => {
      this.communicationData = res.communicationMethod;
      if (!this.communicationData[0]) {
        this.communicationData = this.formData.communicationMethodStep.communicationMethod;
      }
    });

    // bank details step
    this.bankDetailStep$ = this.supplierService.getBankInfoStep();
    this.bankDetailStep$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: BankDetailStep) => {
      this.activityInfoData = res.activityInfoTab.activityInfo;
      this.BankDetails = res.bankDetailsTab.BankDetails;
      this.compFinanceInfoData = res.companyInfoTab.compFinanceInfo;
      this.compBranchInfoData = res.companyInfoTab.compBranchInfo;
      this.otherData = res.otherInfoTab.otherDetails;
      if (!this.activityInfoData[0]) {
        this.activityInfoData = this.formData.bankDetailStep.activityInfoTab.activityInfo;
        this.BankDetails = this.formData.bankDetailStep.bankDetailsTab.BankDetails;
        this.compFinanceInfoData = this.formData.bankDetailStep.companyInfoTab.compFinanceInfo;
        this.compBranchInfoData = this.formData.bankDetailStep.companyInfoTab.compBranchInfo;
        this.otherData = this.formData.bankDetailStep.otherInfoTab.otherDetails;
      }
    });

    //employee detail step
    this.employeeData$ = this.supplierService.getEmployeeInfoStep();
    this.employeeData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: EmployeeDetailsStep) => {
      this.employeeData = res.employeDetails;
      if (!this.employeeData[0]) {
        this.employeeData = this.formData.employeeDetailsStep.employeDetails;
      }
      this.getEmployeeCategories();
    });

    //ministries1 data step
    this.ministriesData1$ = this.supplierService.getMinistriesData1Step();
    this.ministriesData1$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: MinistriesData1Step) => {
      this.ministriesData1 = res;
      if (!this.ministriesData1.occiDataTab[0]) {
        this.ministriesData1 = this.formData.ministriesData1Step;
      }
    });

    //ministries2 data step
    this.ministriesData2$ = this.supplierService.getMinistriesData2Step();
    this.ministriesData2$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: MinistriesData2Step) => {
      this.ministriesData2 = res;
      if (!this.ministriesData2.mofDataTab[0]) {
        this.ministriesData2 = this.formData.ministriesData2Step;
      }
    });

    //ministries3 data step
    this.ministriesData3$ = this.supplierService.getMinistriesData3Step();
    this.ministriesData3$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: MinistriesData3Step) => {
      this.ministriesData3 = res;
      if (!this.ministriesData3.authorityOfCivilDefenseData[0]) {
        this.ministriesData3 = this.formData.ministriesData3Step;
      }
    });

    //project detail step
    this.projectData$ = this.supplierService.getProjectInfoStep();
    this.projectData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: ProjectDetailsStep) => {
      this.projectData = res.projectDetails;
      if (!this.projectData[0]) {
        this.projectData = this.formData.projectDetailsStep.projectDetails;
      }
    });

    //subcontrator detail step
    this.subContractorData$ = this.supplierService.getSubContratorInfoStep();
    this.subContractorData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: SubContractorDetailsStep) => {
      this.subContractorData = res.subContractorDetails;
      if (!this.subContractorData[0]) {
        this.subContractorData = this.formData.subContractorDetailsStep.subContractorDetails;
      }
    });

    //equipment detail step
    this.equipmentData$ = this.supplierService.getEquipmentInfoStep();
    this.equipmentData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: EquipmentDetailsStep) => {
      this.equipmentData = res.equipmentDetails;
      if (!this.equipmentData[0]) {
        this.equipmentData = this.formData.equipmentDetailsStep.equipmentDetails;
      }
    });
  }

  get f() {
    return this.form.controls;
  }

  get bf() {
    return this.bankform.controls;
  }

  getEmployeeCategories() {
    this.staffCategory = [];
    this.arrayOfCatagory = [];
    this.employeeData.filter(d => {
      this.arrayOfCatagory.push(d.staffCategory);
    });
    this.arrayOfCatagory = [... new Set(this.arrayOfCatagory)];
    this.staffCategory = [];
    this.arrayOfCatagory.map(a => {
      let index = 0;
      let omaniIndex = 0;
      let nonOmaniIndex = 0;
      this.employeeData.map((d) => {
        if (d.staffCategory == a) {
          index = index + 1;
          if (d.country.toLowerCase() == 'omani') {
            omaniIndex = omaniIndex + 1;
          } else {
            nonOmaniIndex = nonOmaniIndex + 1;
          }
        }
      });
      this.staffCategory.push({ category: a, number: index, omani: omaniIndex, nonOmani: nonOmaniIndex });
    });
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

  preStep(number) {
    this.selected.setValue(number);
  }

  callUploadService(file, data, flag) {
    const formData = new FormData();
    formData.append('file', file.data);
    file.inProgress = true;
    if (this.selectedPage === 'project') {
      this.filesList = [];
      this.projectData.map((d, i) => {
        // if (d.no == data.no) {
        //   if (flag == false) {
        //     d.documents.push(file.data);
        //   }
        //   d.documents.map((d1) => {
        //     this.filesList.push(d1);
        //     file.inProgress = false;
        //   });
        // }
      });
    }
    if (this.selectedPage === 'employee') {
      this.filesList = [];
      this.employeeData.map((d, i) => {
        if (d.name == data.name) {
          // if (flag == false) {
          //   d.documents.push(file.data);
          // }
          // d.documents.map((d1) => {
          //   this.filesList.push(d1);
          //   file.inProgress = false;
          // });
        }
      });
    }
    if (this.selectedPage === 'activityInfo') {
      this.filesList = [];
      this.activityInfoData.map((d, i) => {
        if (d.activityName == data.activityName) {
          // if (flag == false) {
          //   d.documents.push(file.data);
          // }
          // d.documents.map((d1) => {
          //   this.filesList.push(d1);
          //   file.inProgress = false;
          // });
        }
      });
    }
    if (this.selectedPage === 'regCerti') {
      this.filesList = [];
      // if (flag == false) {
      //   this.ministriesData1.tenderBoardDataTab.registrationCertificate.push(file.data);
      // }
      // this.filesList = this.ministriesData1.tenderBoardDataTab.registrationCertificate;
    }
    if (this.selectedPage === 'hplicenses') {
      this.filesList = [];
      // if (flag == false) {
      //   this.ministriesData2.mohDataTab.healthAndPharmacyLicenses.push(file.data);
      // }
      // this.filesList = this.ministriesData2.mohDataTab.healthAndPharmacyLicenses;
    }
    if (this.selectedPage === 'pLOfCC') {
      this.filesList = [];
      // if (flag == false) {
      //   this.ministriesData2.mociDataTab.perAndLiceOfConsCom.push(file.data);
      // }
      // this.filesList = this.ministriesData2.mociDataTab.perAndLiceOfConsCom;
    }
    if (this.selectedPage === 'lOTQI') {
      this.filesList = [];
      // if (flag == false) {
      //   this.ministriesData2.mociDataTab.liceOfTraAndQuaInst.push(file.data);
      // }
      // this.filesList = this.ministriesData2.mociDataTab.liceOfTraAndQuaInst;
    }
    if (this.selectedPage === 'loftc') {
      this.filesList = [];
      // if (flag == false) {
      //   this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies.push(file.data);
      // }
      // this.filesList = this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies;
    }
    if (this.selectedPage === 'bankOther') {
      this.filesList = [];
      this.otherData.map((d, i) => {
        if (d.no == data.no) {
          // if (flag == false) {
          //   d.documents.push(file.data);
          // }
          // d.documents.map((d1) => {
          //   this.filesList.push(d1);
          //   file.inProgress = false;
          // });
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

  openFile(content, page, data, isMoci) {
    this.selectedPage = page;
    this.isDataMoci = isMoci;
    this.uploadData = data;
    if (this.selectedPage === 'project') {
      this.filesList = [];
      // this.projectData.map((d, i) => {
      //   if (d.no == data.no) {
      //     d.documents.map((d1) => {
      //       this.filesList.push(d1);
      //     });
      //   }
      // });
    }
    if (this.selectedPage === 'employee') {
      this.filesList = [];
      this.employeeData.map((d, i) => {
        // if (d.name == data.name) {
        //   d.documents.map((d1) => {
        //     this.filesList.push(d1);
        //   });
        // }
      });
    }
    if (this.selectedPage === 'activityInfo') {
      this.filesList = [];
      this.activityInfoData.map((d, i) => {
        // if (d.activityName == data.activityName) {
        //   d.documents.map((d1) => {
        //     this.filesList.push(d1);
        //   });
        // }
      });
    }
    if (this.selectedPage === 'regCerti') {
      this.filesList = [];
      // this.filesList = this.ministriesData1.tenderBoardDataTab.registrationCertificate;
    }
    if (this.selectedPage === 'hplicenses') {
      this.filesList = [];
      // this.filesList = this.ministriesData2.mohDataTab.healthAndPharmacyLicenses;
    }
    if (this.selectedPage === 'pLOfCC') {
      this.filesList = [];
      // this.filesList = this.ministriesData2.mociDataTab.perAndLiceOfConsCom;
    }
    if (this.selectedPage === 'lOTQI') {
      this.filesList = [];
      // this.filesList = this.ministriesData2.mociDataTab.liceOfTraAndQuaInst;
    }
    if (this.selectedPage === 'loftc') {
      this.filesList = [];
      // this.filesList = this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies;
    }
    if (this.selectedPage === 'bankOther') {
      this.filesList = [];
      this.otherData.map((d, i) => {
        if (d.no == data.no) {
          // d.documents.map((d1) => {
          //   this.filesList.push(d1);
          // });
        }
      });
    }
    this.open(content);
  }

  deleteFile(file) {
    if (confirm('Do you want to delete ' + file.name + '?')) {
      if (this.selectedPage === 'project') {
        this.filesList = [];
        this.projectData.map((d) => {
          if (d.no == this.uploadData.no) {
            // d.documents.filter((f, i) => {
            //   if (f.name == file.name) {
            //     d.documents.splice(i, 1);
            //     this.filesList = d.documents;
            //   }
            // });
          }
        });
      }
      if (this.selectedPage === 'employee') {
        this.filesList = [];
        this.employeeData.map((d, i) => {
          if (d.name == this.uploadData.name) {
            // d.documents.filter((f, i) => {
            //   if (f.name == file.name) {
            //     d.documents.splice(i, 1);
            //     this.filesList = d.documents;
            //   }
            // });
          }
        });
      }
      if (this.selectedPage === 'activityInfo') {
        this.filesList = [];
        this.activityInfoData.map((d, i) => {
          if (d.activityName == this.uploadData.activityName) {
            // d.documents.filter((f, i) => {
            //   if (f.name == file.name) {
            //     d.documents.splice(i, 1);
            //     this.filesList = d.documents;
            //   }
            // });
          }
        });
      }
      if (this.selectedPage === 'regCerti') {
        this.filesList = [];
        // this.ministriesData1.tenderBoardDataTab.registrationCertificate.filter((f, i) => {
        //   if (f.name == file.name) {
        //     this.ministriesData1.tenderBoardDataTab.registrationCertificate.splice(i, 1);
        //     this.filesList = this.ministriesData1.tenderBoardDataTab.registrationCertificate;
        //   }
        // });
      }
      if (this.selectedPage === 'hplicenses') {
        this.filesList = [];
        // this.ministriesData2.mohDataTab.healthAndPharmacyLicenses.filter((f, i) => {
        //   if (f.name == file.name) {
        //     this.ministriesData2.mohDataTab.healthAndPharmacyLicenses.splice(i, 1);
        //     this.filesList = this.ministriesData2.mohDataTab.healthAndPharmacyLicenses;
        //   }
        // });
      }
      if (this.selectedPage === 'pLOfCC') {
        this.filesList = [];
        // this.ministriesData2.mociDataTab.perAndLiceOfConsCom.filter((f, i) => {
        //   if (f.name == file.name) {
        //     this.ministriesData2.mociDataTab.perAndLiceOfConsCom.splice(i, 1);
        //     this.filesList = this.ministriesData2.mociDataTab.perAndLiceOfConsCom;
        //   }
        // });
      }
      if (this.selectedPage === 'lOTQI') {
        this.filesList = [];
        // this.ministriesData2.mociDataTab.liceOfTraAndQuaInst.filter((f, i) => {
        //   if (f.name == file.name) {
        //     this.ministriesData2.mociDataTab.liceOfTraAndQuaInst.splice(i, 1);
        //     this.filesList = this.ministriesData2.mociDataTab.liceOfTraAndQuaInst;
        //   }
        // });
      }
      if (this.selectedPage === 'loftc') {
        this.filesList = [];
        // this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies.filter((f, i) => {
        //   if (f.name == file.name) {
        //     this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies.splice(i, 1);
        //     this.filesList = this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies;
        //   }
        // });
      }
      if (this.selectedPage === 'bankOther') {
        this.filesList = [];
        this.otherData.map((d, i) => {
          if (d.no == this.uploadData.no) {
            // d.documents.filter((f, i) => {
            // if (f.name == file.name) {
            //   d.documents.splice(i, 1);
            //   this.filesList = d.documents;
            // }
            // });
          }
        });
      }
    }
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
      this.form.patchValue({ addressID: uuid(), country: 'Oman' });
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

  alertNoAdd() {
    this.alertService.pushError('Not Allowed to add details for Local entities');
  }

  submitRegistration() {
    this.completed = true;
    localStorage.setItem('1completeToken', 'true');
    localStorage.setItem('LocalRegComplete', 'true');
    localStorage.setItem('RegStatus', 'finish');
    this.spinner.openSpinner();
    const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    this.userService.supplierRegistration(body);
    // this.alertService.pushSuccess('Your data is submitted.');
    // this.router.navigateByUrl('/landing/supplier-registration/transaction');
  }

  saveDraft() {
    localStorage.setItem('RegStatus', 'draft');
    this.spinner.openSpinner();
    const body = { civil_number: localStorage.getItem('civilReg'), cr_number: localStorage.getItem('commercialReg'), register_status: localStorage.getItem('RegStatus'), register_type: localStorage.getItem('regType') };
    this.userService.supplierRegistration(body);
    this.alertService.pushWarning('Your data will be saved for 72 hours.');
    this.router.navigate(['/landing/supplier-registration/dashboard']);
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
        this.allAddresses.push(this.form.value);
      }
      this.form.reset();
    }
  }

  submitbank() {
    if (this.bankform.status === 'VALID') {
      if (this.editBank == true) {
        this.BankDetails.filter((d, i) => {
          if (d.bankAcc == this.editbankData.bankAcc) {
            this.BankDetails.splice(i, 1, this.bankform.value);
          }
        });
        this.editBank = false;
      } else {
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
    });
  }

  registrationComplete() {
    this.completed = true;
  }

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
    if (datatype === 'employee') {
      this.employeeData.map((data, i) => {
        if (data.name == '') {
          this.employeeData.splice(i, 1);
        }
      });
      this.newData = {
        no: uuid(),
        name: '',
        qualification: '',
        specialization: '',
        jobTitle: '',
        designation: '',
        designationDate: '',
        expDate: '',
        experience: '',
        appointmentDate: '',
        country: '',
        status: '',
        statusDate: '',
        staffCategory: '',
        passportNum: '',
        recidentCard: '',
        civilNo: '',
        crNo: '',
        documents: [],
        omaniratio: '',
        isEdit: true,
        isMoci: false
      };
      this.employeeData.push(this.newData);
    }
    if (datatype === 'project') {
      this.projectData.map((data, i) => {
        if (data.name == '') {
          this.projectData.splice(i, 1);
        }
      });
      this.newData = {
        no: uuid(),
        name: '',
        client: '',
        consultent: '',
        costConsultent: '',
        value: '',
        period: '',
        completion: '',
        documents: [],
        isEdit: true,
        isMoci: false
      };
      this.projectData.push(this.newData);
    }
    if (datatype === 'subContractor') {
      this.subContractorData.map((data, i) => {
        if (data.nameOfWork == '') {
          this.subContractorData.splice(i, 1);
        }
      });
      this.newData = {
        no: uuid(),
        nameOfWork: '',
        subContractor: '',
        crNo: '',
        telephone: '',
        fax: '',
        email: '',
        regWithRca: '',
        isEdit: true,
        isMoci: false
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
        no: uuid(),
        type: '',
        quantity: '',
        capacity: '',
        year: '',
        regNo: '',
        approxValue: '',
        isEdit: true,
        isMoci: false
      };
      this.equipmentData.push(this.newData);
    }
    if (datatype === 'other') {
      this.otherData.map((data, i) => {
        // if (data.nameOfWork == '') {
        //   this.otherData.splice(i, 1);
        // }
      });
      this.newData = {
        no: this.otherData.length + 1,
        nameOfWork: '',
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
        activityID: uuid(),
        activityName: '',
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
    // if (datatype === 'personal') {
    //   this.personalData.map((data, i) => {
    //     if (data.personName == '') {
    //       this.personalData.splice(i, 1);
    //     }
    //   });
    //   this.newData = {
    //     personName: '',
    //     nationality: '',
    //     idType: '',
    //     idNo: '',
    //     designation: '',
    //     noOfShares: '',
    //     perShares: '',
    //     authorizationType: '',
    //     authorizationLimit: '',
    //     note: '',
    //     regDate: '',
    //     isEdit: true,
    //     isMoci: false
    //   };
    //   this.personalData.push(this.newData);
    // }
    if (datatype === 'activityInfo') {
      this.activityInfoData.map((data, i) => {
        if (data.activityName == '') {
          this.activityInfoData.splice(i, 1);
        }
      });
      this.newData = {
        activityID: uuid(),
        activityName: '',
        subActivity: '',
        establishmentDate: '',
        regDate: '',
        expDate: '',
        duration: '',
        companyGrade: '',
        location: '',
        documents: [],
        isEdit: true,
        isMoci: false
      };
      this.activityInfoData.push(this.newData);
    }
    if (datatype === 'communication') {
      this.communicationData.map((data, i) => {
        if (data.value == '') {
          this.communicationData.splice(i, 1);
        }
      });
      this.newData = {
        no: uuid(),
        method: '',
        value: '',
        isEdit: true,
        isMoci: false
      };
      this.communicationData.push(this.newData);
    }
    if (datatype === 'siteVisit') {
      this.siteVisitData.map((data, i) => {
        if (data.label == '') {
          this.siteVisitData.splice(i, 1);
        }
      });
      this.newData = {
        no: this.siteVisitData.length + 1,
        label: '',
        value: ' ',
        isEdit: true,
        isMoci: false
      };
      this.siteVisitData.push(this.newData);
    }
  }

  enteredDetails(datatype, data) {
    if (data.isEdit === true) {
      data.isEdit = false;
      if (datatype === 'employee') {

        if (data.name !== '') {
          if (data.staffCategory !== '') {
            if (data.country !== '') {
              this.employeeData.map((d, i) => {
                if (d.no == data.no) {
                  // if (data.staffCategory == '') {
                  //   data.staffCategory = '-';
                  // }
                  d = data;
                }
              });
              if (data.name === ' * ') {
                data.name = '',
                  data.isEdit = true;
              }
              this.showBtn = true;
            } else {
              data.isEdit = true;
              this.alertService.pushError('Country Name can not be empty.');
            }
          } else {
            data.isEdit = true;
            this.alertService.pushError('Employee Category can not be empty.');
          }
        } else {
          // this.showBtn = true;
          // this.employeeData.map((data, i) => {
          //   if (data.name == '') {
          //     this.employeeData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Name can not be empty.');
          //   this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.employeeData.map((data, i) => {
          //     if (data.name == '') {
          //       this.employeeData.splice(i, 1);
          //     }
          //   });
          // }
          // else {
          // data.isEdit = true;
          // }
        }
        this.getEmployeeCategories();
      }
      if (datatype === 'project') {

        if (data.name !== '') {
          this.projectData.map((d, i) => {
            if (d.no == data.no) {
              d = data;
            }
          });
          if (data.name === ' * ') {
            data.name = '',
              data.isEdit = true;
          }
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.projectData.map((data, i) => {
          //   if (data.name == '') {
          //     this.projectData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Name can not be empty.');
          // this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.projectData.map((data, i) => {
          //     if (data.name == '') {
          //       this.projectData.splice(i, 1);
          //     }
          //   });
          // }
          // else {
          //   data.isEdit = true;
          // }
        }
      }
      if (datatype === 'subContractor') {
        if (data.nameOfWork !== '') {
          this.subContractorData.map((d, i) => {
            if (d.no == data.no) {
              d = data;
            }
          });
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.subContractorData.map((data, i) => {
          //   if (data.nameOfWork == '') {
          //     this.subContractorData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Name Of Work can not be empty.');
          // this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.subContractorData.map((data, i) => {
          //     if (data.nameOfWork == '') {
          //       this.subContractorData.splice(i, 1);
          //     }
          //   });
          // }
          // else {
          //   data.isEdit = true;
          // }
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
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.equipmentData.map((data, i) => {
          //   if (data.type == '') {
          //     this.equipmentData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Type of Equipment can not be empty.');
          // this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.equipmentData.map((data, i) => {
          //     if (data.type == '') {
          //       this.equipmentData.splice(i, 1);
          //     }
          //   });
          // }
          // else {
          //   data.isEdit = true;
          // }
        }
      }
      if (datatype === 'other') {
        if (data.name !== '') {
          this.otherData.map((d, i) => {
            if (d.no == data.no) {
              d = data;
            }
          });
          data.isEdit = false;
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.otherData.map((data, i) => {
          //   if (data.name == '') {
          //     // this.otherData.splice(i, 1);
          //     data.name = 'test ' + (i + 1) + '';
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Name can not be empty.');
          // this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.otherData.map((data, i) => {
          //     if (data.name == '') {
          //       this.otherData.splice(i, 1);
          //       data.name = 'test ' + (i + 1) + '';
          //     }
          //   });
          // }
          // else {
          //   data.isEdit = true;
          // }
        }
      }
      if (datatype === 'activity') {
        if (data.activityName !== '') {
          this.activityData.map((d, i) => {
            if (d.activityID == data.activityID) {
              d = data;
            }
          });
          if (data.activityName === ' * ') {
            data.activityName = '',
              data.isEdit = true;
          }
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.activityData.map((data, i) => {
          //   if (data.activityName == '') {
          //     this.activityData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Activity Name can not be empty.');
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.activityData.map((data, i) => {
          //   if (data.activityName == '') {
          //     this.activityData.splice(i, 1);
          //   }
          // });
          // }
          // else {
          //   data.isEdit = true;
          // }
        }
      }
      // if (datatype === 'personal') {
      //   if (data.personName !== '') {
      //     this.personalData.map((d, i) => {
      //       if (d.no == data.no) {
      //         d = data;
      //       }
      //     });
      //     if (data.personName === ' * ') {
      //       data.personName = '',
      //         data.isEdit = true;
      //     }
      //     this.showBtn = true;
      //   } else {
      //     // this.showBtn = true;
      //     // this.personalData.map((data, i) => {
      //     //   if (data.personName == '') {
      //     //     this.personalData.splice(i, 1);
      //     //   }
      //     // });
      //     data.isEdit = true;
      //     this.alertService.pushError('Person Name can not be empty.');
      //     // this.showBtn = false;
      //     // if (confirm('Do you want to remove new entered data ?')) {
      //     //   this.showBtn = true;
      //     //   this.personalData.map((data, i) => {
      //     //     if (data.personName == '') {
      //     //       this.personalData.splice(i, 1);
      //     //     }
      //     //   });
      //     // }
      //     // else {
      //     //   data.isEdit = true;
      //     // }
      //   }
      // }
      if (datatype === 'activityInfo') {
        if (data.activityName !== '') {
          this.activityInfoData.map((d, i) => {
            if (d.activityID == data.activityID) {
              d = data;
            }
          });
          if (data.activityName === ' * ') {
            data.activityName = '',
              data.isEdit = true;
          }
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.activityInfoData.map((data, i) => {
          //   if (data.activityName == '') {
          //     this.activityInfoData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Activity Name can not be empty.');
          // this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.activityInfoData.map((data, i) => {
          //     if (data.activityName == '') {
          //       this.activityInfoData.splice(i, 1);
          //     }
          //   });
          //   // this.alertService.pushError('Activity Name can not be empty.');
          // }
          // else {
          //   data.isEdit = true;
          // }
        }
      }
      if (datatype === 'communication') {
        if (data.value !== '') {
          this.communicationData.map((d, i) => {
            if (d.no == data.no) {
              d = data;
            }
          });
          if (data.value === ' * ') {
            data.value = '',
              data.isEdit = true;
          }
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.communicationData.map((data, i) => {
          //   if (data.value == '') {
          //     this.communicationData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Value can not be empty.');

          // this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.communicationData.map((data, i) => {
          //     if (data.value == '') {
          //       this.communicationData.splice(i, 1);
          //     }
          //   });
          //   // this.alertService.pushError('Value can not be empty.');
          // }
          // else {
          //   data.isEdit = true;
          // }
        }
      }
      if (datatype === 'siteVisit') {

        if (data.label !== '') {
          this.siteVisitData.map((d, i) => {
            if (d.no == data.no) {
              d = data;
            }
          });
          if (data.label === ' * ') {
            data.label = '',
              data.isEdit = true;
          }
          this.showBtn = true;
        } else {
          // this.showBtn = true;
          // this.siteVisitData.map((data, i) => {
          //   if (data.label == '') {
          //     this.siteVisitData.splice(i, 1);
          //   }
          // });
          data.isEdit = true;
          this.alertService.pushError('Label can not be empty.');
          // this.showBtn = false;
          // if (confirm('Do you want to remove new entered data ?')) {
          //   this.showBtn = true;
          //   this.siteVisitData.map((data, i) => {
          //     if (data.label == '') {
          //       this.siteVisitData.splice(i, 1);
          //     }
          //   });
          //   // this.alertService.pushError('Label can not be empty.');
          // }
          // else {
          //   data.isEdit = true;
          // }
        }
      }
    }
  }

  deleteRow(datatype, data) {
    this.showBtn = true;
    if (datatype === 'employee') {
      this.employeeData.map((d, i) => {
        if (d.no == data.no) {
          this.employeeData.splice(i, 1);
        }
      });
      this.getEmployeeCategories();
    }
    if (datatype === 'project') {
      this.projectData.map((d, i) => {
        if (d.no == data.no) {
          this.projectData.splice(i, 1);
        }
      });
    }
    if (datatype === 'subContractor') {
      this.subContractorData.map((d, i) => {
        if (d.no == data.no) {
          this.subContractorData.splice(i, 1);
        }
      });
    }
    if (datatype === 'equipment') {
      this.equipmentData.map((d, i) => {
        if (d.no == data.no) {
          this.equipmentData.splice(i, 1);
        }
      });
    }
    if (datatype === 'other') {
      this.otherData.map((d, i) => {
        if (d.no == data.no) {
          this.otherData.splice(i, 1);
        }
      });
    }
    if (datatype === 'activity') {
      this.activityData.map((d, i) => {
        if (d.activityID == data.activityID) {
          this.activityData.splice(i, 1);
        }
      });
    }
    // if (datatype === 'personal') {
    //   this.personalData.map((d, i) => {
    //     if (d.no == data.no) {
    //       this.personalData.splice(i, 1);
    //     }
    //   });
    // }
    if (datatype === 'activityInfo') {
      this.activityInfoData.map((d, i) => {
        if (d.activityID == data.activityID) {
          this.activityInfoData.splice(i, 1);
        }
      });
    }
    if (datatype === 'communication') {
      this.communicationData.map((d, i) => {
        if (d.no == data.no) {
          this.communicationData.splice(i, 1);
        }
      });
    }
    if (datatype === 'siteVisit') {
      this.siteVisitData.map((d, i) => {
        if (d.no == data.no) {
          this.siteVisitData.splice(i, 1);
        }
      });
    }
  }

  sorting(property, str) {
    this.order = !this.order;
    if (this.order === true) {
      if (property === 'employee') {
        this.employeeData = this.sortByPipe.transform(this.employeeData, 'asc', str);
      }
      if (property === 'project') {
        this.projectData = this.sortByPipe.transform(this.projectData, 'asc', str);
      }
      if (property === 'subcontractor') {
        this.subContractorData = this.sortByPipe.transform(this.subContractorData, 'asc', str);
      }
      if (property === 'equipment') {
        this.equipmentData = this.sortByPipe.transform(this.equipmentData, 'asc', str);
      }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.otherData, 'asc', str);
      }
      if (property === 'activity') {
        // this.activityData = this.sortByPipe.transform(this.formData.generalInfoStep.generalInfoTab.activities, 'asc', str);
        this.activityData = this.sortByPipe.transform(this.activityData, 'asc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.personalData, 'asc', str);
      }
      if (property === 'activityInfo') {
        this.activityInfoData = this.sortByPipe.transform(this.activityInfoData, 'asc', str);
      }
      if (property === 'branchInfo') {
        this.compBranchInfoData = this.sortByPipe.transform(this.compBranchInfoData, 'asc', str);
      }
      if (property === 'communication') {
        this.communicationData = this.sortByPipe.transform(this.communicationData, 'asc', str);
      }
      // if (property === 'sitevisit') {
      //   this.siteVisitData = this.sortByPipe.transform(this.formData.siteVisit, 'asc', str);
      // }
    } else {
      if (property === 'employee') {
        this.employeeData = this.sortByPipe.transform(this.employeeData, 'desc', str);
      }
      if (property === 'project') {
        this.projectData = this.sortByPipe.transform(this.projectData, 'desc', str);
      }
      if (property === 'subcontractor') {
        this.subContractorData = this.sortByPipe.transform(this.subContractorData, 'desc', str);
      }
      if (property === 'equipment') {
        this.equipmentData = this.sortByPipe.transform(this.equipmentData, 'desc', str);
      }
      if (property === 'other') {
        this.otherData = this.sortByPipe.transform(this.otherData, 'desc', str);
      }
      if (property === 'activity') {
        this.activityData = this.sortByPipe.transform(this.activityData, 'desc', str);
      }
      if (property === 'personal') {
        this.personalData = this.sortByPipe.transform(this.personalData, 'desc', str);
      }
      if (property === 'activityInfo') {
        this.activityInfoData = this.sortByPipe.transform(this.activityInfoData, 'desc', str);
      }
      if (property === 'branchInfo') {
        this.compBranchInfoData = this.sortByPipe.transform(this.compBranchInfoData, 'desc', str);
      }
      if (property === 'communication') {
        this.communicationData = this.sortByPipe.transform(this.communicationData, 'desc', str);
      }
      // if (property === 'sitevisit') {
      //   this.siteVisitData = this.sortByPipe.transform(this.formData.siteVisit, 'desc', str);
      // }
    }
  }

  public openMenu() {
    this.activityMenu = !this.activityMenu;
  }

  changeSite() {
    console.log(this.isSiteVisit);
  }
}
