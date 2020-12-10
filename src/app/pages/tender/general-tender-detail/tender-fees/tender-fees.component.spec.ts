import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderFeesComponent } from './tender-fees.component';

describe('TenderFeesComponent', () => {
  let component: TenderFeesComponent;
  let fixture: ComponentFixture<TenderFeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderFeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
