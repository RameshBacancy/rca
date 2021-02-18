import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderAddendumsListComponent } from './tender-addendums-list.component';

describe('TenderAddendumsListComponent', () => {
  let component: TenderAddendumsListComponent;
  let fixture: ComponentFixture<TenderAddendumsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenderAddendumsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderAddendumsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
