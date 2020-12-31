import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegisteredSupplierComponent } from './view-registered-supplier.component';

describe('ViewRegisteredSupplierComponent', () => {
  let component: ViewRegisteredSupplierComponent;
  let fixture: ComponentFixture<ViewRegisteredSupplierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewRegisteredSupplierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRegisteredSupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
