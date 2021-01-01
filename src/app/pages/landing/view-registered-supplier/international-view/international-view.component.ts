import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AddressInd, CommunicationDetailsStep, GeneralInfoStepInd } from 'src/app/models/supplier.modal';
import { FilterPipe } from 'src/app/pipe/searchEmployee.pipe';
import { SortByPipe } from 'src/app/pipe/sortBy.pipe';
import { SupplierInternationalRegisterService } from 'src/app/services/supplier-international-register.service';
import { SupplierRegistrationService } from 'src/app/services/supplier-registration.service';

@Component({
  selector: 'app-international-view',
  templateUrl: './international-view.component.html',
  styleUrls: ['./international-view.component.scss']
})
export class InternationalViewComponent implements OnInit {

  @ViewChild('stepper') private stepper: MatStepper;

  @Input('searchText') searchText: any;

  selected = new FormControl(0);
  formData: any;
  order: boolean;
  selectedPage: any;
  uploadData: any;
  filesList: any[];
  closeResult: string;


  generalInfoStep$: Observable<GeneralInfoStepInd>;

  selectedAddress: any;
  allAddresses: AddressInd[];
  personalData: any;
  communicationData: CommunicationDetailsStep;
  staffData: any[];
  activityData: any[];
  activityDetail: any;
  bankDetails: any;
  otherData: any[];
  internationalAddress: any[];

  destroy$: Subject<boolean> = new Subject();

  constructor(
    private supplierData: SupplierRegistrationService,
    private sortByPipe: SortByPipe,
    private searchPipe: FilterPipe,
    private internationalService: SupplierInternationalRegisterService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadFormData()
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.complete();
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
        this.activityData = [...this.formData.commercialInfoStep.activityInfoTab.activities, ...res.activityInfoTab.activities];
        // this.activityData = [...this.formData.commercialInfoStep.activityInfoTab.activities, ...this.activityDetail.activities];
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


  sorting(property, str) {
    this.order = !this.order;
    if (this.order === true) {
      if (property === 'staff') {
        this.staffData = this.sortByPipe.transform(this.staffData, 'asc', str);
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
    } else {
      if (property === 'staff') {
        this.staffData = this.sortByPipe.transform(this.staffData, 'desc', str);
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
    }
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

}
