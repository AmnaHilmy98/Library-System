import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AppService} from '../../app.service';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view-book-list',
  templateUrl: './view-book-list.component.html',
  styleUrls: ['./view-book-list.component.scss']
})
export class ViewBookListComponent implements OnInit {

  @Input() bookList: Array<any>;
  @Input() listLoading?: boolean;
  @Input() showBulkSelect?: boolean;
  @Input() showIcons?: boolean;

  @Input() offset?: number;
  @Input() limit?: number;

  @Output()
  listRefreshEvent = new EventEmitter();


  isSelectAll = false;
  selectedCount = 0;

  constructor(
    private appService: AppService,
    private router: Router
  ) {
  }

  ngOnInit() {
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }

  preventDefault(event: Event) {
    event.preventDefault();
  }

  borrowBook(book: any) {
    swal.mixin({
      confirmButtonText: 'YES',
      cancelButtonText: 'CANCEL',
      showCancelButton: true,
      progressSteps: ['1', '2']
    }).queue([
      {
        title: 'Are you sure?',
        type: 'warning',
        text: 'Borrow item : ' + book.name + '?'
      },
      {
        input: 'text',
        title: 'Enter Reader Name',
        confirmButtonText: 'BORROW',
      }
    ]).then((result) => {
      if (result.value) {
        console.log(result.value);
        this.appService.borrowBook(book.id, result.value[1]).subscribe((res: string) => {
          if (res.trim() === 'success') {
            console.log('borrow success');
            swal('Success', 'Borrowed item: ' + book.name, 'success');
            this.listRefreshEvent.emit(true);
          }
        });
      }
    });
  }

  returnBook(book: any) {
    swal.mixin({
      confirmButtonText: 'YES',
      cancelButtonText: 'CANCEL',
      showCancelButton: true,
      progressSteps: ['1']
    }).queue([
      {
        title: 'Are you sure?',
        type: 'warning',
        text: 'Return item : ' + book.name + '?'
      }
    ]).then((result) => {
      if (result.value) {
        console.log(result.value);
        this.appService.returnBook(book.id).subscribe((res) => {
          if (res.status === 'success') {
            console.log('return success');
            swal('Success', 'Returned item: ' + book.name + ' <br>  Late payments to be Paid: ' + res.amount + ' LKR', 'success');
            this.listRefreshEvent.emit(true);
          }
        });
      }
    });
  }

  getDate(milli: string) {
    // console.log('Got Milli    : ', milli);
    // console.log('Parsed Milli : ', new Date().getTime());
    const date: Date = new Date(milli);
    return date.toLocaleString();
  }

  getAvailability(book: any) {
    const dateNow = new Date();
    const dateLended: Date = new Date(book.lastLended);
    if (book) {
      if (book.category === 'book') {
        const diff = Math.abs(dateNow.getTime() - dateLended.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        return 'Available in ' + (7 - diffDays) + ' days';
      } else {
        const diff = Math.abs(dateNow.getTime() - dateLended.getTime());
        const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

        return 'Available in ' + (3 - diffDays) + ' days';
      }
    }
  }

  deleteBook(book: any) {
    swal.mixin({
      confirmButtonText: 'YES',
      cancelButtonText: 'CANCEL',
      showCancelButton: true,
      progressSteps: ['1']
    }).queue([
      {
        title: 'Are you sure?',
        type: 'warning',
        text: 'Delete item : ' + book.name + '?'
      }
    ]).then((result) => {
      if (result.value) {
        console.log(result.value);
        this.appService.deleteBook(book.id).subscribe((res: string) => {
          if (res === 'success') {
            console.log('return success');
            swal('Success', 'Item Deleted', 'success');
            this.listRefreshEvent.emit(true);
          }
        });
      }
    });
  }

  historyBook(book: any) {
    this.router.navigate(['main/book/history'], {queryParams: {id: book.id, name: book.name}});
  }
}
