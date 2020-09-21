import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalRegistrationComponent } from './local-registration.component';

describe('LocalRegistrationComponent', () => {
  let component: LocalRegistrationComponent;
  let fixture: ComponentFixture<LocalRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
