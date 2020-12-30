import { UserService } from 'src/app/services/user.service';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {

  doneRegistered = false;
  viewSideBar = false;
  closeResult: string;
  form = new FormGroup({
    firstName: new FormControl('bacancy', []),
    lastName: new FormControl('technology', []),
    companyName: new FormControl('Bacancy', [Validators.required]),
    crNo: new FormControl('CR/AU-2020/1086391', [Validators.required]),
    webPage: new FormControl('https://www.bacancytechnology.com/', []),
    crAddress: new FormControl('Time Squere-I, Thaltej', [Validators.required]),
    companyType: new FormControl('IT company', [Validators.required]),
    activity: new FormControl('Product Engineering, AI & ML, Blockchain, IOT, Digital Transformation', [Validators.required]),
    subActivity: new FormControl('Real Estate, Finance & Insurance, Oil & Gas, Healthcare, Travel & Transport, Startups', []),
    contactPerson: new FormControl('bacancy-hr', [Validators.required]),
    telephone: new FormControl('+964872772112', [Validators.required, Validators.pattern('^[+]?[0-9]*\.?[0-9]+')]),
    email: new FormControl('bacancy@bacancy.com', [Validators.required, Validators.email]),
    country: new FormControl('Oman - OM', [Validators.required])
  });
  filteredOptions: Observable<any[]>;
  options: any[];


  constructor(
    private router: Router,
    private modalService: NgbModal,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('newReg')) {
      this.router.navigateByUrl('/auth/supplier-registration');
    }

    this.userService.getCountryList().subscribe(res => {
      this.options = this.setCountryString(res);
      this.filteredOptions = this.form.get('country').valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    });

  }

  setCountryString(res: any[]) {
    return res.map(country => country.text + ' - ' + country.value);
  }


  private _filter(value: string): any[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) >= 0);
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    const countryString = this.form.value.country;
    const index = this.options.findIndex(country => country === countryString);
    index !== -1 ?
      this.form.get('country').setValue(countryString.split(' - ')[1]) :
      this.form.get('country').setValue('');

    if (this.form.status === 'VALID') {
      this.doneRegistered = true;
      localStorage.clear();
    }
  }

  back() {
    this.router.navigateByUrl('/auth/supplier-registration');

  }

  gotoFirst() {
    this.router.navigateByUrl('/auth/supplier-registration');
  }

  onViewSidebar(val) {
    this.viewSideBar = val;
  }

  open(content, address?) {

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
