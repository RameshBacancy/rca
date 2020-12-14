import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-supplier-collaboration',
  templateUrl: './supplier-collaboration.component.html',
  styleUrls: ['./supplier-collaboration.component.scss']
})
export class SupplierCollaborationComponent implements OnInit {
  selected = new FormControl(0);
  isProfileUpdate = false;
  isActivityUpdate = false;
  isRenewalUpdate = false;

  isSave = true;
  profileUpdateForm: FormGroup;
  activityUpgradeRequestForm: FormGroup;
  renewalUpgradeRequestFrom: FormGroup;
  gradeSelectOption = [
    { value: 'a', viewValue: 'A' },
    { value: 'b', viewValue: 'B' },
    { value: 'b+', viewValue: 'B+' }
  ];
  activitySelectOption = [
    { value: '1', viewValue: 'Activity 1' },
    { value: '2', viewValue: 'Activity 2' },
    { value: '3', viewValue: 'Activity 3' }
  ];

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  private loadForm(): void {
    this.profileUpdateForm = this.formBuilder.group({
      bankAccount1: ['ac1236632112'],
      bankAccount2: ['ac9874569874'],
      projects: ['Cms'],
      address1: ['lorem lorem'],
      address2: ['lorem lorem 2'],
      address3: ['lorem lorem 3'],
      email: ['bala.r@gmail.com'],
      phone: [9999999999],
      mobile: [8888888888],
      fax: ['.'],
      keyContactPerson: ['R.B.']
    });

    this.activityUpgradeRequestForm = this.formBuilder.group({
      currentActivity: ['test 1'],
      currentGrade: ['a'],
      newGradeRequest: [''],
      newActivityRequest: [''],
      requestDate: ['-'],
      spEmployeeMailId: ['-']
    });

    this.renewalUpgradeRequestFrom = this.formBuilder.group({
      renewalRequest: ['-'],
      currentActivity: ['Activity 1'],
      currentGrade: ['a'],
      email: ['r.bala@gmail.com']
    });

  }

  get profileFormControl(): { [key: string]: AbstractControl; } {
    return this.profileUpdateForm.controls;
  }

  get activityFormControl(): { [key: string]: AbstractControl; } {
    return this.activityUpgradeRequestForm.controls;
  }
  get renewalFormControl(): { [key: string]: AbstractControl; } {
    return this.renewalUpgradeRequestFrom.controls;
  }

  public profileUpdateSubmit(): void {
    this.isProfileUpdate = false;
  }
  public activityUpdateSubmit(): void {
    this.isActivityUpdate = false;
  }
  public renewalUpdateSubmit(): void {
    this.isRenewalUpdate = false;
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

  updateClick(tab: string) {
    switch (tab) {
      case 'profile':
        this.isProfileUpdate = true;
        break;
      case 'activity':
        this.isActivityUpdate = true;
        break;
      case 'renewal':
        this.isRenewalUpdate = true;
        break;
      default:
        break;
    }
  }

}
