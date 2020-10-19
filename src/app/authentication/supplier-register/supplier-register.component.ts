import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.scss']
})
export class SupplierRegisterComponent implements OnInit {

  supplierSelection: boolean = false;
  showsNextReg: boolean = false;
  viewSideBar: boolean = false;

  myControl = new FormControl();
  
  options: string[] = ['1086391', '1086393', '1216194', '1024511'];
  filteredOptions: Observable<string[]>;

  form = new FormGroup({
    regType: new FormControl('local', [Validators.required]),
    civilNo: new FormControl('11337788', [Validators.required]),
    registrationNo: new FormControl('', [Validators.required]),
    registrationType: new FormControl('alreadyRegistered', [Validators.required])
  });

  constructor(
    private router: Router, 
    private _userService: UserService, 
    private alertService: AlertService, 
    private spinner: SpinnerService
    ) { }

  ngOnInit(): void {
    localStorage.clear();
      this.router.navigate(['/landing/supplier-registration/dashboard']);
      if (localStorage.getItem('civilReg') && localStorage.getItem('foreign') === 'false') {
        this.showsNextReg = true;
      }
      this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCR(id){
    this.form.value.registrationNo = id;
  }

  submitNext() {
    // this.form.patchValue({registrationNo : this.myControl.value});
    this._userService.registrationLogin(this.form.value.civilNo.toString(), 'civil', this.form.value.regType);
    if (localStorage.getItem('civilReg') && localStorage.getItem('foreign') === 'false') {
      this.showsNextReg = true;
    }
  }

  submitType() {
    this._userService.foreignRegistration(this.form.value.registrationType.toString())
  }


  submitReg(){
    if (this.form.status === 'VALID') {
      this._userService.localRegistration(this.form.value.registrationNo.toString());
      this.spinner.openSpinner();
      const body = { civil_number:localStorage.getItem('civilReg'),cr_number:localStorage.getItem('commercialReg'), register_type:localStorage.getItem('regType')}
      this._userService.supplierRegistration(body)
     }
  }

  back() {
    this.showsNextReg = false;
    localStorage.clear();
  }

  onViewSidebar(val) {
    this.viewSideBar = val;
  }
}
