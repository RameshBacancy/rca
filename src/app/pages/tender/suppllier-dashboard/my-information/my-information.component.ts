import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-information',
  templateUrl: './my-information.component.html',
  styleUrls: ['./my-information.component.scss']
})
export class MyInformationComponent implements OnInit {
  infoData: any = {};
  isEdit = false;
  constructor() { }

  ngOnInit(): void {
    this.infoData = {
      supplierName: 'R Bala',
      rcaRegisterNumber: 113377880,
      userName: 'rbala1234',
      mobileNumber: 9999999999,
      email: 'rbala@gmail.com',
      registrationValidity: '30-12-2021',
      lastLoginDate: '15-12-20',
      grade: 'Lorem ipsum',
      status: 'Active'
    };
  }

  public isEditClick(): void {
    this.isEdit = !this.isEdit;
  }


}
