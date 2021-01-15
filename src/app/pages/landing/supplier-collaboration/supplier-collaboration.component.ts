import { CollaborationService } from './../../../services/collaboration.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, FormBuilder, AbstractControl } from '@angular/forms';
import { Component, OnInit, TemplateRef, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-supplier-collaboration',
  templateUrl: './supplier-collaboration.component.html',
  styleUrls: ['./supplier-collaboration.component.scss']
})
export class SupplierCollaborationComponent implements OnInit {
  constructor( ) { }

  ngOnInit(): void {
  }

}
