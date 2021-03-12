import { PaymentStep } from './../../../enum/payment-step.enum';
import { PaymentService } from './../../../services/payment.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './../../../services/language.service';
import { TenderService } from 'src/app/services/tender.service';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { SafeHtmlPipe } from '../../../shared/pipe/safeHtml.pipe';
import { AlertService } from 'src/app/services/alert.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  @ViewChild('nodeInput') fileInput: ElementRef;
  status: string;
  approveRejectStatus: string;
  gotopath: string;
  closeResult: string;
  showPopUp: boolean;
  alertData: any;

  tendering = {
    open: 0,
    submitted: 0,
    awarded: 0,
    rejected: 0
  };

  regStatus;
  paymentCompleteStatus;
  arStatus;
  paymentNotificationMessage: string;
  paymentResult = '';
  paymentMessage = '';
  paymentStatusStep = PaymentStep;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private alertMessage: AlertMessageService,
    private safeHtml: SafeHtmlPipe,
    private tenderService: TenderService,
    private alerts: AlertService,
    private cdr: ChangeDetectorRef,
    private languageService: LanguageService,
    private translateService: TranslateService,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    private paymentService: PaymentService
  ) {
    const language = this.languageService.getLanguage();
    this.translateService.use(language);
    if (localStorage.getItem('ModelShowed') != 'true') {
      if (this.paymentCompleteStatus != 'true') {
        if (this.regStatus == 'finish') {
          this.fileInput.nativeElement.click();
        }
      }
    }
  }

  ngOnInit(): void {
    this.modalService.dismissAll();

    this.paymentCompleteStatus = localStorage.getItem('completePayment');
    this.regStatus = localStorage.getItem('RegStatus');
    this.arStatus = localStorage.getItem('arStatus');

    this.getNotificationParams();

    this.paymentNotificationMessage = this.paymentCompleteStatus != 'true' && this.regStatus == 'finish' && this.arStatus === 'approved' ? 'For further procedure complete your payment.' : '';
    this.gotopath = '/landing/supplier-registration/dashboard';
    this.tenderService.getTender().subscribe((data: any) => {
      if (data[0]) {
        data[0].tenders.filter(tender => {
          switch (tender.tenderStatus) {
            case 'open':
              this.tendering.open++;
              break;
            case 'submitted':
              this.tendering.submitted++;
              break;
            case 'awarded':
              this.tendering.awarded++;
              break;
            case 'rejected':
              this.tendering.rejected++;
              break;
          }
        });
      }
      this.cdr.detectChanges();
    });
  }


  ngAfterViewChecked(): void {
    if (localStorage.getItem('ModelShowed') != 'true') {
      if (this.paymentCompleteStatus != 'true') {
        if (this.regStatus == 'finish') {
          this.fileInput.nativeElement.click();
          localStorage.setItem('ModelShowed', 'true');
        }
      }
    }
  }

  getNotificationParams(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.paymentResult = params['status'];
      this.paymentMessage = params['message'];
      if (this.paymentResult || this.paymentMessage) {
        this.location.replaceState('/landing/supplier-registration/dashboard');
        if (this.paymentResult === this.paymentStatusStep.SUCCESS
          || this.paymentResult === this.paymentStatusStep.CAPTURED
          || this.paymentResult === this.paymentStatusStep.Approved) {
          this.alerts.pushSuccess(this.paymentMessage);
        } else {
          this.alerts.pushError(this.paymentMessage);
        }

        this.paymentService.getPaymentData().subscribe(res => {
          console.log(res);
        });
      }
    });
  }

  openModel() {
    if (this.regStatus === 'finish') {
      this.fileInput.nativeElement.click();
    } else {
      this.router.navigateByUrl('/landing/supplier-registration/registration');
    }
  }
  onRegistrationClick() {
    if (this.regStatus === 'finish') {
      if (localStorage.getItem('arStatus') === 'pending') {
        this.alertMessage.getMessages().subscribe(d => {
          d.data.data.filter(a => {
            if (a.status == 'pending') {
              this.alertData = a;
            }
          });
          if (this.alertData) {
            this.status = this.alertData.title;
            this.approveRejectStatus = this.safeHtml.transform(this.alertData.description, true);
          } else {
            this.status = 'Approval Awaited';
            this.approveRejectStatus = 'Thank you for entering your registration details. <br/> We will review and get back to you soon.<br/>';
          }
        });
        this.gotopath = '/landing/supplier-registration/dashboard';
      } else if (localStorage.getItem('arStatus') === 'approved') {
        if (this.paymentCompleteStatus != 'true') {
          this.alertMessage.getMessages().subscribe(d => {
            d.data.data.filter(a => {
              if (a.status == 'approved') {
                this.alertData = a;
              }
            });
            if (this.alertData) {
              this.status = this.alertData.title;
              this.approveRejectStatus = this.safeHtml.transform(this.alertData.description, true);
            } else {
              this.status = 'Approved';
              this.approveRejectStatus = 'Your Registration request is Approved by the Admin. <br/> For further procedure complete your payment. <br/>';
            }
          });
          this.gotopath = '/landing/supplier-registration/transaction';
        } else {
          // this.alertMessage.getMessages().subscribe(d => {
          //   d.data.data.filter(a => {
          //     if (a.status == 'approved') {
          //       this.alertData = a;
          //     }
          // //   });
          //   if (this.alertData) {
          //     this.status = this.alertData.title;
          //     this.approveRejectStatus = this.safeHtml.transform(this.alertData.description, true);
          //   } else {
          this.status = 'Approved';
          this.approveRejectStatus = 'Your Registration request is Approved by the Admin. <br/> Your payment is already completed. <br/>';
          // }
          // });
          this.gotopath = '/landing/supplier-registration/dashboard';
        }
      } else if (localStorage.getItem('arStatus') === 'reject') {
        this.alertMessage.getMessages().subscribe(d => {
          d.data.data.filter(a => {
            if (a.status == 'reject') {
              this.alertData = a;
            }
          });
          if (this.alertData) {
            this.status = this.alertData.title;
            this.approveRejectStatus = this.safeHtml.transform(this.alertData.description, true);
          } else {
            this.status = 'Rejected';
            this.approveRejectStatus = 'Your Registration request is Rejected by the Admin. <br/> If you have any queries regarding to this then contact with admin. <br/>';
          }
        });
        this.gotopath = '/landing/supplier-registration/dashboard';
      }
    }
  }

  onTenderStatus(status?) {
    if (this.regStatus === 'finish') {
      if (localStorage.getItem('arStatus') === 'pending') {
        this.alertMessage.getMessages().subscribe(d => {
          d.data.data.filter(a => {
            if (a.status == 'pending') {
              this.alertData = a;
            }
          });
          if (this.alertData) {
            this.status = this.alertData.title;
            this.approveRejectStatus = this.safeHtml.transform(this.alertData.description, true);
          } else {
            this.status = 'Approval Awaited';
            this.approveRejectStatus = 'Thank you for entering your registration details. <br/> We will review and get back to you soon.<br/>';
          }
        });
        this.gotopath = '/landing/supplier-registration/dashboard';
      } else if (localStorage.getItem('arStatus') === 'approved') {
        if (this.tendering[status]) {
          // this.gotopath = '/e-tendering/tender-dashboard/current-tenders?status='+status;
          this.router.navigateByUrl('/e-tendering/tender-dashboard/current-tenders?status=' + status);
        } else {
          this.alerts.pushError('No tender available.');
        }
      } else if (localStorage.getItem('arStatus') === 'reject') {
        this.alertMessage.getMessages().subscribe(d => {
          d.data.data.filter(a => {
            if (a.status == 'reject') {
              this.alertData = a;
            }
          });
          if (this.alertData) {
            this.status = this.alertData.title;
            this.approveRejectStatus = this.safeHtml.transform(this.alertData.description, true);
          } else {
            this.status = 'Rejected';
            this.approveRejectStatus = 'Your Registration request is Rejected by the Admin. <br/> If you have any queries regarding to this then contact with admin. <br/>';
          }
        });
        this.gotopath = '/landing/supplier-registration/dashboard';
      }
    } else {
      this.router.navigateByUrl('/landing/supplier-registration/registration');
    }
  }
  goto(cancel?) {
    localStorage.setItem('ModelShowed', 'true');
    this.modalService.dismissAll();
    if (cancel) {
      this.gotopath = '/landing/supplier-registration/dashboard';
    }
    this.router.navigateByUrl(this.gotopath);
  }

  open(content) {

    this.onRegistrationClick();
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

  closeNotification(): void {
    this.paymentNotificationMessage = ''
  }

}
