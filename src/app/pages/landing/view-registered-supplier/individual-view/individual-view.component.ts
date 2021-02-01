import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { GeneralInfoStepInd, PersonalDetailsInd, CommunicationDetailsStep } from './../../../../models/supplier.model';
import { Observable, Subject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { SupplierIndividualRegisterService } from './../../../../services/supplier-individual-register.service';
import { SortByPipe } from '../../../../shared/pipe/sortBy.pipe';
import { SupplierRegistrationService } from './../../../../services/supplier-registration.service';
import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, ElementRef, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-individual-view',
  templateUrl: './individual-view.component.html',
  styleUrls: ['./individual-view.component.scss']
})
export class IndividualViewComponent implements OnInit, OnDestroy {
  isDataMoci: any;
  allAddresses: any;
  editBank: boolean;
  editbankData: any;
  showBtn: boolean;

  @ViewChild('stepper') private stepper: MatStepper;
  formData: any;
  closeResult: string;
  order = false;
  completed = false;
  searchText: any;

  editCompanyDetails = false;
  editDirectorDetails = false;
  editGeneralManagerDetails = false;

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

  generalInfo: any;
  private subscriptions: Subscription[] = [];


  @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  files = [];
  filesList = [];
  uploadData: any;
  selectedPage: any;

  setDraftTime: any;

  constructor(
    private supplierService: SupplierRegistrationService,
    private sortByPipe: SortByPipe,
    private individualService: SupplierIndividualRegisterService,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal
  ) { }



  ngOnInit(): void {
    this.loadFormData();
    this.showBtn = true;
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

    this.subscriptions.push(
      this.supplierService.getdata('individual').subscribe(data => {
        this.formData = data;
      }),
      this.individualService.getGeneralInfoStep().
        subscribe(res => {
          this.allAddresses = [...this.formData.generalInfoStep.generalInfo.address, ...res.generalInfo.address];
          this.selectedAddress = this.allAddresses[0];
          this.generalInfo = res.generalInfo;
          this.cdr.detectChanges();
          // if (!this.allAddresses[0]) {
          //   this.selectedAddress = this.formData.generalInfoStep.generalInfo.address[0];
          //   this.allAddresses = this.formData.generalInfoStep.generalInfo.address;
          // }
        }),
      this.individualService.getPersonalInfoStep().
        subscribe(res => {
          this.personalData = [...this.formData.personalDetailsStep.personalDetails, ...res.personalDetails];

          // if (!this.personalData[0]) {
          //   this.personalData = this.formData.personalDetailsStep.personalDetails;
          // }
          this.cdr.detectChanges();
        }),

      this.individualService.getCommunicationInfoStep().
        subscribe(res => {
          this.communicationData = res;

          if (!this.communicationData[0]) {
            this.communicationData = this.formData.communicationDetailsStep;
          }
          this.cdr.detectChanges();
        }),

      this.individualService.getCommercialInfoStep().
        subscribe(res => {
          this.BankDetails = [...this.formData.commercialInfoStep.bankInfoTab.bankDetails, ...res.bankInfoTab.bankDetails];
          this.otherData = [...this.formData.commercialInfoStep.otherInfoTab.otherInfo, ...res.otherInfoTab.otherInfo];
          this.activityData = res.activityInfoTab;

          // if (!this.BankDetails[0]) {
          //   this.BankDetails = this.formData.commercialInfoStep.bankInfoTab.bankDetails;
          // }
          // if (!this.otherData[0]) {
          //   this.otherData = this.formData.commercialInfoStep.otherInfoTab.otherInfo;
          // }
          // if (!this.activityData) {
          // if (!this.BankDetails[0]) {
          //   this.BankDetails = this.formData.commercialInfoStep.bankInfoTab.bankDetails;
          // }
          // if (!this.otherData[0]) {
          //   this.otherData = this.formData.commercialInfoStep.otherInfoTab.otherInfo;
          // }
          // if (!this.activityData) {
          this.activityData = this.formData.commercialInfoStep.activityInfoTab;
          // }
          this.cdr.detectChanges();
        })
    );
  }


  sorting(property, str) {
    this.order = !this.order;
    if (this.order === true) {

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

  changeTab() {
    this.selected.setValue(this.selected.value + 1);
  }
  previousTab() {
    this.selected.setValue(this.selected.value - 1);
  }

  openFile(content, page, data, isMoci) {
    this.isDataMoci = isMoci;
    this.selectedPage = page;
    this.uploadData = data;
    if (this.selectedPage === 'personal') {
      this.filesList = [];
      this.personalData.map((d, i) => {
        if (d.personalID === data.personalID) {
          if (d.documents['name']) {
            this.filesList.push(d.documents);
          }
        }
      });
    }
    this.open(content);
  }

  open(content) {


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
