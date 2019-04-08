import {AfterViewInit, Component, OnDestroy, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {Subscription} from 'rxjs';

declare let jQuery: any;
declare let Waves: any;
declare let $: any;

@Component({
  selector: 'app-page-main',
  templateUrl: './page-main.component.html',
  styleUrls: ['./page-main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PageMainComponent implements AfterViewInit, OnDestroy {

  loading = false;
  routerSub: Subscription;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.routerSub = this.router.events.subscribe((event: RouterEvent) => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loading = true;
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  ngOnDestroy() {
    this.routerSub.unsubscribe();
  }

  ngAfterViewInit() {
    if (typeof jQuery === 'undefined') {
      throw new Error('jQuery plugins need to be before this file');
    }

    $.AdminBSB.options = {
      colors: {
        red: '#F44336',
        pink: '#E91E63',
        purple: '#9C27B0',
        deepPurple: '#673AB7',
        indigo: '#3F51B5',
        blue: '#2196F3',
        lightBlue: '#03A9F4',
        cyan: '#00BCD4',
        teal: '#009688',
        green: '#4CAF50',
        lightGreen: '#8BC34A',
        lime: '#CDDC39',
        yellow: '#ffe821',
        amber: '#FFC107',
        orange: '#FF9800',
        deepOrange: '#FF5722',
        brown: '#795548',
        grey: '#9E9E9E',
        blueGrey: '#607D8B',
        black: '#000000',
        white: '#ffffff'
      },
      leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollAlwaysVisible: false,
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        scrollActiveItemWhenPageLoad: true,
        breakpointWidth: 1170
      },
      dropdownMenu: {
        effectIn: 'fadeIn',
        effectOut: 'fadeOut'
      }
    };

    $.AdminBSB.navbar = {
      activate: function () {
        const $body = $('body');
        const $overlay = $('.overlay');

        // Open left sidebar panel
        $('.bars').on('click', function () {
          $body.toggleClass('overlay-open');
          if ($body.hasClass('overlay-open')) {
            $overlay.fadeIn();
          } else {
            $overlay.fadeOut();
          }
        });

        // Close collapse bar on click event
        $('.nav [data-close="true"]').on('click', function () {
          const isVisible = $('.navbar-toggle').is(':visible');
          const $navbarCollapse = $('.navbar-collapse');

          if (isVisible) {
            $navbarCollapse.slideUp(function () {
              $navbarCollapse.removeClass('in').removeAttr('style');
            });
          }
        });
      }
    };

    $.AdminBSB.input = {
      activate: function () {
        // On focus event
        $('.form-control').focus(function () {
          $(this).parent().addClass('focused');
        });

        // On focusout event
        $('.form-control').focusout(function () {
          const $this = $(this);
          if ($this.parents('.form-group').hasClass('form-float')) {
            if ($this.val() === '') {
              $this.parents('.form-line').removeClass('focused');
            }
          } else {
            $this.parents('.form-line').removeClass('focused');
          }
        });

        // On label click
        $('body').on('click', '.form-float .form-line .form-label', function () {
          $(this).parent().find('input').focus();
        });

        // Not blank form
        $('.form-control').each(function () {
          if ($(this).val() !== '') {
            $(this).parents('.form-line').addClass('focused');
          }
        });
      }
    };

    $.AdminBSB.dropdownMenu = {
      activate: function () {
        const $this = this;

        $('.dropdown, .dropup, .btn-group').on({
          'show.bs.dropdown': function () {
            const dropdown = $this.dropdownEffect(this);
            $this.dropdownEffectStart(dropdown, dropdown.effectIn);
          },
          'shown.bs.dropdown': function () {
            const dropdown = $this.dropdownEffect(this);
            if (dropdown.effectIn && dropdown.effectOut) {
              $this.dropdownEffectEnd(dropdown, function () {
              });
            }
          },
          'hide.bs.dropdown': function (e) {
            const dropdown = $this.dropdownEffect(this);
            if (dropdown.effectOut) {
              e.preventDefault();
              $this.dropdownEffectStart(dropdown, dropdown.effectOut);
              $this.dropdownEffectEnd(dropdown, function () {
                dropdown.dropdown.removeClass('open');
              });
            }
          }
        });

        // Set Waves
        Waves.attach('.dropdown-menu li a', ['waves-block']);
        Waves.init();
      },
      dropdownEffect: function (target) {
        let effectIn = $.AdminBSB.options.dropdownMenu.effectIn, effectOut = $.AdminBSB.options.dropdownMenu.effectOut;
        const dropdown = $(target), dropdownMenu = $('.dropdown-menu', target);

        if (dropdown.length > 0) {
          const udEffectIn = dropdown.data('effect-in');
          const udEffectOut = dropdown.data('effect-out');
          if (udEffectIn !== undefined) {
            effectIn = udEffectIn;
          }
          if (udEffectOut !== undefined) {
            effectOut = udEffectOut;
          }
        }

        return {
          target: target,
          dropdown: dropdown,
          dropdownMenu: dropdownMenu,
          effectIn: effectIn,
          effectOut: effectOut
        };
      },
      dropdownEffectStart: function (data, effectToStart) {
        if (effectToStart) {
          data.dropdown.addClass('dropdown-animating');
          data.dropdownMenu.addClass('animated dropdown-animated');
          data.dropdownMenu.addClass(effectToStart);
        }
      },
      dropdownEffectEnd: function (data, callback) {
        const animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        data.dropdown.one(animationEnd, function () {
          data.dropdown.removeClass('dropdown-animating');
          data.dropdownMenu.removeClass('animated dropdown-animated');
          data.dropdownMenu.removeClass(data.effectIn);
          data.dropdownMenu.removeClass(data.effectOut);

          if (typeof callback === 'function') {
            callback();
          }
        });
      }
    };

    const edge = 'Microsoft Edge';
    const ie10 = 'Internet Explorer 10';
    const ie11 = 'Internet Explorer 11';
    const opera = 'Opera';
    const firefox = 'Mozilla Firefox';
    const chrome = 'Google Chrome';
    const safari = 'Safari';

    $.AdminBSB.browser = {
      activate: function () {
        const $this = this;
        const className = $this.getClassName();

        if (className !== '') {
          $('html').addClass($this.getClassName());
        }
      },
      getBrowser: function () {
        const userAgent = navigator.userAgent.toLowerCase();

        if (/edge/i.test(userAgent)) {
          return edge;
        } else if (/rv:11/i.test(userAgent)) {
          return ie11;
        } else if (/msie 10/i.test(userAgent)) {
          return ie10;
        } else if (/opr/i.test(userAgent)) {
          return opera;
        } else if (/chrome/i.test(userAgent)) {
          return chrome;
        } else if (/firefox/i.test(userAgent)) {
          return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
          return safari;
        }

        return undefined;
      },
      getClassName: function () {
        const browser = this.getBrowser();

        if (browser === edge) {
          return 'edge';
        } else if (browser === ie11) {
          return 'ie11';
        } else if (browser === ie10) {
          return 'ie10';
        } else if (browser === opera) {
          return 'opera';
        } else if (browser === chrome) {
          return 'chrome';
        } else if (browser === firefox) {
          return 'firefox';
        } else if (browser === safari) {
          return 'safari';
        } else {
          return '';
        }
      }
    };

    $(document).ready(function () {
      $.AdminBSB.browser.activate();
      $.AdminBSB.leftSideBar.activate();
      // $.AdminBSB.rightSideBar.activate();
      $.AdminBSB.navbar.activate();
      $.AdminBSB.dropdownMenu.activate();
      $.AdminBSB.input.activate();
    });

    setTimeout(function () {
      $('.page-loader-wrapper').fadeOut();
    }, 50);
  }
}
