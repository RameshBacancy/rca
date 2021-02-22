import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SupplierEnum } from 'src/app/enum/supplier.enum';
import { AlertService } from 'src/app/services/alert.service';
import { CollaborationService } from 'src/app/services/collaboration.service';

@Component({
  selector: 'app-renewal-update',
  templateUrl: './renewal-update.component.html',
  styleUrls: ['./renewal-update.component.scss']
})
export class RenewalUpdateComponent implements OnInit {
  selected = new FormControl(0);
  isRenewalUpdate = false;
  supplierType: string;
  isLoading: boolean;
  paymentData = {
    amount: null,
    currency: '',
    token: ''
  };
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
  renewalUpgradeStatus: string;
  renewalPaymentStatus: string;

  @ViewChild('requestModal') requestModal: ElementRef;

  supplierEnum = SupplierEnum;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private alertMessage: AlertService,
    private collaborationService: CollaborationService,
    private cdr: ChangeDetectorRef
    ) { }

  ngOnInit(): void {
    this.isLoading = false;
    const authToken = 'Bearer ' + localStorage.getItem('authToken');
    this.paymentData = {
      amount: 100,
      currency: 'USD',
      token: authToken
    };

    this.supplierType = localStorage.getItem('regType');
    if (localStorage.getItem('completePayment') !== 'true') {
      this.router.navigate(['/landing', 'supplier-registration', 'dashboard']);
    }
    this.renewalPaymentStatus = localStorage.getItem('renewalPaymentStatus') || '';
    this.loadData();
  }

  private loadData() {
    this.isLoading = true;
    this.collaborationService.getCollaborationData()
      .subscribe(res => {
        this.renewalUpgradeStatus = res.renewalUpgradeRequest.status || localStorage.getItem('renewalStatus') || '';

        this.renewalUpgradeStatus = this.renewalPaymentStatus === 'success' ? '' : this.renewalUpgradeStatus;
        this.loadForm();
        if (localStorage.getItem('civilReg') === '11347789') {
          this.renewalUpgradeStatus = 'pending';
        }
        this.isLoading = false;
        this.cdr.detectChanges();
      },
        (err) => {
          this.isLoading = false;
          console.log('err :>> ', err);
        });
  }

  private loadForm(): void {

    this.renewalUpgradeRequestFrom = this.formBuilder.group({
      renewalRequest: [''],
      currentActivity: ['Activity 1'],
      currentGrade: ['a'],
      email: ['r.bala@gmail.com']
    });

  }

  get renewalFormControl(): { [key: string]: AbstractControl; } {
    return this.renewalUpgradeRequestFrom.controls;
  }

  public renewalUpdateSubmit(): void {
    if (this.renewalUpgradeRequestFrom.value.renewalRequest) {
      this.open();
      this.isRenewalUpdate = false;
      if (localStorage.getItem('civilReg') === '11337799') {
        const body = {
          renewal: {
            status: 'approved'
          }
        };
        this.collaborationService.activityUpgradeRequest(body).subscribe(() => {
          localStorage.setItem('renewalStatus', 'approved');
        }, (err) => console.log(err));
      }
      localStorage.setItem('renewalStatus', 'pending');
    } else {
      this.alertMessage.pushError('Enter valid Renewal Request.', 2000);
    }
  }

  updateClick(tab: string) {
    this.isRenewalUpdate = true;
  }

  // for modal pop up
  open() {
    this.modalService.open(this.requestModal, { ariaLabelledBy: 'modal-basic-title' }).result.then(() => {
      this.router.navigateByUrl('/landing/supplier-registration/dashboard');
    });
  }

  callPayment(type: string = 'renewal') {
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
