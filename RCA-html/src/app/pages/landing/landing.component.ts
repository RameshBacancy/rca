import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

export interface Option {
  id: number;
  name: string;
  checked?: boolean;
}
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  viewSideBar:boolean = false;
  public title: string;
  public currentUrl:string;
  url: string[];

  constructor(
    private router: Router
  ) { }
  
  ngOnInit( ) {
    this.currentUrl = this.router.url;
    this.url = this.currentUrl.split('/');
    this.title = this.url[this.url.length - 1 ];
    if(this.title === 'dashboard'){
      this.title = 'Supplier Portal';
    }
    if(this.title === 'registration'){
      this.title = 'Registration'
    }
  }
  


  onViewSidebar(val){
    this.viewSideBar = val;
  }

}
