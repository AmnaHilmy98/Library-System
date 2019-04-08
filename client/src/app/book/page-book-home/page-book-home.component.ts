import {Component, EventEmitter, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-page-book-home',
  templateUrl: './page-book-home.component.html',
  styleUrls: ['./page-book-home.component.scss']
})
export class PageBookHomeComponent implements OnInit {

  offset = 0;
  limit = 10;
  page = 1;
  listLoading = false;
  bookList: Array<any>;
  searchEvent;

  constructor(
    private router: Router,
    private appService: AppService
  ) {
    this.searchEvent = new EventEmitter();
  }

  ngOnInit() {
    this.listLoading = true;
    this.appService.getBooks().subscribe(res => {
      this.bookList = res;
      this.listLoading = false;
    }, error1 => {
      console.error(error1);
      this.listLoading = false;
    });
  }

  viewBook(bookId: string) {
    this.router.navigate(['main/book/view'], {queryParams: {bookId: bookId}, queryParamsHandling: 'merge'});
  }

  changePaginate(count: number) {

  }

  searchBook(event: any) {
    this.listLoading = true;
    this.appService.searchBooks(event).subscribe(res => {
      this.bookList = res;
      this.listLoading = false;
    }, error1 => {
      console.error(error1);
      this.listLoading = false;
    });
  }

  refreshList(event: any) {
    this.listLoading = true;
    this.appService.getBooks().subscribe(res => {
      this.bookList = res;
      this.listLoading = false;
    }, error1 => {
      console.error(error1);
      this.listLoading = false;
    });
  }
}
