import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-sidebar',
  templateUrl: './landing-sidebar.component.html',
  styleUrls: ['./landing-sidebar.component.scss']
})
export class LandingSidebarComponent implements OnInit {
  constructor() { }
  isSubmenu: boolean;

  arrowimg: string = 'arrow-right-white';
  submenuFun() {
    this.isSubmenu = !this.isSubmenu;
    this.arrowimg = this.arrowimg == 'arrow-down-white' ? 'arrow-right-white' : 'arrow-down-white' ;
  }

  ngOnInit() {
  }

}
