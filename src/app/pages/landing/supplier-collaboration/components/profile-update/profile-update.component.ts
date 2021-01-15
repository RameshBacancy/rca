import { FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-update',
  templateUrl: './profile-update.component.html',
  styleUrls: ['./profile-update.component.scss']
})
export class ProfileUpdateComponent implements OnInit {

  profileUpdateForm: FormGroup;
  isProfileUpdate = false;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.loadForm();
  }

  // load profile form
  private loadForm(): void {
    this.profileUpdateForm = this.formBuilder.group({
      bankAccount1: ['ac1236632112'],
      bankAccount2: ['ac9874569874'],
      projects: ['Cms'],
      address1: ['lorem lorem'],
      address2: ['lorem lorem 2'],
      address3: ['lorem lorem 3'],
      email: ['bala.r@gmail.com'],
      phone: [9999999999],
      mobile: [8888888888],
      fax: ['.'],
      keyContactPerson: ['R.B.']
    });
  }

  // get profile form control
  get profileFormControl(): { [key: string]: AbstractControl; } {
    return this.profileUpdateForm.controls;
  }

  //  profile update submit
  public profileUpdateSubmit(): void {
    this.isProfileUpdate = false;
  }

  // profile update click
  updateClick(tab: string) {
    if (tab === 'profile') {
      this.isProfileUpdate = true;
    }
  }
}
