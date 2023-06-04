// ----------------------------------------------------------------------------
// Table Of Content
//
// HamburgerMenu
// SmoothScroll
// navi.js
// ----------------------------------------------------------------------------

// ----------------------------------------------------------------------------
// HamburgerMenu
// ----------------------------------------------------------------------------
$(window).on('load', function () {

  // --------------------------------------
  // jQuery.HamburgerMenu.js
  // --------------------------------------
  let $open_btn = $('#hamburger_menu .hamburger_menu_btn'),
    $canvas = $('#hamburger_menu_canvas'),
    $canvas_box = $('#hamburger_menu_canvas_box');

  $canvas.hamburger_menu();


  // --------------------------------------
  // When Modal opened & closed
  // --------------------------------------
  $canvas.on('hamburger-menu.after_open', function () {

    let scroll_width = window.innerWidth - $(window).width();

    $('body').css('padding-right', scroll_width);

    if ($open_btn.css('position') === 'fixed') {
      $open_btn.css('right', parseInt($open_btn.css('right')) + scroll_width);
    }

    bodyScrollLock.disableBodyScroll(
      document.querySelector('#' + $canvas_box.attr('id') + ' .simplebar-content-wrapper')
    );
  });


  $canvas.on('hamburger_menu.after_close', function () {
    bodyScrollLock.enableBodyScroll(
      document.querySelector('#' + $canvas_box.attr('id') + ' .simplebar-content-wrapper')
    );

    $('body').css('padding-right', '');

    if ($open_btn.css('position') === 'fixed') {
      $open_btn.css('right', '');
    }
  }
  );



  // --------------------------------------
  // When SmoothScroll is working
  // --------------------------------------
  $('a:not([data-smooth-scroll="false"])').on('smooth_scroll.before', function () {

    $canvas.hamburger_menu('close');
  });


  // --------------------------------------
  // When Accordion Menu is working
  // --------------------------------------
  $canvas.find('.accordion_menu > .menu_item')
    .on('accordion.after_open accordion.after_close', function () {

      $canvas.modal('handle_scroll');
    });
});



// ----------------------------------------------------------------------------
// Header fixed
// ----------------------------------------------------------------------------
$(function () {

  let $template_header = $('#template_header.header_fix'),
    fix_class = 'is_fixed';

  $(window).on('scroll_page_top', function () {

    if ($template_header.hasClass(fix_class)) {
      $template_header
        .css('height', '')
        .removeClass(fix_class);
    }
  }).on('scroll_page_middle', function () {

    if (!$template_header.hasClass(fix_class)) {

      $template_header
        .css('height', parseInt($template_header.height()))
        .addClass(fix_class);
    }
  });
});




// ----------------------------------------------------------------------------
// SmoothScroll
// ----------------------------------------------------------------------------
$('a:not([data-smooth-scroll="false"])').smoothScroll({
  beforeScroll: function () {

    $('a:not([data-smooth-scroll="false"])').trigger('smooth_scroll.before');
  }
});





// ----------------------------------------------------------------------------
// navi.js
// ----------------------------------------------------------------------------
{
  'use strict';

  $.ajax({
    url: '/jquery.hamburger_menu/url.json',
    type: 'GET',
    dataType: 'json',
  }).done(function (data) {

    let hamburger_menu_nav_html = get_hamburger_menu_nav_html(
      data,
      'block_menu'
    );

    if (hamburger_menu_nav_html !== '') {
      $('#nav_hamburger_menu')
        .append(hamburger_menu_nav_html)
        .trigger('appended.nav');
    }
  });


  function get_hamburger_menu_nav_html(contents_array, ul_class, id = '') {
    let li_html = '',
      html = '',
      accordion_flag = false;

    $.each(contents_array, function (index, item) {
      li_html += get_hamburger_menu_nav_item_html(index, item);

      if (item.sub_menu !== void 0 && item.sub_menu !== []) {
        accordion_flag = true;
      }
    });

    html += '<div';
    if (id !== '') html += ' id="' + id + '"';
    html += ' class="' + ul_class + '"';
    if (accordion_flag) html += ' data-accordion-type="basic"';
    html += '>' + li_html;
    html += '</div>';

    return html;
  }
  function get_hamburger_menu_nav_item_html(index, item) {

    let li_html = '';

    li_html += hamburger_menu_nav_item_html_start_tag(index, item);
    li_html += hamburger_menu_nav_item_html_inner_tag(index, item);
    li_html += hamburger_menu_nav_item_html_close_tag(index, item);

    return li_html;
  }

  function hamburger_menu_nav_item_html_start_tag(index, item) {

    let start_html = '';

    if (item.url === void 0) {
      start_html += '<div class="menu_item item_accordion accordion_plus_minus" data-accordion="item">';
      start_html += '<button class="item_header" data-accordion="trigger" aria-expanded="false" aria-controls="nav_hamburger_menu' + index + '">';
    } else {
      start_html += '<div class="menu_item item_link link_arrow_bar_right">';
      start_html += '<a href="' + item.url + '" class="item_anchor"';

      if (item.target !== void 0 && item.target === true) {
        start_html += ' target="' + item.target + '"';
      }

      start_html += '>';
    }

    return start_html;
  }

  function hamburger_menu_nav_item_html_inner_tag(index, item) {

    return item.url === void 0 ?
      '<span class="header_inner">' + item.text + '</span>' : item.text;
  }

  function hamburger_menu_nav_item_html_close_tag(index, item) {

    let close_html = '';

    close_html = item.url === void 0 ?
      '</button>' : '</a>';


    if (item.sub_menu !== void 0 && item.sub_menu !== []) {

      close_html += '<div id="nav_hamburger_menu' + index + '" class="item_panel" data-accordion="panel" style="display: none">';
      close_html += get_hamburger_menu_nav_html(
        item.sub_menu,
        'sub_menu'
      );
      close_html += '</div>';
    }

    close_html += '</div>';

    return close_html;
  }
};
