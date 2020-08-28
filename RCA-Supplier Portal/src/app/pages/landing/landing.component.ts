import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
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
  constructor(
  ) { }

  ngOnInit() {
  }

  onViewSidebar(val){
    this.viewSideBar = val;
  }

}
