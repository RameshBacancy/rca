import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpgradePaymentComponent } from './upgrade-payment.component';

describe('UpgradePaymentComponent', () => {
  let component: UpgradePaymentComponent;
  let fixture: ComponentFixture<UpgradePaymentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpgradePaymentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpgradePaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
