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
  showsNext: boolean = false;
  viewSideBar: boolean = false;

  form = new FormGroup({
    regType: new FormControl('local', [Validators.required]),
    civilNo: new FormControl('11337788', [Validators.required]),
    registrationNo: new FormControl('1086391', [Validators.required]),
    registrationType: new FormControl('alreadyRegistered', [Validators.required])
  });

  constructor(private router: Router, private _userService: UserService, private alertService: AlertService) { }

  ngOnInit(): void {
    if(localStorage.getItem('registerToken1')){
      this.router.navigate(['/landing/supplier-registration/dashboard']);
    }
  }

  submitNext() {
    this._userService.registrationLogin(this.form.value.civilNo.toString(), 'civil');
    if (localStorage.getItem('registerToken1')) {
    }
    this.showsNext = true;
  }

  submit() {
    if (this.form.status === 'VALID') {
      if (this.form.value.registrationType === 'alreadyRegistered') {
        if (localStorage.getItem('registerToken1')) {
          this.router.navigate(['/landing/supplier-registration/dashboard']);
        }
        else{
          this.alertService.pushError('Your Civil Number is Incorrect.');
        }
      }
      if (this.form.value.registrationType === 'newSupplier') {
        localStorage.removeItem('registerToken1');
        this.router.navigate(['/auth/register']);
      }
    }
  }

  // goto() {
    // this._userService.registrationLogin(this.registrationNo.toString(), 'registration');
    // if (localStorage.getItem('registerToken1')) {
    //   this.router.navigate(['/landing/supplier-registration/dashboard']);
    // }
  // }

  back() {
    this.showsNext = false;
  }
  onViewSidebar(val) {
    this.viewSideBar = val;
  }
}
