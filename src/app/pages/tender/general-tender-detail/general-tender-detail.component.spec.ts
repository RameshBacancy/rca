import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralTenderDetailComponent } from './general-tender-detail.component';

describe('GeneralTenderDetailComponent', () => {
  let component: GeneralTenderDetailComponent;
  let fixture: ComponentFixture<GeneralTenderDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralTenderDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralTenderDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
