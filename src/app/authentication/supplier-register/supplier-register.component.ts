import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-register',
  templateUrl: './supplier-register.component.html',
  styleUrls: ['./supplier-register.component.scss']
})
export class SupplierRegisterComponent implements OnInit {

  supplierSelection: boolean = false;
  showsidebar:boolean = false;
  viewSideBar:boolean = false;

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  goto(){
    this.router.navigate(['/landing/supplier-registration/dashboard']);
  }

  back(){
    this.showsidebar = true;
  }
  onViewSidebar(val){
    this.viewSideBar = val;
  }
}
