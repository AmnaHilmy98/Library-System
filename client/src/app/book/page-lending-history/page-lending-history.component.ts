import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-lending-history',
  templateUrl: './page-lending-history.component.html',
  styleUrls: ['./page-lending-history.component.scss']
})
export class PageLendingHistoryComponent implements OnInit {
  historyLoading = false;
  activities: Array<any> = [];
  bookName = '';

  constructor(private appService: AppService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['id']) {
        this.fetchLendings(params['id']);
      }

      if (params['name']) {
        this.bookName = params['name'];
      }
    });

  }

  fetchLendings(id: string) {
    this.historyLoading = true;
    this.appService.getLendings(id).subscribe(res => {
      this.historyLoading = false;
      this.activities = res;
    }, error1 => {
      console.error(error1);
      this.historyLoading = false;
    });
  }

  getDate(milli: string) {
    if (!milli) {
      return 'NA';
    }
    // console.log('Got Milli    : ', milli);
    // console.log('Parsed Milli : ', new Date().getTime());
    const date: Date = new Date(milli);
    return date.toLocaleString();
  }
}
