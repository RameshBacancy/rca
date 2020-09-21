import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalRegistrationComponent } from './international-registration.component';

describe('InternationalRegistrationComponent', () => {
  let component: InternationalRegistrationComponent;
  let fixture: ComponentFixture<InternationalRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
