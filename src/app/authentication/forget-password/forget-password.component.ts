import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  public user = {email:""}

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  forgetpass()
  {
    this._userService.forgetPass(this.user.email);
  }

  reset(){
    this.router.navigate(['/admin'])
  }

 

}
