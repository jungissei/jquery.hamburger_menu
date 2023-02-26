// ----------------------------------------------------------------------------
// Accordion Menu
// ----------------------------------------------------------------------------
$(function(){

  let flag = true,
      open_state_class = 'is_opened',
      $accordion_menu = $('.accordion_menu');

  $accordion_menu.find('.sub_menu').hide();

  $accordion_menu
    .children('.menu_item')
    .children('span.item_inner')
    .on('click.accordion_menu', function(){

      if(flag == false) return;
      flag = false;
      setTimeout(function(){ flag = true; }, 500);

      let $clicked_item = $(this).closest('.menu_item')

      accordion_menu[
        $clicked_item.hasClass(open_state_class)?
          'close' : 'open'
      ].bind()($clicked_item);
  });


  // --------------------------------------
  // Open Close Job
  // --------------------------------------
  accordion_menu = {
    open : function($clicked_item){

      $clicked_item
        .closest('.menu_item')
        .trigger('accordion.before_open')
        .addClass(open_state_class)
              .find('.sub_menu').slideDown(300, function(){

                $clicked_item.trigger('accordion.after_open');
      });
    }, close: function($clicked_item){

      $clicked_item
        .trigger('accordion.before_close')
        .removeClass(open_state_class)
              .find('.sub_menu').slideUp(300, function(){

                $clicked_item.trigger('accordion.after_close');
      });
    }
  };
});
