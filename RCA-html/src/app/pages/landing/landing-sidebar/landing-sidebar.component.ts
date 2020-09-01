import { Component, OnInit, Input } from '@angular/core';
import { SidebarService } from '../../../services/sidebar-menu.service';

@Component({
  selector: 'app-landing-sidebar',
  templateUrl: './landing-sidebar.component.html',
  styleUrls: ['./landing-sidebar.component.scss']
})
export class LandingSidebarComponent implements OnInit {

  sidebarItems: any;

  isSubmenu: boolean;
  arrowimg: string = 'arrow-right-white';
  
  constructor(private sidebarData: SidebarService) { }
  
  submenuFun() {
    this.isSubmenu = !this.isSubmenu;
    this.arrowimg = this.arrowimg == 'arrow-down-white' ? 'arrow-right-white' : 'arrow-down-white' ;
    
  }

  ngOnInit() {
    this.sidebarItems = this.sidebarData.getdata();
  }

  arrowClicked(item){
    item.disabled = !item.disabled;
    
  }

}
