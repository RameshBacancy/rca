import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public user = { email: '', password: '' };
  public fuser = { email: '' };
  message: any;
  closeResult: string;
  errmessage: string;
  validForm: boolean;
  public loginForm: FormGroup;

  constructor(
    private userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private spinner: SpinnerService
  ) { }

  ngOnInit() {
    // this.spinner.openSpinner();
    localStorage.clear();
    this.spinner.closeSpinner();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  login() {
    this.spinner.openSpinner();
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password);
  }


  forgetPass(email) {
    this.spinner.openSpinner();
    this.userService.forgetPass(email);
  }

  validateEmail(email) {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      this.validForm = false;
      this.errmessage = 'please enter valid email';
    } else {
      this.errmessage = '';
      this.validForm = true;
    }
  }

  open(content, address?) {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(this.fuser.email)) {
      this.validForm = true;
    }

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
