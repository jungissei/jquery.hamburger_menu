; (function (factory) {
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }

}(function ($) {
  'use strict';

  let HamburgerMenu = {};
  HamburgerMenu = (function () {

    let instance_uid = 0;

    function HamburgerMenu($canvas) {

      let _ = this;

      _.$canvas = $($canvas);
      _.$layout_inner = _.$canvas.find('.layout_inner');
      _.$layout_container = _.$canvas.find('.layout_container');
      _.$layout_width = _.$canvas.find('.layout_width');

      _.$btn = $('[data-hamburger-menu-canvas="#' + _.$canvas.attr('id') + '"]');

      _.instance_uid = instance_uid++;

      _.add_page_loaded();
      _.add_click_event_btn();
      _.add_click_event_layout_inner();
      _.esc_close();
    }

    return HamburgerMenu;
  }());


  HamburgerMenu.prototype.add_page_loaded = function () {
    let _ = this;

    $(window).on('load.hamburger_menu', function () {

      _.$canvas.addClass('is_preloaded');

    });
  }

  HamburgerMenu.prototype.esc_close = function () {
    let _ = this;

    $(window).keyup(function (e) {

      if (e.key === 'Escape') {

        _.hamburger_menu_job['close'].bind(_)();
      }
    });
  }

  HamburgerMenu.prototype.add_click_event_btn = function () {
    let _ = this;

    _.$btn.on('click', function (e) {

      e.preventDefault();

      _.hamburger_menu_job[
        _.$canvas.hasClass('is_opened') ?
          'close' : 'open'
      ].bind(_)(this);

    });
  };


  HamburgerMenu.prototype.add_click_event_layout_inner = function () {
    let _ = this,
      flag = true;

    _.$layout_inner.on('click', function (click_event) {

      if (click_event.target !== click_event.currentTarget ||
        flag == false) return;

      flag = false;
      setTimeout(function () { flag = true; }, 500);

      _.hamburger_menu_job['close'].bind(_)(click_event);

    });
  }

  HamburgerMenu.prototype.hamburger_menu_job = {
    open: function (click_event) {

      let _ = this;

      _.$canvas.trigger('hamburger_menu.before_open', click_event);

      _.handle_scroll();

      $(click_event).addClass('is_clicked');

      _.$btn.attr('aria-expanded', true)
        .not('[data-hamburger-menu-open-state-class="false"]')
        .add(_.$canvas)
        .addClass('is_opened');

      _.$canvas.trigger('hamburger-menu.after_open', click_event);

    },
    close: function (click_event) {

      let _ = this;

      _.$canvas.trigger('hamburger-menu.before_close', click_event);

      _.$btn.attr('aria-expanded', false)
        .not('[data-hamburger-menu-open-state-class="false"]')
        .add(_.$canvas)
        .removeClass('is_opened');

      _.$btn.each(function () {
        if ($(this).hasClass('is_clicked')) {
          $(this)
            .removeClass('is_clicked')
            .focus();
        }
      });

      _.handle_scroll();

      _.$canvas.trigger('hamburger_menu.after_close', click_event);
    }
  }

  HamburgerMenu.prototype.close = function () {

    let _ = this;

    _.hamburger_menu_job['close'].bind(_)();
  }


  HamburgerMenu.prototype.scroll_job = {
    enable: function () {

      let _ = this;

      _.$canvas
        .addClass('is_scrollable');

    },
    disable: function () {

      let _ = this;

      _.$canvas
        .removeClass('is_scrollable');
    }
  }



  HamburgerMenu.prototype.handle_scroll = function () {

    let _ = this,
      layout_container_height = parseInt(_.$layout_container.height()),
      layout_width_height = parseInt(_.$layout_width.height()),
      this_scroll_job = layout_container_height <= layout_width_height ?
        'enable' : 'disable';

    _.scroll_job[this_scroll_job].bind(_)();
  }


  $.fn.hamburger_menu = function () {

    let _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;

    for (i = 0; i < l; i++) {

      if (typeof opt == 'object' || typeof opt == 'undefined') {

        _[i].hamburger_menu = new HamburgerMenu(_[i]);

      } else {

        ret = _[i].hamburger_menu[opt].apply(_[i].hamburger_menu, args);

        if (typeof ret != 'undefined') return ret;
      }
    };

    return _;
  };
}));
