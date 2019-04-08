import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {Constant} from '../../utilities/constant';
import {Router} from '@angular/router';

declare let require: any;
declare let Waves: any;
declare let $: any;

@Component({
  selector: 'app-nav-left',
  templateUrl: './nav-left.component.html',
  styleUrls: ['./nav-left.component.scss']
})
export class NavLeftComponent implements OnInit, AfterViewChecked {
  navigationItems: Array<any>;
  version: string = require('../../../../package.json').version;

  isLoggedIn = false;

  constructor(
    private router: Router
  ) {
      this.navigationItems = [
        {
          id: 0,
          name: 'DASHBOARD',
          routerLink: '/main/dashboard',
          icon: 'home',
          childNodes: []
        },
        {
          id: 1,
          name: 'LIBRARY ITEMS',
          routerLink: '/main/book',
          icon: 'book',
          childNodes: [
            {
              name: 'Add Item',
              routerLink: '/main/book/add',
            }
          ]
        }
      ];
  }

  ngOnInit(): void {
  }

  onResize(event) {
    if (typeof $.fn.slimScroll !== 'undefined') {
      const configs = $.AdminBSB.options.leftSideBar;
      const height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight()));
      const $el = $('.list');
      $('.slimScrollDiv').css('height', height + 'px');
      $el.height(height);

      $el.slimscroll({
        height: height + 'px',
        color: configs.scrollColor,
        size: configs.scrollWidth,
        alwaysVisible: configs.scrollAlwaysVisible,
        borderRadius: configs.scrollBorderRadius,
        railBorderRadius: configs.scrollRailBorderRadius
      });
    }
  }

  ngAfterViewChecked() {
    $.AdminBSB.leftSideBar = {
      activate: function () {
        const jthis = this;
        const $body = $('body');
        const $overlay = $('.overlay');

        // Close sidebar
        $(window).click(function (e) {
          let $target = $(e.target);
          if (e.target.nodeName.toLowerCase() === 'i') {
            $target = $(e.target).parent();
          }

          if (!$target.hasClass('bars') && jthis.isOpen() && $target.parents('#leftsidebar').length === 0) {
            if (!$target.hasClass('js-right-sidebar')) {
              $overlay.fadeOut();
            }
            $body.removeClass('overlay-open');
          }
        });

        $.each($('.menu-toggle.toggled'), function (i, val) {
          $(val).next().slideToggle(0);
        });

        // When page load
        $.each($('.menu .list li.active'), function (i, val) {
          const $activeAnchors = $(val).find('a:eq(0)');

          $activeAnchors.addClass('toggled');
          $activeAnchors.next().show();
        });

        // Collapse or Expand Menu
        $('.menu-toggle').on('click', function (e) {
          const $this = $(this);
          const $content = $this.next();

          if ($($this.parents('ul')[0]).hasClass('list')) {
            const $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

            $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
              if ($(val).is(':visible')) {
                $(val).prev().toggleClass('toggled');
                $(val).slideUp();
              }
            });
          }

          $this.toggleClass('toggled');
          $content.slideToggle(320);
        });

        // Set Waves
        Waves.attach('.menu .list a', ['waves-block']);
        Waves.init();

        // Set menu height
        jthis.setMenuHeight();
        jthis.checkStatusForResize(true);
        $(window).resize(function () {
          jthis.setMenuHeight();
          jthis.checkStatusForResize(false);
        });
      },
      setMenuHeight: function (isFirstTime) {
        if (typeof $.fn.slimScroll !== 'undefined') {
          const configs = $.AdminBSB.options.leftSideBar;
          const height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight()));
          const $el = $('.list');

          $el.slimscroll({
            height: height + 'px',
            color: configs.scrollColor,
            size: configs.scrollWidth,
            alwaysVisible: configs.scrollAlwaysVisible,
            borderRadius: configs.scrollBorderRadius,
            railBorderRadius: configs.scrollRailBorderRadius
          });

          // Scroll active menu item when page load, if option set = true
          if ($.AdminBSB.options.leftSideBar.scrollActiveItemWhenPageLoad) {
            $(document).ready(function () {
              const activeItemOffsetTopElem = $('.menu .list li.active');
              if (activeItemOffsetTopElem.length > 0) {
                const activeItemOffsetTop = activeItemOffsetTopElem[0].offsetTop;
                if (activeItemOffsetTop > 150) {
                  $el.slimscroll({scrollTo: activeItemOffsetTop + 'px'});
                }
              }
            });
          }
        }
      },
      checkStatusForResize: function (firstTime) {
        const $body = $('body');
        const $openCloseBar = $('.navbar .navbar-header .bars');
        const width = $body.width();

        if (firstTime) {
          $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
            $(this).removeClass('no-animate').dequeue();
          });
        }

        if (width < $.AdminBSB.options.leftSideBar.breakpointWidth) {
          $body.addClass('ls-closed');
          $openCloseBar.fadeIn();
        } else {
          $body.removeClass('ls-closed');
          $openCloseBar.fadeOut();
        }
      },
      isOpen: function () {
        return $('body').hasClass('overlay-open');
      }
    };
  }
}
