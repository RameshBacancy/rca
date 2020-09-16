import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public user = {email:"",password:""}
  message: string;
  closeResult: string;

  constructor(
    private _userService: UserService,
    private router: Router,
    private modalService: NgbModal,
    private _alertService: AlertService
  ) { }

  ngOnInit() {
    localStorage.clear();
  }

  login()
  {
    // let token;
    this._userService.login(this.user.email,this.user.password).subscribe( d => {
      if(d.status === 200){
        this._userService.setToken(d.data.token);
        window.localStorage.setItem('LoginToken',''+Math.random());
        this.router.navigateByUrl('/admin/dashboard')
      }
    })
    // if(token === true){
     // this.router.navigateByUrl('/admin')
    // } else{
    //   this.message = "Invalid Login Details";
    // }
  }

  
  forgetPass()
  {
    this._userService.forgetPass(this.user.email).subscribe(d => {
      if(d.status === 200){
        this.router.navigateByUrl('/admin/forgetpassword')
      }
    })
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
