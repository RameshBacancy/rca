import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitTenderBidsComponent } from './submit-tender-bids.component';

describe('SubmitTenderBidsComponent', () => {
  let component: SubmitTenderBidsComponent;
  let fixture: ComponentFixture<SubmitTenderBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitTenderBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitTenderBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
