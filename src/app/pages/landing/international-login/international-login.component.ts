import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-international-login',
  templateUrl: './international-login.component.html',
  styleUrls: ['./international-login.component.scss']
})
export class InternationalLoginComponent implements OnInit {

  public user = {email:"",password:""}
  message: string;
  validForm: boolean = true;

  constructor( private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }


  login(e)
  {
    console.log(this.user);
    localStorage.setItem('completeReg', 'T');
    localStorage.setItem('internationalEmail', e)
    const body = { email: e, register_type:'international'}
    this.userService.supplierRegistration(body).subscribe(d => { 
      localStorage.setItem('RegStatus',d.data.register_status);
      localStorage.setItem('arStatus',d.data.status)
      this.router.navigate(['/landing/supplier-registration/dashboard']);
    })
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
