import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.scss']
})
export class SupplierRegisterComponent implements OnInit {

  submitCivil = false;
  supplierSelection = false;
  showsNextReg = false;
  viewSideBar = false;
  isDisable = true;
  isOtpShow = false;

  myControl = new FormControl();
  options: string[] = [
    '1086391 - Omantel', '1086393 - Petroleum Development Oman', '1216194 - Raysut Cement', '1024511 - The Shaksy Group'
  ];
  selectedLanguage: any = 'English';
  filteredOptions: Observable<string[]>;
  CRNumber: any;
  companyName: any;

  form = new FormGroup({
    regType: new FormControl('localcom', [Validators.required]),
    localRegType: new FormControl('local', [Validators.required]),
    civilNo: new FormControl('11337788', [Validators.required]),
    registrationNo: new FormControl('', [Validators.required]),
    registrationType: new FormControl('alreadyRegistered', [Validators.required]),
  });
  public languageArray = ['English', 'Arabic'];
  readonlycivil: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private spinner: SpinnerService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef) {
    this.translate.use('English');
  }

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

    this.form.valueChanges.subscribe(() => {
      this.isDisable = (this.form.value.registrationNo && this.form.value.civilNo) ? false : true;
    });
  }


  changeLang(lang) {
    this.translate.use(lang);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  getCR(id) {
    let x = id.split(' - ');
    // this.form.value.registrationNo = x[0];
    this.form.get('registrationNo').setValue(x[0]);
    this.companyName = x[1];
  }

  submitNext() {
    this.form.patchValue({ registrationNo: this.form.value.registrationNo });
    // localStorage.setItem('comName', this.companyName);
    // this.form.patchValue({registrationNo : this.myControl.value});
    let type = 'international';
    if (this.form.value.regType == 'localcom') {
      type = this.form.value.localRegType;
    }
    this.userService.registrationLogin(this.form.value.civilNo.toString(), 'civil', type);
    if (localStorage.getItem('civilReg') && localStorage.getItem('foreign') === 'false') {
      // this.CRNumber =this.form.value.registrationNo;
      this.isOtpShow = true;
      this.showsNextReg = true;
      this.cdr.detectChanges();
    }
  }

  submitType() {
    this.userService.foreignRegistration(this.form.value.registrationType.toString());
  }


  submitReg() {
    // if (this.form.status === 'VALID') {
    this.userService.localRegistration(this.form.value.registrationNo.toString());
    this.spinner.openSpinner();
    let body: any;
    if (localStorage.getItem('regType') === 'individual') {
      body = {
        civil_number: localStorage.getItem('civilReg'),
        cr_number: '',
        register_type: localStorage.getItem('regType')
      };
    } else { 
      body = {
        civil_number: localStorage.getItem('civilReg'),
        cr_number: localStorage.getItem('commercialReg'),
        register_type: localStorage.getItem('regType')
      };
    }
    this.userService.supplierRegistration(body);
    //  }
  }

  back() {
    this.showsNextReg = false;
    localStorage.clear();
  }

  onViewSidebar(val) {
    this.viewSideBar = val;
  }

  onOtpVerify(verify: boolean) {
    this.isOtpShow = !verify;
  }
}
