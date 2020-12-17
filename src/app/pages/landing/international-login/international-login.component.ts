import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SpinnerService } from 'src/app/services/spinner.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-international-login',
  templateUrl: './international-login.component.html',
  styleUrls: ['./international-login.component.scss']
})
export class InternationalLoginComponent implements OnInit {

  public user = { email: '', password: '' };
  public loginForm: FormGroup;
  message: string;
  validForm: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private spinner: SpinnerService,
    private formBuilder: FormBuilder) { }


  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }


  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  login(e) {
    localStorage.setItem('completeReg', 'T');
    localStorage.setItem('internationalEmail', e.email);
    const body = { email: this.loginForm.value.email, register_type: 'international' };
    this.spinner.openSpinner();
    this.userService.supplierRegistration(body);
  }

  validateEmail(email, psw) {
    const emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      this.validForm = true;
      this.message = 'Please enter valid email.';
    } else if (psw === '') {
      this.validForm = true;
      this.message = 'Please enter valid password.';
    } else {
      this.message = '';
      this.validForm = false;
    }
  }
  onViewSidebar(e) {
  }
}
