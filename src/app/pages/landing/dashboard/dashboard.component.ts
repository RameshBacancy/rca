import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertMessageService } from 'src/app/services/alert-message.service';
import { SafeHtmlPipe } from 'src/app/pipe/safeHtml.pipe';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewChecked {

  @ViewChild('nodeInput' ) fileInput: ElementRef;
  status: string;
  approveRejectStatus: string;
  gotopath: string;
  closeResult: string;
  showPopUp: boolean;
  alertData: any;

  constructor(
    private modalService: NgbModal,
    private router: Router,
    private alertMessage: AlertMessageService,
    private safeHtml: SafeHtmlPipe
  ) { }

  ngOnInit(): void {
    this.modalService.dismissAll();
    this.gotopath = '/landing/supplier-registration/dashboard';
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
        this.alertMessage.getMessages().subscribe( d => {
          d.data.data.filter( a => {
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
        this.alertMessage.getMessages().subscribe( d => {
          d.data.data.filter( a => {
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
        this.alertMessage.getMessages().subscribe( d => {
          d.data.data.filter( a => {
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
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

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
      return  `with: ${reason}`;
    }
  }
}
