import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.scss']
})
export class SupplierRegisterComponent implements OnInit {

  supplierSelection: boolean = false;
  showsNextType: boolean = false;
  showsNextReg: boolean = false;
  viewSideBar: boolean = false;

  form = new FormGroup({
    regType: new FormControl('local', [Validators.required]),
    civilNo: new FormControl('11337788', [Validators.required]),
    registrationNo: new FormControl('1086391', [Validators.required]),
    registrationType: new FormControl('alreadyRegistered', [Validators.required])
  });

  constructor(private router: Router, private _userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    localStorage.removeItem('LoginToken')
    if(localStorage.getItem('civilReg')){
      this.router.navigate(['/landing/supplier-registration/dashboard']);
      if (localStorage.getItem('civilReg') && localStorage.getItem('foreign') === 'true') {
        this.showsNextType = true;
      }
      if (localStorage.getItem('civilReg') && localStorage.getItem('foreign') === 'false') {
        this.showsNextReg = true;
      }
    }
  }

  submitNext() {
    this._userService.registrationLogin(this.form.value.civilNo.toString(), 'civil', this.form.value.regType);
    if(this.form.value.regType === 'local'){
      localStorage.setItem('regType','local');
    }
    if(this.form.value.regType === 'individual'){
      localStorage.setItem('regType','individual');
    }
    if(this.form.value.regType === 'international'){
      localStorage.setItem('regType','international');
    }
    if (localStorage.getItem('civilReg') && localStorage.getItem('foreign') === 'true') {
      this.showsNextType = true;
    }
    if (localStorage.getItem('civilReg') && localStorage.getItem('foreign') === 'false') {
      this.showsNextReg = true;
    }
  }

  submitType() {
    if (this.form.status === 'VALID') {
     this._userService.foreignRegistration(this.form.value.registrationType.toString())
    }
  }


  submitReg(){
    if (this.form.status === 'VALID') {
      this._userService.localRegistration(this.form.value.registrationNo.toString())
     }
  }

  back() {
    this.showsNextType = false;
    this.showsNextReg = false;
  }
  onViewSidebar(val) {
    this.viewSideBar = val;
  }
}
