import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentTendersComponent } from './current-tenders.component';

describe('CurrentTendersComponent', () => {
  let component: CurrentTendersComponent;
  let fixture: ComponentFixture<CurrentTendersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentTendersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentTendersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
