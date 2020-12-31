import { TenderService } from 'src/app/services/tender.service';
import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { SafeHtmlPipe } from 'src/app/pipe/safeHtml.pipe';
import { AlertService } from 'src/app/services/alert.service';

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

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private alertMessage: AlertMessageService,
    private safeHtml: SafeHtmlPipe,
    private tenderService: TenderService,
    private alerts: AlertService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.modalService.dismissAll();
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
      if (localStorage.getItem('paymentStep') != 'true') {
        if (localStorage.getItem('RegStatus') == 'finish') {
          this.fileInput.nativeElement.click();
        }
      }
    }
  }

  openModel() {
    if (localStorage.getItem('RegStatus') === 'finish') {
      this.fileInput.nativeElement.click();
    } else {
      this.router.navigateByUrl('/landing/supplier-registration/registration');
    }
  }
  onRegistrationClick() {
    if (localStorage.getItem('RegStatus') === 'finish') {
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
    if (localStorage.getItem('RegStatus') === 'finish') {
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
        if(this.tendering[status]){
          this.gotopath = '/e-tendering/tender-dashboard/current-tenders?status='+status;
        } else {
          this.alerts.pushError('No tender available.')
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
    }else {
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
}
