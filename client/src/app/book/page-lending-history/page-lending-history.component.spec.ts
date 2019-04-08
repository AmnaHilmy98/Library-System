import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageLendingHistoryComponent } from './page-lending-history.component';

describe('PageLendingHistoryComponent', () => {
  let component: PageLendingHistoryComponent;
  let fixture: ComponentFixture<PageLendingHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageLendingHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageLendingHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
