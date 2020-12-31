import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InternationalViewComponent } from './international-view.component';

describe('InternationalViewComponent', () => {
  let component: InternationalViewComponent;
  let fixture: ComponentFixture<InternationalViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InternationalViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InternationalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
