import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public user = {email:"",password:""}
  message: string;

  constructor(
    private _userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  login()
  {
    let token;
    token = this._userService.login(this.user.email,this.user.password);
    if(token === true){
      this.router.navigateByUrl('/admin')
    } else{
      this.message = "Invalid Login Details";
    }
  }

  forgetPass(){
    this.router.navigate(['/admin/user/forgetpassword'])
  }

}
