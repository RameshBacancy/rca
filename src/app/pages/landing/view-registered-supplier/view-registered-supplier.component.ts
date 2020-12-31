import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-registered-supplier',
  templateUrl: './view-registered-supplier.component.html',
  styleUrls: ['./view-registered-supplier.component.scss']
})
export class ViewRegisteredSupplierComponent implements OnInit {
  supplierType: string;
  constructor() { }

  ngOnInit(): void {
    this.supplierType = localStorage.getItem('regType');
  }

}
