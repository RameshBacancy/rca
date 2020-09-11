import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
 
  constructor(private _UserService : UserService) { }

  ngOnInit(): void {
  }

  changePassword() {
    this._UserService.changePassword();
    console.log("in component");
  }

}
