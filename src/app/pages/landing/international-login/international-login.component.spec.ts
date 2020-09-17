import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalLoginComponent } from './international-login.component';

describe('InternationalLoginComponent', () => {
  let component: InternationalLoginComponent;
  let fixture: ComponentFixture<InternationalLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
