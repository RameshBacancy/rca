import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderDetailsComponent } from './tender-details.component';

describe('TenderDetailsComponent', () => {
  let component: TenderDetailsComponent;
  let fixture: ComponentFixture<TenderDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
