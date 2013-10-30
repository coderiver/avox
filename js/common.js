$(document).ready(function() {

  //chosen stuff
  var config = {
      '.chosen-select'           : {stay_open:true},
      '.chosen-select-deselect'  : {allow_single_deselect:true},
      '.chosen-select-no-single' : {disable_search_threshold:10},
      '.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
      '.chosen-select-width'     : {width:"95%"}
    }
    for (var selector in config) {
      $(selector).chosen(config[selector]);
    }
    function add_new_row() {
      if ($(".js-table-row").length > 0) {
        $(".group__add").bind("click",function(){
          var last_tr = $(this).parent().parent().find(".table tbody tr").last();
          var html = $(this).parent().parent().find(".js-table-row tr").html();
          last_tr.after("<tr>"+html+"</tr>");
          last_tr.next().find(".js-select").chosen();
          return false;
        });
      }
    }
    add_new_row();


    $('.icon-delete').click(function (e) {
      var strconfirm = confirm("Are you sure you want to delete?");
      if (strconfirm == true) {
            $(this).closest('tr').remove();
        }
    });

    $(".js-multi-select").multiselect({
        selectedList: 4,
        noneSelectedText: "Select an Option",
        header: ""
    }).multiselectfilter();


    $('.clearselect').click(function (e) {
     $(this).siblings('select').multiselect("uncheckAll");
    });
});