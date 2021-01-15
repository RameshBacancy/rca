import { CollaborationService } from './../../../services/collaboration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

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
  supplierType: string;

  paymentData = {
    amount: null,
    currency: '',
    token: ''
  }


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
  activityUpgradeStatus: string;
  renewalUpgradeStatus: string;
  activityPaymentStatus: string;
  renewalPaymentStatus: string;

  @ViewChild('requestModal') requestModal: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private alertMessage: AlertService,
    private collaborationService: CollaborationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  }

}
