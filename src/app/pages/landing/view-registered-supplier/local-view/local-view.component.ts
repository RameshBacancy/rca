import { ChangeDetectorRef, Component, Input, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, Subscription } from 'rxjs';
import {
  GeneralInfoStep,
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
} from 'src/app/models/supplier.model';
import { SortByPipe } from '../../../../shared/pipe/sortBy.pipe';
import { FilterPipe } from 'src/app/shared/pipe/searchEmployee.pipe';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration.service';

@Component({
  selector: 'app-local-view',
  templateUrl: './local-view.component.html',
  styleUrls: ['./local-view.component.scss']
})
export class LocalViewComponent implements OnInit, OnDestroy {

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
  selectedAddress: Address;
  editAddress = false;

  // personal step data
  personalData: PersonalDetails[];

  // communication method step
  communicationData: CommunicationMethod[]

  // bank detail step
  activityInfoData: ActivityInfo[];
  BankDetails: BankDetails[];
  compFinanceInfoData: CompFinanceInfo;
  compBranchInfoData: CompBranchInfo[];
  otherData: OtherDetails[];
  editBank = false;
  editbankData: any;

  // employee detail step
  employeeData: EmployeDetails[];
  arrayOfCatagory = [];
  staffCategory: any[];
  showTable: boolean;

  // ministries1 data step
  ministriesData1: MinistriesData1Step;

  // ministries2 data step
  ministriesData2: MinistriesData2Step;

  // ministries3 data step
  ministriesData3: MinistriesData3Step;

  // project detial step
  projectData: ProjectDetails[];

  // subContrator info step
  subContractorData: SubContractorDetails[];

  // equipment info stop
  equipmentData: EquipmentDetails[];

  generalInfo: any;
  employee: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private supplierService: SupplierRegistrationService,
    private modalService: NgbModal,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.subscriptions.push(
      this.supplierService.getdata('local').subscribe(data => {
        this.formData = data;
      }),
      this.supplierService.getGeneralInfoStep().subscribe((res: GeneralInfoStep) => {
        // for dummy
        this.activityData = [...this.formData.generalInfoStep.generalInfoTab.activities, ...res.generalInfoTab.generalInfoDetails];
        this.allAddresses = [...this.formData.generalInfoStep.addressInfoTab.address, ...res.addressInfoTab.address];
        this.selectedAddress = this.allAddresses[0];
        this.generalInfo = res.generalInfoTab;
      }),
      // personal detail step
      this.supplierService.getPersonalInfoStep().subscribe((res: PersonalDetailsStep) => {
        this.personalData = [...this.formData.personalDetailsStep.personalDetails];
      }),
      // communication method step
      this.supplierService.getCommunticationInfoStep().subscribe((res: CommunicationMethodStep) => {
        this.communicationData = [...this.formData.communicationMethodStep.communicationMethod, ...res.communicationMethod];
      }),
      // bank details step
      this.supplierService.getBankInfoStep().subscribe((res: BankDetailStep) => {
        this.activityInfoData = [...this.formData.bankDetailStep.activityInfoTab.activityInfo, ...res.activityInfoTab.activityInfo];
        this.BankDetails = [...this.formData.bankDetailStep.bankDetailsTab.BankDetails, ...res.bankDetailsTab.BankDetails];
        this.compFinanceInfoData = res.companyInfoTab.compFinanceInfo;
        this.compBranchInfoData = [...this.formData.bankDetailStep.companyInfoTab.compBranchInfo, ...res.companyInfoTab.compBranchInfo];
        this.otherData = [...this.formData.bankDetailStep.otherInfoTab.otherDetails, ...res.otherInfoTab.otherDetails];
      }),
      // employee detail step
      this.supplierService.getEmployeeInfoStep().subscribe((res: EmployeeDetailsStep) => {
        this.employeeData = [...this.formData.employeeDetailsStep.employeDetails, ...res.employeDetails];
        this.employee = res;
        this.getEmployeeCategories();
      }),
      // ministries1 data step
      this.supplierService.getMinistriesData1Step().subscribe((res: MinistriesData1Step) => {
        this.ministriesData1 = res;
        if (!this.ministriesData1.occiDataTab[0]) {
          this.ministriesData1 = this.formData.ministriesData1Step;
        }
      }),

      // ministries2 data step
      this.supplierService.getMinistriesData2Step().subscribe((res: MinistriesData2Step) => {
        this.ministriesData2 = res;
        if (!this.ministriesData2.mofDataTab[0]) {
          this.ministriesData2 = this.formData.ministriesData2Step;
        }
      }),

      // ministries3 data step
      this.supplierService.getMinistriesData3Step().subscribe((res: MinistriesData3Step) => {
        this.ministriesData3 = res;
        if (!this.ministriesData3.authorityOfCivilDefenseData[0]) {
          this.ministriesData3 = this.formData.ministriesData3Step;
        }
      }),
      // project detail step
      this.supplierService.getProjectInfoStep().subscribe((res: ProjectDetailsStep) => {
        this.projectData = [...this.formData.projectDetailsStep.projectDetails, ...res.projectDetails];
      }),
      // subcontrator detail step
      this.supplierService.getSubContratorInfoStep().subscribe((res: SubContractorDetailsStep) => {
        this.subContractorData = [...this.formData.subContractorDetailsStep.subContractorDetails, ...res.subContractorDetails];
        this.cdr.detectChanges();
      }),
      // equipment detail step
      this.supplierService.getEquipmentInfoStep().subscribe((res: EquipmentDetailsStep) => {
        this.equipmentData = [...this.formData.equipmentDetailsStep.equipmentDetails, ...res.equipmentDetails];
        this.cdr.detectChanges();
      })
    );
  }


  // functions to change tabs internally
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
          if (d.country.toLowerCase() === 'omani') {
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

  // open address model
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

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}
