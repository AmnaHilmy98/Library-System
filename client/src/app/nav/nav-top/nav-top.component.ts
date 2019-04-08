import {Component, OnInit} from '@angular/core';
import {AppService} from '../../app.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {

  notifications: Array<any> = [];

  constructor(private appService: AppService) {
  }

  ngOnInit() {
    this.appService.getNotifications().subscribe(res => {
      this.notifications = res;
    });
  }

  getNotifClass(notification: any) {
    const clazz = {};
    clazz['icon-circle'] = true;

    if (notification.severity === 'info') {
      clazz['bg-blue'] = true;
    }

    if (notification.severity === 'danger') {
      clazz['bg-red'] = true;
    }

    if (notification.severity === 'warning') {
      clazz['bg-orange'] = true;
    }

    if (notification.severity === 'success') {
      clazz['bg-light-green'] = true;
    }

    return clazz;
  }
}
