import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTenderDocumentsComponent } from './general-tender-documents.component';

describe('GeneralTenderDocumentsComponent', () => {
  let component: GeneralTenderDocumentsComponent;
  let fixture: ComponentFixture<GeneralTenderDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTenderDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTenderDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
