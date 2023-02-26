// ----------------------------------------------------------------------------
// Organize Contents Array
// ----------------------------------------------------------------------------
/**
 * Organize content array
 * @param {array} content_items menu
 * @param {array} content_rule handle name array
 * @return organized content array
 */
function organize_contents_array(content_items, content_rule){
  if(content_rule !== void 0){
    let jobs = ['filter_matching_handle', 'sort_content_rule'];

    $.each(jobs, function(index, job){
      content_items = organize_contents_array_job[job](
        content_items,
        content_rule
      );

    });
  }

  return content_items;
}

const organize_contents_array_job = {
  filter_matching_handle : function(content_items, content_rule){

    return content_items.filter(function(menu_item){
      if(content_rule.indexOf(menu_item.handle) !== -1){
        return true;
      }

      return false;
    });
  },
  sort_content_rule : function(content_items, content_rule){

    return content_items.sort(function(a, b){
      let a_key, b_key;

      for (let i = 0; i < content_rule.length; i++) {
        if (content_rule[i] === a.handle) {
          a_key = i;
        }

        if (content_rule[i] === b.handle) {
          b_key = i;
        }
      }

      if(a_key < b_key) return -1;
      if(a_key > b_key) return 1;
      return 0;
    });
  }
};
