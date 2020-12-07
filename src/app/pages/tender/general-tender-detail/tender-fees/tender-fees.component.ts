import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tender-fees',
  templateUrl: './tender-fees.component.html',
  styleUrls: ['./tender-fees.component.scss']
})
export class TenderFeesComponent implements OnInit {

  constructor( private router: Router ) { }

  ngOnInit(): void {
  }

  proceed(): void {
    localStorage.setItem('documentFees', 'submitted');
    this.router.navigateByUrl('/e-tendering/general-tender-details/tender-documents');
  }
}
