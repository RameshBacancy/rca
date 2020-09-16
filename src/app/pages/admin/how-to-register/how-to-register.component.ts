import { Component, OnInit } from '@angular/core';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-how-to-register',
  templateUrl: './how-to-register.component.html',
  styleUrls: ['./how-to-register.component.scss']
})
export class HowToRegisterComponent implements OnInit {

  title: string;
  editor = ClassicEditor;
  data: any = "";
  description = "";

  constructor() { }

  ngOnInit(): void {
  }

  save(){
    console.log(this.title);
    console.log(this.description);
  }
  cancel(){
    this.title = '',
    this.description = '';
  }
}
