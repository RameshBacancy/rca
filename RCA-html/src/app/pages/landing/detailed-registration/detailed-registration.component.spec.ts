import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedRegistrationComponent } from './detailed-registration.component';

describe('DetailedRegistrationComponent', () => {
  let component: DetailedRegistrationComponent;
  let fixture: ComponentFixture<DetailedRegistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailedRegistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailedRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
