import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-international-login',
  templateUrl: './international-login.component.html',
  styleUrls: ['./international-login.component.scss']
})
export class InternationalLoginComponent implements OnInit {

  public user = {email:"",password:""}

  constructor() { }

  ngOnInit(): void {
  }


  login()
  {
    console.log(this.user)
  }
  onViewSidebar(e){
    
  }
}
