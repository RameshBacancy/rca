import { Component, OnInit } from '@angular/core';
import ClassicEditor  from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {

  title: string;
  editor = ClassicEditor;
  data: any = "";
  description = "";

  constructor() { }

  ngOnInit(): void {
  }

  save(){
    console.log(this.title);
    console.log(this.description)
  }
  cancel(){
    this.title = '',
    this.description = '';
  }
}
