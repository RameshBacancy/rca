import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  GeneralInfoStep,
  GeneralInfoTab,
  Address, Activities,
  PersonalDetailsStep,
  PersonalDetails,
  CommunicationMethodStep,
  CommunicationMethod,
  ActivityInfo,
  BankDetails,
  CompFinanceInfo,
  CompBranchInfo,
  OtherDetails,
  BankDetailStep,
  EmployeeDetailsStep,
  EmployeDetails,
  MinistriesData1Step,
  ProjectDetailsStep,
  ProjectDetails,
  MinistriesData2Step,
  MinistriesData3Step,
  SubContractorDetailsStep,
  SubContractorDetails,
  EquipmentDetailsStep, EquipmentDetails
} from 'src/app/models/supplier.modal';
import { SortByPipe } from '../../../../shared/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/shared/pipe/searchEmployee.pipe';;
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-local-view',
  templateUrl: './local-view.component.html',
  styleUrls: ['./local-view.component.scss']
})
export class LocalViewComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;

  @Input('searchText') searchText: any;

  selected = new FormControl(0);
  formData: any;
  order: boolean;
  selectedPage: any;
  uploadData: any;
  filesList: any[];
  closeResult: string;

  // general info step
  activityData: Activities[];
  allAddresses: Address[];
  generalInfo$: Observable<any>;
  selectedAddress: Address;
  editAddress = false;

  // personal step data
  personalData$: Observable<PersonalDetailsStep>;
  personalData: PersonalDetails[];

  //communication method step
  communicationData$: Observable<CommunicationMethodStep>;
  communicationData: CommunicationMethod[]

  // bank detail step
  bankDetailStep$: Observable<BankDetailStep>;
  activityInfoData: ActivityInfo[];
  BankDetails: BankDetails[];
  compFinanceInfoData: CompFinanceInfo;
  compBranchInfoData: CompBranchInfo[];
  otherData: OtherDetails[];
  editBank = false;
  editbankData: any;

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

  destroy$: Subject<boolean> = new Subject();

  constructor(
    private supplierService: SupplierRegistrationService,
    private modalService: NgbModal,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
  }


  loadData() {
    this.supplierService.getdata('local').subscribe(data => {
      this.formData = data;
    });


    // general info step
    this.generalInfo$ = this.supplierService.getGeneralInfoStep();
    this.generalInfo$.
      pipe(
        takeUntil(this.destroy$)
      ).subscribe((res: GeneralInfoStep) => {

        // for dummy
        this.activityData = [...this.formData.generalInfoStep.generalInfoTab.activities, ...res.generalInfoTab.generalInfoDetails];
        this.allAddresses = [...this.formData.generalInfoStep.addressInfoTab.address, ...res.addressInfoTab.address];
        this.selectedAddress = this.allAddresses[0];

        // for database
        // this.activityData.push(...res.generalInfoTab.generalInfoDetails);
        // this.allAddresses.push(...res.addressInfoTab.address);
        // this.selectedAddress = res.addressInfoTab.address[0];


        // if (!this.activityData[0]) {
        //   this.activityData = this.formData.generalInfoStep.generalInfoTab.activities;
        // }
        // if (!this.allAddresses[0]) {
        //   this.allAddresses = this.formData.generalInfoStep.addressInfoTab.address;
        //   this.selectedAddress = this.formData.generalInfoStep.addressInfoTab.address[0];
        // }
      });

    // personal detail step
    this.personalData$ = this.supplierService.getPersonalInfoStep();
    this.personalData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: PersonalDetailsStep) => {
      this.personalData = [...this.formData.personalDetailsStep.personalDetails];
      // if (!this.personalData[0]) {
      //   this.personalData = this.formData.personalDetailsStep.personalDetails;
      // }
    });

    // communication method step
    this.communicationData$ = this.supplierService.getCommunticationInfoStep();
    this.communicationData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: CommunicationMethodStep) => {
      this.communicationData = [...this.formData.communicationMethodStep.communicationMethod, ...res.communicationMethod];
      // this.communicationData = ;
      // if (!this.communicationData[0]) {
      // }
    });

    // bank details step
    this.bankDetailStep$ = this.supplierService.getBankInfoStep();
    this.bankDetailStep$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: BankDetailStep) => {
      this.activityInfoData = [...this.formData.bankDetailStep.activityInfoTab.activityInfo, ...res.activityInfoTab.activityInfo];
      this.BankDetails = [...this.formData.bankDetailStep.bankDetailsTab.BankDetails, ...res.bankDetailsTab.BankDetails];
      this.compFinanceInfoData = res.companyInfoTab.compFinanceInfo;
      this.compBranchInfoData = [...this.formData.bankDetailStep.companyInfoTab.compBranchInfo, ...res.companyInfoTab.compBranchInfo];
      this.otherData = [...this.formData.bankDetailStep.otherInfoTab.otherDetails, ...res.otherInfoTab.otherDetails];
      // if (!this.activityInfoData[0]) {
      //   this.activityInfoData = this.formData.bankDetailStep.activityInfoTab.activityInfo;
      //   // this.compFinanceInfoData = this.formData.bankDetailStep.companyInfoTab.compFinanceInfo;
      // }
      // if (!this.compBranchInfoData[0]) {
      //   this.compBranchInfoData = this.formData.bankDetailStep.companyInfoTab.compBranchInfo;
      // }
      // if (!this.BankDetails[0]) {
      //   this.BankDetails = this.formData.bankDetailStep.bankDetailsTab.BankDetails;
      // }
      // if (!this.otherData[0]) {
      //   this.otherData = this.formData.bankDetailStep.otherInfoTab.otherDetails;
      // }
    });

    // employee detail step
    this.employeeData$ = this.supplierService.getEmployeeInfoStep();
    this.employeeData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: EmployeeDetailsStep) => {
      this.employeeData = [...this.formData.employeeDetailsStep.employeDetails, ...res.employeDetails];
      // if (!this.employeeData[0]) {
      //   this.employeeData = this.formData.employeeDetailsStep.employeDetails;
      // }
      this.getEmployeeCategories();
    });

    // ministries1 data step
    this.ministriesData1$ = this.supplierService.getMinistriesData1Step();
    this.ministriesData1$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: MinistriesData1Step) => {
      this.ministriesData1 = res;
      if (!this.ministriesData1.occiDataTab[0]) {
        this.ministriesData1 = this.formData.ministriesData1Step;
      }
    });

    // ministries2 data step
    this.ministriesData2$ = this.supplierService.getMinistriesData2Step();
    this.ministriesData2$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: MinistriesData2Step) => {
      this.ministriesData2 = res;
      if (!this.ministriesData2.mofDataTab[0]) {
        this.ministriesData2 = this.formData.ministriesData2Step;
      }
    });

    // ministries3 data step
    this.ministriesData3$ = this.supplierService.getMinistriesData3Step();
    this.ministriesData3$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: MinistriesData3Step) => {
      this.ministriesData3 = res;
      if (!this.ministriesData3.authorityOfCivilDefenseData[0]) {
        this.ministriesData3 = this.formData.ministriesData3Step;
      }
    });

    // project detail step
    this.projectData$ = this.supplierService.getProjectInfoStep();
    this.projectData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: ProjectDetailsStep) => {
      this.projectData = [...this.formData.projectDetailsStep.projectDetails, ...res.projectDetails];
      // if (!this.projectData[0]) {
      //   this.projectData = this.formData.projectDetailsStep.projectDetails;
      // }
    });

    // subcontrator detail step
    this.subContractorData$ = this.supplierService.getSubContratorInfoStep();
    this.subContractorData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: SubContractorDetailsStep) => {
      this.subContractorData = [...this.formData.subContractorDetailsStep.subContractorDetails, ...res.subContractorDetails];
      this.cdr.detectChanges();
      // if (!this.subContractorData[0]) {
      //   this.subContractorData = this.formData.subContractorDetailsStep.subContractorDetails;
      // }
    });

    // equipment detail step
    this.equipmentData$ = this.supplierService.getEquipmentInfoStep();
    this.equipmentData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((res: EquipmentDetailsStep) => {
      this.equipmentData = [...this.formData.equipmentDetailsStep.equipmentDetails, ...res.equipmentDetails];
      this.cdr.detectChanges();
      // if (!this.equipmentData[0]) {
      //   this.equipmentData = this.formData.equipmentDetailsStep.equipmentDetails;
      // }
    });
  }


  //functions to change tabs internally
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
  // get employee categories
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

  // sorting for table
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
    }
  }

  openFile(content, page, data, isMoci) {
    this.selectedPage = page;
    this.uploadData = data;
    if (this.selectedPage === 'project') {
      this.filesList = [];
      this.projectData.map((d, i) => {
        if (d.projectID == data.projectID) {
          if (d.documents['name']) {
            this.filesList.push(d.documents);
          }
        }
      });
    }
    if (this.selectedPage === 'employee') {
      this.filesList = [];
      this.employeeData.map((d, i) => {
        if (d.employeeID == data.employeeID) {
          if (d.documents['name']) {
            this.filesList.push(d.documents);
          }
        }
      });
    }
    if (this.selectedPage === 'activityInfo') {
      this.filesList = [];
      this.activityInfoData.map((d, i) => {
        if (d.activityID == data.activityID) {
          if (d.documents['name']) {
            this.filesList.push(d.documents);
          }
        }
      });
    }
    if (this.selectedPage === 'regCerti') {
      this.filesList = [];
      if (this.ministriesData1.tenderBoardDataTab.registrationCertificate.name) {
        this.filesList.push(this.ministriesData1.tenderBoardDataTab.registrationCertificate);
      }
    }
    if (this.selectedPage === 'hplicenses') {
      this.filesList = [];
      if (this.ministriesData2.mohDataTab.healthAndPharmacyLicenses.name) {
        this.filesList.push(this.ministriesData2.mohDataTab.healthAndPharmacyLicenses);
      }
    }
    if (this.selectedPage === 'pLOfCC') {
      this.filesList = [];
      if (this.ministriesData2.mociDataTab.perAndLiceOfConsCom.name) {
        this.filesList.push(this.ministriesData2.mociDataTab.perAndLiceOfConsCom);
      }
    }
    if (this.selectedPage === 'lOTQI') {
      this.filesList = [];
      if (this.ministriesData2.mociDataTab.liceOfTraAndQuaInst.name) {
        this.filesList.push(this.ministriesData2.mociDataTab.liceOfTraAndQuaInst);
      }
    }
    if (this.selectedPage === 'loftc') {
      this.filesList = [];
      if (this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies.name) {
        this.filesList.push(this.ministriesData3.creditBureauData.listOfFinanciallyTroubledCompanies);
      }
    }
    if (this.selectedPage === 'bankOther') {
      this.filesList = [];
      this.otherData.map((d, i) => {
        if (d.otherID == data.otherID) {
          if (d.documents['name']) {
            this.filesList.push(d.documents);
          }
        }
      });
    }
    this.open(content);
  }

  //open address model
  open(content, address?) {

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
}
