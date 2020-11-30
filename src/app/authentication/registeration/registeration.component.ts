import { Component, OnInit } from '@angular/core';
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
  });

  constructor(
    private router: Router,
    private modalService: NgbModal,
    ) { }

  ngOnInit(): void {
    if (!localStorage.getItem('newReg')) {
      this.router.navigateByUrl('/auth/supplierRegistration');
    }
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    if (this.form.status === 'VALID') {
      // console.log(this.form.value);
      this.doneRegistered = true;
      localStorage.clear();
    }
  }

  back() {
      this.router.navigateByUrl('/auth/supplierRegistration');

  }

  gotoFirst() {
    this.router.navigateByUrl('/auth/supplierRegistration');
  }

  onViewSidebar(val) {
    this.viewSideBar = val;
  }

  open(content, address?) {

    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {

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
      return  `with: ${reason}`;
    }
  }

}
