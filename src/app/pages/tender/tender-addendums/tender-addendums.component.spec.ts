import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderAddendumsComponent } from './tender-addendums.component';

describe('TenderAddendumsComponent', () => {
  let component: TenderAddendumsComponent;
  let fixture: ComponentFixture<TenderAddendumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderAddendumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderAddendumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
