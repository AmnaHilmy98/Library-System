import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSearchBookComponent } from './view-search-book.component';

describe('ViewSearchBookComponent', () => {
  let component: ViewSearchBookComponent;
  let fixture: ComponentFixture<ViewSearchBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSearchBookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSearchBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
