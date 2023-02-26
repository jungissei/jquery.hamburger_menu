// ----------------------------------------------------------------------------
// Table Of Content
//
// HamburgerMenu
// Modal
// SmoothScroll
// navi.js
// ----------------------------------------------------------------------------


// ----------------------------------------------------------------------------
// HamburgerMenu
// ----------------------------------------------------------------------------
$(function () {

  // --------------------------------------
  // jQuery.Modal
  // --------------------------------------
  let $canvas = $('#hamburger_menu_canvas');

  $canvas.modal();


  // --------------------------------------
  // When Modal opened & closed
  // --------------------------------------
  $canvas.on('modal.after_open', function () {

    $('body').css('padding-right', window.innerWidth - $(window).width());

    bodyScrollLock.disableBodyScroll(
      document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_container')
    );

  });


  $canvas.on('modal.after_close', function () {
    bodyScrollLock.enableBodyScroll(
      document.querySelector('#' + $(this).attr('id') + ' .layout_inner .layout_container')
    );

    $('body').css('padding-right', '');
  }
  );



  // --------------------------------------
  // When SmoothScroll is working
  // --------------------------------------
  $('a:not([data-smooth-scroll="false"])').on('smooth_scroll.before', function () {

    $canvas.modal('close');
  });


  // --------------------------------------
  // When Accordion Menu is working
  // --------------------------------------
  $canvas.find('.accordion_menu > .menu_item')
    .on('accordion.after_open accordion.after_close', function () {

      $canvas.modal('handle_scroll');
    });


  // --------------------------------------
  // Focus trap
  // --------------------------------------
  $canvas.find('[data-focus-trap-first]').on('focus', function () {

    if ($canvas.hasClass('is_opened')) {
      $($(this).data('focus-trap-first')).eq(0).focus();
    }
  });

  $('#hamburger_menu [data-focus-trap-last]').on('focus', function () {

    if ($canvas.hasClass('is_opened')) {
      $($(this).data('focus-trap-last')).eq(-1).focus();
    }
  });
});



// ----------------------------------------------------------------------------
// Header fixed
// ----------------------------------------------------------------------------
$(function () {

  $template_header = $('#template_header.header_fix'),
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
  let nav_modal = menu_global_array['modal'](),
    nav_git = menu_global_array['git'](),
    contents_array = organize_contents_array(
      nav_modal.concat(nav_git)
    ),
    hamburger_menu_nav_html = get_hamburger_menu_nav_html(
      contents_array,
      'block_menu'
    );

  if (hamburger_menu_nav_html !== '') {
    $('#nav_hamburger_menu')
      .append(hamburger_menu_nav_html)
      .trigger('appended.nav');
  }

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



// ----------------------------------------------------------------------------
// Header Fixed
// ----------------------------------------------------------------------------
$(window).on('scroll', function () {
  $('#template_header.header_fix')
});
