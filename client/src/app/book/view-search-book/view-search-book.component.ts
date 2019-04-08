import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {SavedStatus} from '../../utilities/saved-status';

@Component({
  selector: 'app-view-search-book',
  templateUrl: './view-search-book.component.html',
  styleUrls: ['./view-search-book.component.scss']
})
export class ViewSearchBookComponent implements OnInit {

  // public searchBookForm;
  public searchLoading = false;

  // categoryList: Array<Category> = [];
  industryList: Array<any> = [];
  selectedIndustry = '-1';

  @Output()
  searchEvent = new EventEmitter();

  @Input() showAvailable: boolean;
  @Input() showBorrowed: boolean;

  availableSelected: boolean;
  borrowedSelected: boolean;

  itemId = '';
  itemName = '';

  searchInitializing = false;

  constructor(
    private formBulder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.availableSelected = this.showAvailable;
    this.borrowedSelected = this.showBorrowed;
  }

  // Search companies submit function
  searchCompanies() {
    const bookFilter: any = this.fillDetails();
    this.searchEvent.emit(bookFilter);
  }

  checkInputExist(s): boolean {
    return (null != s && s.length > 0);
  }

  // Search form data swagger model
  fillDetails() {
    const bookFilter: any = {};

    // itemId
    const itemId = this.itemId;
    if (this.checkInputExist(itemId)) {
      bookFilter.itemId = itemId;
    } else {
      bookFilter.itemId = null;
    }

    // itemName
    const itemName = this.itemName;
    if (this.checkInputExist(itemName)) {
      bookFilter.itemName = itemName;
    } else {
      bookFilter.itemName = null;
    }

    return bookFilter;
  }
}
