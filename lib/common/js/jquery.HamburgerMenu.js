// ============================================================================
// Table Of Content
//
// 機能関連
//  ハンバーガーメニュー開閉関連
//  フォーカス関連
//    フォーカスループさせる
//    Tabbableな最初の要素にフォーカス
//    開くボタンにフォーカス
// 初期化関連
// イベント関連
//   ページ読み込み時
//   「Escape」キー押下時
//   「Tab」キー押下時
//   [data-hamburger-menu-canvas]属性を持つ要素をクリック時
//   _.$canvas背景要素をターゲットとしてクリック時
// ============================================================================

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
      _.$canvas_tabbable = _.$canvas
        .find('[tabindex], a, button, :input, [contenteditable=true]')
        .not('[tabindex=-1], :disabled, [data-modal-focus-trap-first], [data-modal-focus-trap-last]');
      _.$canvas_focus_trap_first = _.$canvas.find('[data-modal-focus-trap-first]');
      _.$canvas_focus_trap_last = _.$canvas.find('[data-modal-focus-trap-last]');
      _.$btn = $('[data-hamburger-menu-canvas="#' + _.$canvas.attr('id') + '"]');

      _.instance_uid = instance_uid++;

      _.init();
    }

    return HamburgerMenu;
  }());

  // ============================================================================
  // 機能関連
  // ============================================================================
  // ----------------------------------------------------------------------------
  // ハンバーガーメニュー開閉関連
  // ----------------------------------------------------------------------------
  HamburgerMenu.prototype.hamburger_menu_job = {
    open: function ($clicked_opened_btn) {

      let _ = this;

      _.$canvas.trigger('hamburger_menu.before_open', $clicked_opened_btn);

      $clicked_opened_btn.addClass('is_clicked');
      _.$btn.attr('aria-expanded', true);
      _.$canvas.addClass('is_opened');

      _.$canvas.trigger('hamburger-menu.after_open', $clicked_opened_btn);
    },
    close: function () {

      let _ = this;

      _.$canvas.trigger('hamburger-menu.before_close');

      _.$btn.attr('aria-expanded', false);
      _.$canvas.removeClass('is_opened');

      _.$btn.each(function () {
        if ($(this).hasClass('is_clicked')) {
          $(this)
            .removeClass('is_clicked')
            .trigger('focus');
        }
      });

      _.$canvas.trigger('hamburger_menu.after_close');
    }
  }

  /**
   * ハンバーガーメニュー閉じる
   */
  HamburgerMenu.prototype.close = function () {

    let _ = this;

    _.hamburger_menu_job['close'].bind(_)();
  }


  // ----------------------------------------------------------------------------
  // フォーカス関連
  // ----------------------------------------------------------------------------
  /**
   * フォーカスループさせる
   */
  HamburgerMenu.prototype.focus_loop = {
    first: function () {

      let _ = this;

      _.$canvas_tabbable.eq(0).trigger('focus');
    },
    last: function () {

      let _ = this;

      _.$canvas_tabbable.eq(-1).trigger('focus');
    }
  }

  /**
   * Tabbableな最初の要素にフォーカス
   */
  HamburgerMenu.prototype.focus_first = function () {

    let _ = this;

    _.focus_loop['first'].bind(_)();
  }

  /**
   * 開くボタンにフォーカス
   */
  HamburgerMenu.prototype.focus_open_btn = function () {

    let _ = this;

    _.$open_btn.each(function () {

      if ($(this).hasClass('is_open')) {

        $(this).trigger('focus');
      }
    });
  }


  // ============================================================================
  // 初期化関連
  // ============================================================================
  HamburgerMenu.prototype.init = function () {

    let _ = this;

    // イベント関連
    _.add_click_event_btn();
    _.add_canvas_bg_close_event();
    _.press_down_esc();
    _.press_down_tab();
    _.focus_trap_first();
    _.focus_trap_last();
  }

  // ============================================================================
  // イベント関連
  // ============================================================================

  /**
   * 「Escape」キー押下時
   */
  HamburgerMenu.prototype.press_down_esc = function () {
    let _ = this;

    $(window).keyup(function (e) {

      if (e.key === 'Escape') {

        _.hamburger_menu_job['close'].bind(_)();
      }
    });
  }

  /**
   * 「Tab」キー押下時
   */
  HamburgerMenu.prototype.press_down_tab = function () {
    let _ = this;

    $(window).keyup(function (e) {

      if (e.key === 'Tab' &&
        _.$btn.attr('aria-expanded') === 'true' &&
        $(e.target).closest('#' + _.$canvas.attr('id')).length === 0) {

        _.focus_first.bind(_)();
      }
    });
  }

  /**
   * [data-hamburger-menu-canvas]属性を持つ要素をクリック時
   */
  HamburgerMenu.prototype.add_click_event_btn = function () {
    let _ = this;

    _.$btn.on('click', function (e) {

      e.preventDefault();

      _.hamburger_menu_job[
        _.$canvas.hasClass('is_opened') ?
          'close' : 'open'
      ].bind(_)($(e.target));

    });
  };


  /**
   * _.$canvas背景要素をターゲットとしてクリック時
   */
  HamburgerMenu.prototype.add_canvas_bg_close_event = function () {
    let _ = this,
      flag = true,
      btn_aria_controls = _.$btn.attr('aria-controls');


    _.$canvas.on('click', function (e) {

      if (flag === false) return;
      flag = false;
      setTimeout(function () { flag = true; }, 500);

      if ($(e.target).closest('#' + btn_aria_controls).length === 0) {

        _.hamburger_menu_job['close'].bind(_)();
      }
    });
  }

  /**
   * 先頭のフォーカストラップ要素[data-modal-focus-trap-first]にフォーカスされた時
   */
  HamburgerMenu.prototype.focus_trap_first = function () {
    let _ = this;

    _.$canvas_focus_trap_first.on('focus', function () {

      _.focus_loop['last'].bind(_)();
    });
  }

  /**
   * 最後のフォーカストラップ要素[data-modal-focus-trap-last]にフォーカスされた時
   */
  HamburgerMenu.prototype.focus_trap_last = function () {
    let _ = this;

    _.$canvas_focus_trap_last.on('focus', function () {

      _.focus_loop['first'].bind(_)();
    });
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
