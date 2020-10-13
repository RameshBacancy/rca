import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public user = {email:"",password:""};
  public fuser = {email:""};
  message: any;
  closeResult: string;
  errmessage: string;
  validForm: boolean;

  constructor(
    private _userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private _alertService: AlertService,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
    // this.spinner.openSpinner();
    localStorage.clear();
    this.spinner.closeSpinner();
  }

  login()
  {
    this.spinner.openSpinner();
    this._userService.login(this.user.email,this.user.password);
  }

  
  forgetPass(email)
  {
    this.spinner.openSpinner();
    this._userService.forgetPass(email);
  }

  validateEmail(email) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      this.validForm = false;
      this.errmessage = "please enter valid email";
    }
    else {
      this.errmessage = "";
      this.validForm = true;
    }
  }

  open(content, address?) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if(!emailReg.test(this.fuser.email)){
      this.validForm = true;
    }

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
