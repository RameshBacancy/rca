import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-submit-tender-bids',
  templateUrl: './submit-tender-bids.component.html',
  styleUrls: ['./submit-tender-bids.component.scss']
})
export class SubmitTenderBidsComponent implements OnInit {

  selected = new FormControl(0);

  constructor() { }

  ngOnInit(): void {
  }


  changeTab() {
    this.selected.setValue(this.selected.value + 1);
  }
  previousTab() {
    this.selected.setValue(this.selected.value - 1);
  }
  newStep() {
    this.selected.setValue(0);
  }
  preStep(num) {
    this.selected.setValue(num);
  }
}
