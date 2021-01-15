import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalUpdateComponent } from './renewal-update.component';

describe('RenewalUpdateComponent', () => {
  let component: RenewalUpdateComponent;
  let fixture: ComponentFixture<RenewalUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
