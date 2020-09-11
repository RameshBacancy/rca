import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {

  doneRegistered: boolean = false;
  viewSideBar: boolean = false;
  form = new FormGroup({
    firstName: new FormControl('first name', [Validators.required]),
    lastName: new FormControl('last name', [Validators.required]),
    companyName: new FormControl('your company name', [Validators.required]),
    crNo: new FormControl('CR/AU-2020/1086391', [Validators.required]),
    webPage: new FormControl('www.google.com', [Validators.required]),
    crAddress: new FormControl('357, Collins Street, Melbourne ', [Validators.required]),
    companyType: new FormControl('Possible values – Individual, Joint Venture, Trust, Company', [Validators.required]),
    activity: new FormControl('Industrial Manufacturing and Processing Machinery and Accessories', [Validators.required]),
    subActivity: new FormControl('Machinery for working wood and stone and ceramic and the like', [Validators.required]),
    contactPerson: new FormControl('contact person name', [Validators.required]),
    telephone: new FormControl('+964872772112', [Validators.required, Validators.pattern('^[+]?[0-9]*\.?[0-9]+')]),
    email: new FormControl('abcd@bcd.com', [Validators.required, Validators.email]),
  });

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!localStorage.getItem('civilReg') || !localStorage.getItem('newReg')) {
      this.router.navigateByUrl('/auth/supplierRegistration')
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.status === 'VALID') {
      console.log(this.form.value);
      this.doneRegistered = true;
      localStorage.clear();
    }
  }

  back(){
      this.router.navigateByUrl('/auth/supplierRegistration')
    
  }

  onViewSidebar(val) {
    this.viewSideBar = val;
  }

}
