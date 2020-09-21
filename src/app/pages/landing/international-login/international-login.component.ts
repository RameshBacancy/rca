import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-international-login',
  templateUrl: './international-login.component.html',
  styleUrls: ['./international-login.component.scss']
})
export class InternationalLoginComponent implements OnInit {

  public user = {email:"",password:""}
  message: string;
  validForm: boolean = true;

  constructor( private router: Router) { }

  ngOnInit(): void {
  }


  login()
  {
    console.log(this.user);
    localStorage.setItem('completeReg', 'T');
    this.router.navigateByUrl('/landing/supplier-registration/dashboard')
  }

  validateEmail(email, psw) {
    var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (!emailReg.test(email)) {
      this.validForm = true;
        this.message = "please enter valid email";
    } else if( psw === ''){
      this.validForm = true;
      this.message = "please enter valid password";
    } 
    else {
      this.message = "";
      this.validForm = false;
    }
  }
  onViewSidebar(e){ 
  }
}
