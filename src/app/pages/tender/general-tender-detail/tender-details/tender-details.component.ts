import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-details',
  templateUrl: './tender-details.component.html',
  styleUrls: ['./tender-details.component.scss']
})
export class TenderDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.removeItem('documentFees');
  }

}
