import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  status: string;
  approveRejectStatus: string;
  gotopath: string;
  closeResult: string;

  constructor(
    private router : Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  onRegistrationClick(){
    if(localStorage.getItem('RegStatus') === 'finish') {
      if(localStorage.getItem('arStatus') === 'pending') {
        this.status = "Wait For Approval";
        this.approveRejectStatus = "You finish your registration proccess. <br/> Admin will shortly review your details.  <br/>"
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
    } else{
      this.router.navigateByUrl('/landing/supplier-registration/registration');
    }
  }

  goto(){
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
