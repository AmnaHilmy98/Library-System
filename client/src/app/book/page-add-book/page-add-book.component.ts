import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AppService} from '../../app.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

declare let $: any;

@Component({
  selector: 'app-page-add-book',
  templateUrl: './page-add-book.component.html',
  styleUrls: ['./page-add-book.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageAddBookComponent implements OnInit, OnDestroy {

  bookAddForm: FormGroup;
  public responseWaitingLoader;
  formSub: Subscription;
  itemTypes: Array<any> = [{typeId: 1, typeName: 'BOOK'}, {typeId: 2, typeName: 'DVD'}];
  selectedType = 0;

  constructor(
    private formBuilder: FormBuilder,
    private appService: AppService,
    private router: Router
  ) {
    this.responseWaitingLoader = false;
    this.bookAddForm = this.formBuilder.group({
      // 1st wizard
      itemName: ['', [
        Validators.required
      ]],
      itemType: [0, [
        Validators.required
      ]],
      isbn: ['', []],
      author: ['', []],
      genre: ['', []],
      pages: [0, []]
    });
  }

  ngOnInit() {
    this.formSub = this.bookAddForm.valueChanges.subscribe(value => {
      this.selectedType = this.bookAddForm.get('itemType').value;
      console.log('Selected : ', this.selectedType);
    });
  }

  ngOnDestroy() {
    this.formSub.unsubscribe();
  }

  scrollToTop() {
    window.scroll(0, 0);
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  get itemName() {
    return this.bookAddForm.get('itemName');
  }

  get itemType() {
    return this.bookAddForm.get('itemType');
  }

  addBook() {
    const item = {};
    item['name'] = this.bookAddForm.get('itemName').value;
    item['author'] = this.bookAddForm.get('author').value;
    item['genre'] = this.bookAddForm.get('genre').value;
    item['pages'] = this.bookAddForm.get('pages').value;
    item['isbn'] = this.bookAddForm.get('isbn').value;
    item['category'] = (this.bookAddForm.get('itemType').value === 1) ? 'book' : 'dvd';

    this.appService.addBook(item).subscribe((res: string) => {
      if (res.trim() === 'success') {
        console.log('add success');
        swal('Success', 'Library Item Added', 'success').then(value => {
          this.router.navigate(['/main/book']);
        });

      }
    });
  }

  changeType() {
    console.log('Changed');
    console.log(this.bookAddForm.get('itemType').value);
  }
}
