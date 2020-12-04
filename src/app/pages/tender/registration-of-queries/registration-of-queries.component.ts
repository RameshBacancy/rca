import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-of-queries',
  templateUrl: './registration-of-queries.component.html',
  styleUrls: ['./registration-of-queries.component.scss']
})
export class RegistrationOfQueriesComponent implements OnInit {
  selected = new FormControl(0);
  constructor() { }

  ngOnInit(): void {
  }

}
