import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { CollaborationService } from 'src/app/services/collaboration.service';

@Component({
  selector: 'app-activity-update',
  templateUrl: './activity-update.component.html',
  styleUrls: ['./activity-update.component.scss']
})
export class ActivityUpdateComponent implements OnInit {

  isActivityUpdate = false;
  activityUpgradeRequestForm: FormGroup;
  activityPaymentStatus: string;
  activitySelectOption = [
    { value: '1', viewValue: 'Activity 1' },
    { value: '2', viewValue: 'Activity 2' },
    { value: '3', viewValue: 'Activity 3' }
  ];
  gradeSelectOption = [
    { value: 'a', viewValue: 'A' },
    { value: 'b', viewValue: 'B' },
    { value: 'b+', viewValue: 'B+' }
  ];
  activityUpgradeStatus: string;

  paymentData = {
    amount: null,
    currency: '',
    token: ''
  }
  supplierType: string;
  @ViewChild('requestModal') requestModal: ElementRef;
  selected = new FormControl(0);

constructor(
  private formBuilder: FormBuilder,
  private modalService: NgbModal,
  private router: Router,
  private alertMessage: AlertService,
  private collaborationService: CollaborationService,
  private cdr: ChangeDetectorRef
) { }

  ngOnInit(): void {

    const authToken = 'Bearer ' + localStorage.getItem('authToken');
    this.paymentData = {
      amount: 100,
      currency: 'USD',
      token: authToken
    };

    this.supplierType = localStorage.getItem('regType');
    if (localStorage.getItem('completePayment') !== 'true') {
      this.router.navigate(['/landing', 'supplier-registration', 'dashboard'])
    }
    this.activityPaymentStatus = localStorage.getItem('activityPaymentStatus') || '';
    this.loadData();
  }

  private loadData() {
    this.collaborationService.getCollaborationData()
      .subscribe(res => {
        this.activityUpgradeStatus = res.activityUpgradeRequest.status || localStorage.getItem('activityStatus') || '';

        this.activityUpgradeStatus = this.activityPaymentStatus === 'success' ? '' : this.activityUpgradeStatus;
        this.loadForm();
        if (localStorage.getItem('civilReg') === '11347789') {
          this.activityUpgradeStatus = 'pending';
        }
        this.cdr.detectChanges();
      },
        (err) => {
          console.log('err :>> ', err);
        });
  }

  private loadForm(): void {

    this.activityUpgradeRequestForm = this.formBuilder.group({
      currentActivity: ['Activity 1'],
      currentGrade: ['B'],
      newGradeRequest: ['A'],
      newActivityRequest: ['Activity 2'],
      requestDate: [''],
      spEmployeeMailId: ['-']
    });
  }

  get activityFormControl(): { [key: string]: AbstractControl; } {
    return this.activityUpgradeRequestForm.controls;
  }
  public activityUpdateSubmit(): void {
    if (this.activityUpgradeRequestForm.value.newGradeRequest) {
      if (this.activityUpgradeRequestForm.value.newActivityRequest) {
        this.activityUpgradeRequestForm.get('requestDate').setValue(new Date().toDateString());
        this.open();
        this.isActivityUpdate = false;
        if (localStorage.getItem('civilReg') === '11337799') {
          const body = {
            activity: {
              status: 'approved'
            }
          };
          this.collaborationService.activityUpgradeRequest(body).subscribe(res => {
            localStorage.setItem('activityStatus', 'approved');
          }, (err) => console.log(err));
        }
        localStorage.setItem('activityStatus', 'pending');
      } else {
        this.alertMessage.pushError('Enter valid Activity.', 2000);
      }
    } else {
      this.alertMessage.pushError('Enter valid Grade.', 2000);
    }
  }

  updateClick(tab: string) {
     this.isActivityUpdate = true;
  }

  // for modal pop up
  open() {
    this.modalService.open(this.requestModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
      this.router.navigateByUrl('/landing/supplier-registration/dashboard');
    });
  }

  callPayment(type: string = 'activity') {
    this.router.navigateByUrl('/landing/supplier-collaboration/payment/' + type);
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
}
