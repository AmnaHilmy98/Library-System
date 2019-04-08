import {AfterViewInit, Component} from '@angular/core';
declare let $: any;

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss']
})
export class NavRightComponent implements AfterViewInit {

  constructor() { }

  ngAfterViewInit() {
    // $.AdminBSB.rightSideBar = {
    //   activate: function () {
    //     const _this = this;
    //     const $sidebar = $('#rightsidebar');
    //     const $overlay = $('.overlay');
    //
    //     // Close sidebar
    //     $(window).click(function (e) {
    //       let $target = $(e.target);
    //       if (e.target.nodeName.toLowerCase() === 'i') {
    //         $target = $(e.target).parent();
    //       }
    //
    //       if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
    //         if (!$target.hasClass('bars')) {
    //           $overlay.fadeOut();
    //         }
    //         $sidebar.removeClass('open');
    //       }
    //     });
    //
    //     $('.js-right-sidebar').on('click', function () {
    //       $sidebar.toggleClass('open');
    //       if (_this.isOpen()) {
    //         $overlay.fadeIn();
    //       } else {
    //         $overlay.fadeOut();
    //       }
    //     });
    //   },
    //   isOpen: function () {
    //     return $('.right-sidebar').hasClass('open');
    //   }
    // };
  }

}
