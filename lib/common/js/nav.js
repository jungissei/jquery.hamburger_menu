// ----------------------------------------------------------------------------
// Menu Array
// ----------------------------------------------------------------------------
/**
 * @return {object} Menu array
 */
menu_global_array['modal'] = function(){
  /**
   * @param {string} handle ハンドル名:(※サブメニューにハンドル名は必要なし)
   * @param {string} text リンク文字列
   * @param {string} url リンクURL ※無い場合キーを追加しない
   * @param {bool} target_blank target="_blank"真偽 ※urlキーが無い場合キーを追加しない
   * @param {object} sub_menu サブメニュー配列 ※無い場合キーを追加しない
   */
  return [
    {
      'handle' : 'modal',
      'text' : 'Modal',
      'url' : '/myjQueryUI/jquery.modal/modal/index.html'
    },
    {
      'handle' : 'hamburger_menu_static',
      'text' : 'Hamburger Menu / Static',
      'sub_menu' : [
        {
          'text' : 'Fade in',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/static/fade.html'
        },
        {
          'text' : 'Slide from left',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/static/slide_from_left.html'
        },
        {
          'text' : 'Slide from right',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/static/slide_from_right.html'
        },
        {
          'text' : 'Slide from top',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/static/slide_from_top.html'
        }
      ]
    },
    {
      'handle' : 'hamburger_menu_header_fixed',
      'text' : 'Hamburger Menu / Header fixed',
      'sub_menu' : [
        {
          'text' : 'Fade in',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/header_fixed/fade.html'
        },
        {
          'text' : 'Slide From Left',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/header_fixed/slide_from_left.html'
        },
        {
          'text' : 'Slide From Right',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/header_fixed/slide_from_right.html'
        },
        {
          'text' : 'Slide From Top',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/header_fixed/slide_from_top.html'
        }
      ]
    },
    {
      'handle' : 'hamburger_menu_fixed',
      'text' : 'Hamburger Menu / Fixed',
      'sub_menu' : [
        {
          'text' : 'Fade in',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/fixed/fade.html'
        },
        {
          'text' : 'Slide From Left',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/fixed/slide_from_left.html'
        },
        {
          'text' : 'Slide From Right',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/fixed/slide_from_right.html'
        },
        {
          'text' : 'Slide From Top',
          'url' : '/myjQueryUI/jquery.modal/hamburger_menu/fixed/slide_from_top.html'
        }
      ]
    }
  ];
};
