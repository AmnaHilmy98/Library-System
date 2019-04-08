import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBookHomeComponent } from './page-book-home.component';

describe('PageBookHomeComponent', () => {
  let component: PageBookHomeComponent;
  let fixture: ComponentFixture<PageBookHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageBookHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBookHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
