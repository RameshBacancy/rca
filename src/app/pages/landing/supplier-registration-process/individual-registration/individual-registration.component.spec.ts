import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualRegistrationComponent } from './individual-registration.component';

describe('IndividualRegistrationComponent', () => {
  let component: IndividualRegistrationComponent;
  let fixture: ComponentFixture<IndividualRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
