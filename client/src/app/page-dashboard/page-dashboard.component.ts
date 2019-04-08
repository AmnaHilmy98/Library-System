import {Component, OnInit} from '@angular/core';

declare let $: any;

@Component({
  selector: 'app-page-dashboard',
  templateUrl: './page-dashboard.component.html',
  styleUrls: ['./page-dashboard.component.scss']
})
export class PageDashboardComponent implements OnInit {

  dashboardLoading = false;
  dashboardData: any = {};

  constructor() {
  }

  ngOnInit() {
    this.initSparkline();
  }

  initSparkline() {
    $('.sparkline').each(function () {
      const $this = $(this);
      $this.sparkline('html', $this.data());
    });
  }

}
