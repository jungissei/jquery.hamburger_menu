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

  let Modal = {};
  Modal = (function () {

    let instance_uid = 0;

    function Modal($canvas) {

      let _ = this;

      _.$canvas = $($canvas);
      _.$layout_inner = _.$canvas.find('.layout_inner');
      _.$layout_container = _.$canvas.find('.layout_container');
      _.$layout_width = _.$canvas.find('.layout_width');

      _.$btn = $('[data-modal-canvas="#' + _.$canvas.attr('id') + '"]');

      _.instance_uid = instance_uid++;

      _.add_page_loaded();
      _.add_click_event_btn();
      _.add_click_event_layout_inner();
      _.esc_close();
    }

    return Modal;
  }());


  Modal.prototype.add_page_loaded = function () {
    let _ = this;

    $(window).on('load.Modal', function () {

      _.$canvas.addClass('is_preloaded');

    });
  }

  Modal.prototype.esc_close = function () {
    let _ = this;

    $(window).keyup(function (e) {

      if (e.key === 'Escape') {

        _.modal_job['close'].bind(_)();
      }
    });
  }

  Modal.prototype.add_click_event_btn = function () {
    let _ = this;

    _.$btn.on('click', function (e) {

      e.preventDefault();

      _.modal_job[
        _.$canvas.hasClass('is_opened') ?
          'close' : 'open'
      ].bind(_)(this);

    });
  };


  Modal.prototype.add_click_event_layout_inner = function () {
    let _ = this,
      flag = true;

    _.$layout_inner.on('click', function (click_event) {

      if (click_event.target !== click_event.currentTarget ||
        flag == false) return;

      flag = false;
      setTimeout(function () { flag = true; }, 500);

      _.modal_job['close'].bind(_)(click_event);

    });
  }

  Modal.prototype.modal_job = {
    open: function (click_event) {

      let _ = this;

      _.$canvas.trigger('modal.before_open', click_event);

      _.handle_scroll();

      $(click_event).addClass('is_clicked');

      _.$btn.attr('aria-expanded', true)
        .not('[data-modal-open-state-class="false"]')
        .add(_.$canvas)
        .addClass('is_opened');

      _.$canvas.trigger('modal.after_open', click_event);

    },
    close: function (click_event) {

      let _ = this;

      _.$canvas.trigger('modal.before_close', click_event);

      _.$btn.attr('aria-expanded', false)
        .not('[data-modal-open-state-class="false"]')
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

      _.$canvas.trigger('modal.after_close', click_event);
    }
  }

  Modal.prototype.close = function () {

    let _ = this;

    _.modal_job['close'].bind(_)();
  }


  Modal.prototype.scroll_job = {
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



  Modal.prototype.handle_scroll = function () {

    let _ = this,
      layout_container_height = parseInt(_.$layout_container.height()),
      layout_width_height = parseInt(_.$layout_width.height()),
      this_scroll_job = layout_container_height <= layout_width_height ?
        'enable' : 'disable';

    _.scroll_job[this_scroll_job].bind(_)();
  }


  $.fn.modal = function () {

    let _ = this,
      opt = arguments[0],
      args = Array.prototype.slice.call(arguments, 1),
      l = _.length,
      i,
      ret;

    for (i = 0; i < l; i++) {

      if (typeof opt == 'object' || typeof opt == 'undefined') {

        _[i].modal = new Modal(_[i]);

      } else {

        ret = _[i].modal[opt].apply(_[i].modal, args);

        if (typeof ret != 'undefined') return ret;
      }
    };

    return _;
  };
}));
