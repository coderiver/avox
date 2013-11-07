$(document).ready(function() {

	//chosen stuff
	var config = {
			'.chosen-select'           : {"disable_search_threshold": 15},
			'.chosen-select-deselect'  : {allow_single_deselect:true},
			'.chosen-select-no-single' : {disable_search_threshold:10},
			'.chosen-select-no-results': {no_results_text:'Oops, nothing found!'},
			'.chosen-select-width'     : {width:"95%"}
		}
		for (var selector in config) {
			$(selector).chosen(config[selector]).change(function(){ $(this).trigger('chosen:updated') });
		}
		function add_new_row() {
			if ($(".js-table-row").length > 0) {
				$(".group__add:not(.group__addnote)").bind("click",function(){
					var wheretoprepend = $(this).parent().parent().find(".table tbody tr:first-child");
					var html = $(this).parent().parent().find(".js-table-row tr").html();
					wheretoprepend.before('<tr>'+html+'</tr>');
					newtr = wheretoprepend.prev();
						newtr.find(".js-select").chosen().change(function(){ $(this).trigger('chosen:updated') });
						newtr.find("select[multiple]").multiselect({
							selectedList: 4,
							noneSelectedText: "Select an Option",
							header: ""
						}).multiselectfilter();
					return false;
				});
			}
		}
		add_new_row();

		$('.table').on('click', '.icon-delete', function(){
			$(this).closest('tr').remove();
		});
		$('.group').on('change', 'h2 input[type=checkbox]', function(){
			$(this).closest('.group').toggleClass('is-inactive-group');

		});


		$(".js-select-multi").multiselect({
				selectedList: 4,
				noneSelectedText: "Select an Option",
				header: "",
   		 	open: function () {$(this).multiselect("widget").find("input[type='search']:first").focus();}
 
		}).multiselectfilter();


		// hiding on blur, needs class, is-shown
		mouseOverActiveElement = false;
		$('.group__addnote').click(function () {
			$(this).children('.addnote').addClass('is-dropped').show();
		});
		//mouseOverActiveElement = false;
		$('body').on('mouseenter', '.is-activeelement', function(){
			mouseOverActiveElement = true; 
		});
		$('body').on('mouseleave', '.is-activeelement', function(){
			mouseOverActiveElement = false; 
		});
		$("html").click(function(){ 
		    if (!mouseOverActiveElement) {
		    	$('.is-dropped').hide();
		        console.log('clicked outside active element');
		    }
		});
		$(".addnote__submit").click(function (e) {
			$('.addnote').hide();
			newtext = $('.addnote').find('textarea').val();
			newhtml = '<tr><td>John Doe</td><td>1970</td><td>'+newtext+'</td><td><a href="#">filename</a></td><td class="td_icon"><div class="icon-delete"></div></td></tr>';
			var wheretoprepend = $('.table tbody tr:first-child');
			wheretoprepend.before(newhtml);
			$('.addnote').hide();
			return false;
		});


		function fixed_filter() {
			var header_height = $(".js-header").outerHeight();
			if ($(window).scrollTop() >= header_height) {
				$("body").addClass("is-fixed-table");
			}
			else {
				$("body").removeClass("is-fixed-table");
			}
		}
		fixed_filter();
		$(window).scroll(function(){
			fixed_filter();
		}); 

		function td_width() {
			$(".trans-body tr").first().find("td").each(function(i){
				var width = $(this).outerWidth();
				$(this).attr("data-class","td-"+i);
				var class_td = $(this).attr("data-class");
				$("."+class_td).css("width", width-6);
			});
		}
		td_width();

		$(window).resize(function(){
			td_width();
		}); 

		$(".trans-body tr").click(function(){
			$(this).toggleClass("is-clicked");
		});

		$(".js-clear-select").click(function(){
			$(this).parent().find(".js-select-multi").multiselect("uncheckAll");
			//alert();
			return false;
		});

});