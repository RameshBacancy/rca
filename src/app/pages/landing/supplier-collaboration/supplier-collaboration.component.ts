import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

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
  closeResult: any;

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

  @ViewChild('requestModal') requestModal: ElementRef;
  private modalRef: TemplateRef<any>;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router
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
    this.open(this.requestModal);
    this.isActivityUpdate = false;
  }
  public renewalUpdateSubmit(): void {
    this.open(this.requestModal);
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


  // for modal pop up
  open(content) {

    this.modalService.open(this.requestModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
      this.router.navigateByUrl('/landing/supplier-registration/dashboard');
    });
    // this.modalService.open(, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

    //   this.closeResult = `Closed with: ${result}`;

    // }, (reason) => {

    //   this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    // });
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
