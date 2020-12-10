import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tender-addendums',
  templateUrl: './tender-addendums.component.html',
  styleUrls: ['./tender-addendums.component.scss']
})
export class TenderAddendumsComponent implements OnInit {
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

}
