import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplierCollaborationComponent } from './supplier-collaboration.component';

describe('SupplierCollaborationComponent', () => {
  let component: SupplierCollaborationComponent;
  let fixture: ComponentFixture<SupplierCollaborationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplierCollaborationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierCollaborationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
