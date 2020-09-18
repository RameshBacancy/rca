import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-international-login',
  templateUrl: './international-login.component.html',
  styleUrls: ['./international-login.component.scss']
})
export class InternationalLoginComponent implements OnInit {

  public user = {email:"",password:""}

  constructor( private router: Router) { }

  ngOnInit(): void {
  }


  login()
  {
    console.log(this.user);
    localStorage.setItem('completeReg', 'T');
    this.router.navigateByUrl('/landing/supplier-registration/dashboard')
  }
  onViewSidebar(e){
    
  }
}
