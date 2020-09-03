import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierRegistrationProcessComponent } from './supplier-registration-process.component';

describe('SupplierRegistrationProcessComponent', () => {
  let component: SupplierRegistrationProcessComponent;
  let fixture: ComponentFixture<SupplierRegistrationProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierRegistrationProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierRegistrationProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
