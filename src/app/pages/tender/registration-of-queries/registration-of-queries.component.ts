import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-of-queries',
  templateUrl: './registration-of-queries.component.html',
  styleUrls: ['./registration-of-queries.component.scss']
})
export class RegistrationOfQueriesComponent implements OnInit {
  selected = new FormControl(0);
  weekList: string[];
  constructor() { }

  ngOnInit(): void {
    this.weekList = [
      'Week 1',
      'Week 2',
      'Week 3',
      'Week 4'
    ];
  }

  changeTab() {
    this.selected.setValue(this.selected.value + 1);
  }
  previousTab() {
    this.selected.setValue(this.selected.value - 1);
  }
}
