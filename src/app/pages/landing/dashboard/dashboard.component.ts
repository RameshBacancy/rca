import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild('nodeInput' ) fileInput: ElementRef;
  status: string;
  approveRejectStatus: string;
  gotopath: string;
  closeResult: string;
  showPopUp: boolean;

  constructor(
    private modalService: NgbModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.modalService.dismissAll();
    this.gotopath = '/landing/supplier-registration/dashboard';
  }

  ngAfterViewChecked(): void {
    if(!localStorage.getItem('1completeToken')){ 
      if(localStorage.getItem('ModelShowed') != 'true'){
        if(localStorage.getItem('paymentStep') != 'true'){
          if(localStorage.getItem('RegStatus') == 'finish') {
            this.fileInput.nativeElement.click();
          }
        }
      }
    }
  }

  onRegistrationClick(){
    if(localStorage.getItem('RegStatus') === 'finish') {
      if(localStorage.getItem('arStatus') === 'pending') {
        this.status = "Approval Awaited";
        this.approveRejectStatus = "Thank you for entering your registration details. <br/> We will review and get back to you soon.<br/>"
        this.gotopath = '/landing/supplier-registration/dashboard';
      } else if(localStorage.getItem('arStatus') === 'approved') {
        this.status = "Approved";
        this.approveRejectStatus = "Your Registration request is Approved by the Admin. <br/> For further procedure complete your payment. <br/>"
        this.gotopath = '/landing/supplier-registration/transaction'; 
      } else if(localStorage.getItem('arStatus') === 'reject') {
        this.status = "Rejected";
        this.approveRejectStatus = "Your Registration request is Rejected by the Admin. <br/> If you have any queries regarding to this then contact with admin. <br/>"
        this.gotopath = '/landing/supplier-registration/dashboard'; 
      }
    }
  }

  goto(cancel?){
    localStorage.setItem('ModelShowed', 'true');
    this.modalService.dismissAll();
    if(cancel){
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
