import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOfQueriesComponent } from './registration-of-queries.component';

describe('RegistrationOfQueriesComponent', () => {
  let component: RegistrationOfQueriesComponent;
  let fixture: ComponentFixture<RegistrationOfQueriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistrationOfQueriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationOfQueriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
