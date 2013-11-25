$(document).ready(function() {

	$(document).click(function() {
        $(".js-tooltip").hide();
        $(".js-calendar").removeClass("is-active");
        $(".js-date-input").parent().removeClass("is-active");
        //$(".js-expand").hide();
    });

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
					var html = $(this).parent().parent().find(".js-table-row tr").html();
					if ($(this).parent().parent().find(".js-table-simple tbody tr").length > 0) {
						var wheretoprepend = $(this).parent().parent().find(".js-table-simple tbody tr:first-child");
						wheretoprepend.before('<tr>'+html+'</tr>');
						console.log("yes-tr");
						newtr = wheretoprepend.prev();
					}
					else {
						var wheretoprepend = $(this).parent().parent().find(".js-table-simple tbody");
						$('<tr>'+html+'</tr>').prependTo(wheretoprepend);
						console.log("no-tr");
						newtr = wheretoprepend.find("tr:first");
					}
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

		$('.js-table-simple').on('click', '.icon-delete', function(){
			$(this).closest('tr').remove();
		});
		$('.js-remove-tr').on('click', function(){
			$(this).closest('tr').remove();
		});
		$('.group').on('change', 'h2 input[type=checkbox]', function(){
			$(this).closest('.group').toggleClass('is-inactive-group');

		});


		$(".js-select-multi").multiselect({
				selectedList: 7,
				noneSelectedText: "",
				header: "",
   		 		open: function () {
   		 			$(this).multiselect("widget").find("input[type='search']:first").focus();
   		 		},
   		 		close: function () {
   		 			$(this).multiselect("widget").find("input[type='search']:first").val("");
   		 			$(this).multiselect("widget").find(".ui-multiselect-checkboxes li").removeAttr("style");
   		 		}
 
		}).multiselectfilter();
		$(".js-select-multi.is-placeholder").each(function () {
			var placeholder = $(this).attr("data-placeholder");
			$(this).multiselect({
				selectedList: 7,
				noneSelectedText: placeholder,
				header: "",
		 		open: function () {
		 			$(this).multiselect("widget").find("input[type='search']:first").focus();
		 		},
		 		close: function () {
		 			$(this).multiselect("widget").find("input[type='search']:first").val("");
		 			$(this).multiselect("widget").find(".ui-multiselect-checkboxes li").removeAttr("style");
		 		}
			}).multiselectfilter();
		})

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
		        //console.log('clicked outside active element');
		    }
		});
		$(".addnote__submit").click(function (e) {
			$('.addnote').hide();
			newtext = $('.addnote').find('textarea').val();
			newhtml = '<tr><td>John Doe</td><td>1970</td><td>'+newtext+'</td><td><a href="#">filename</a></td><td class="td_icon"><div class="icon-delete"></div></td></tr>';
			if ($(".js-table-simple tbody tr").length > 0) {
				var wheretoprepend = $('.js-table-simple tbody tr:first-child');
				wheretoprepend.before(newhtml);
			}
			else {
				var wheretoprepend = $('.js-table-simple tbody');
				wheretoprepend.before();
				$(newhtml).prependTo(wheretoprepend);
			}
			
			$('.addnote').hide();
			return false;
		});


		function fixed_filter() {
			if ($(".js-header").length > 0) {
				var header_height = $(".js-header").outerHeight();
				if ($(window).scrollTop() >= header_height) {
					$("body").addClass("is-fixed-table");
				}
				else {
					$("body").removeClass("is-fixed-table");
				}

			}
			else {
				var filter_pos = $(".js-filter").offset().top;
				if ($(window).scrollTop() >= filter_pos) {
					$("body").addClass("is-fixed-table");
				}
				else {
					$("body").removeClass("is-fixed-table");
				}
				console.log($(window).scrollTop());
				console.log(filter_pos);
			}
			
		}
		if ($(".js-filter").length > 0 ) {
			fixed_filter();
		}
		
		$(window).scroll(function(){
			if ($(".js-filter").length > 0 ) {
			fixed_filter();
		}
		}); 

		function td_width() {
			$(".js-table tr").first().find("td").each(function(i){
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

		$(".js-table tr").click(function(){
			$(this).toggleClass("is-clicked");
		});

		$(".js-clear-select").click(function(){
			$(this).parent().find(".js-select-multi").multiselect("uncheckAll");
			return false;
		});

	var tooltip = $(".js-tooltip");
	tooltip.click(function(event){
		event.stopPropagation();
	});
	function tooltipShow() {
		$(".js-show-tooltip").bind("click", function(event){
			var top = $(this).offset().top;
			var left = $(this).offset().left;
			tooltip.css({
				"left": left-12,
				"top": top+37
			});
			tooltip.show();
			event.stopPropagation();
		});
	}
	if ($(".js-show-tooltip").length > 0) {
		tooltipShow();
	}
	
	$(window).scroll(function(){
		if ($(".js-show-tooltip").length > 0) {
			var top = $(".js-show-tooltip").offset().top;
			var left = $(".js-show-tooltip").offset().left;
			tooltip.css({
				"left": left-12,
				"top": top+37
			});
		}
		
	});


	$(".js-show-expand").bind("click",function(){
		$(".js-expand").toggle();
		return false;
	});
	// $(".js-expand").click(function(event){
	// 	event.stopPropagation();
	// })

	// $(".js-reset-filter").bind("click", function(){
	// 	$(this).parents(".js-filter").find(".js-select-multi").multiselect("uncheckAll");
	// 	$(this).parents(".js-filter").find(".js-search-input").val("");
	// 	//alert();
	// 	return false;
	// });


	function openWindow() {
		$(".js-open-window").click(function(){
			var window_url = $(this).attr("data-window-url")
			var window_height = $(this).attr("data-window-height");
			var window_width = $(this).attr("data-window-width");
			myWindow=window.open(window_url,'','width='+window_width+',height='+window_height+'')
	    	myWindow.focus();	
		});
	}
		openWindow();

	$(function() {
	    $( ".js-slider-time" ).slider({
	      value: 600,
	      min: 0,
	      max: 1440,
	      step: 15,
	      slide: function( event, ui ) {
	      	var hours = Math.floor(ui.value/60);
	      	var minutes = Math.floor(ui.value%60);
	      	$(".js-slider-time .ui-slider-handle" ).html("<span></span>");
	      	if (hours <= 9 && minutes <= 9) {
	      		$( ".js-slider-time .ui-slider-handle span" ).text("0"+hours+':'+"0"+minutes);
	      		$( ".is-active .js-time" ).text("0"+hours+':'+"0"+minutes);
	      	}
	      	else {
	      		$( ".js-slider-time .ui-slider-handle span" ).text(hours+':'+minutes);
	      		$( ".is-active .js-time" ).text(hours+':'+minutes);
	      	}
	      	if (hours == 24 ) {
	      		$( ".js-slider-time .ui-slider-handle span" ).text('23:59');
	      		$( ".js-time" ).text('23:59');
	      	}
	      	$( ".is-active .js-time" ).val(ui.value);
	      }
	    });
	    var date = new Date();
		var hours = date.getHours();
		var minutes = date.getMinutes();
      	$(".js-slider-time .ui-slider-handle" ).html("<span></span>");
	    $( ".js-slider-time .ui-slider-handle span" ).text(hours+':'+minutes);
	    $( ".is-active .js-time" ).val($( ".js-slider-time" ).slider( "value" ));
	    //$( ".js-time" ).text($( ".js-slider-time" ).slider( "value" ));
  	});
  	$(function() {
	    $( ".js-slider-zone" ).slider({
	      value: 3,
	      min: -12,
	      max: 14,
	      step: 1,
	      slide: function( event, ui ) {
	      	if (ui.value > 0) {
	      		$( ".js-slider-zone .ui-slider-handle").html("<span></span>");
	      		$( ".js-slider-zone .ui-slider-handle span").text('+'+ui.value);
	      		$( ".is-active .js-zone" ).text('+'+ui.value);
	      	}
	      	else {
	      		$( ".js-slider-zone .ui-slider-handle").html("<span></span>");
	      		$( ".js-slider-zone .ui-slider-handle span").text(ui.value);
	      		$( ".is-active .js-zone" ).text(ui.value);
	      	}
	      	if (ui.value == 0) {
	      		$( ".js-slider-zone .ui-slider-handle").html("<span></span>");
	      		$( ".js-slider-zone .ui-slider-handle span").text('UTC');
	      	} 
	        $( ".is-active .js-zone" ).val(ui.value);
	        
	    }
	    });
	    var date = new Date();
		var zone_offset = date.getTimezoneOffset()/60;
		// if (zone_offset > 0) {
		// 	var zone = zone_offset;
		// }
		// else {
		// 	var zone = -zone_offset;
		// }
	    if ($(".js-slider-zone").slider("value") > 0) {
      		$(".js-slider-zone .ui-slider-handle" ).html("<span></span>");
      		$(".js-slider-zone .ui-slider-handle span" ).text("+"+-zone_offset);
      	}
      	else {
      		$(".js-slider-zone .ui-slider-handle" ).html("<span></span>");
      		$(".js-slider-zone .ui-slider-handle span" ).text(zone_offset);
      	}
      	$(".is-active .js-zone" ).val($( ".js-slider-zone" ).slider( "value" ));
      	//$( ".js-zone" ).text($( ".js-slider-zone" ).slider( "value" ));
	    
  	});

	// $(".js-calendar li").bind("click",function(){
	// 	$(this).parent().find("li").removeClass("is-active");
	// 	$(this).addClass("is-active");
	// 	var el = $(this).parent().attr("data-class");
	// 	var id = $(this).text();
	// 	$("."+el).val(id);
	// });
	function calendar() {
		$(".js-calendar li").bind("click",function(){
			$(this).parent().find("li").removeClass("is-active");
			$(this).addClass("is-active");
			var el = $(this).parent().attr("data-class");
			var id = $(this).text();
			var text = $(this).text();
			$(".is-active").find("."+el).val(id);
			$(".is-active").find("."+el).text(text);

			var text_input = $(".is-active .js-input-text").text();
			$(".is-active .js-date-input").val(text_input);

		});

		$(".js-ok").click(function(){
			var text = $(".is-active .js-input-text").text();
			$(".is-active .js-date-input").val(text);
			$(".js-date-input").parent().removeClass("is-active");
			$(".js-calendar").removeClass("is-active");
			return false;
		});

		$(".calendar__months li").bind("click", function(){
			var id = $(this).attr("data-id");
			var text = $(this).text();
			var el = $(this).parent().attr("data-class");
			$(".is-active").find("."+el).val(id);
			$(".is-active").find("."+el).text(text);
		});	
		var date = new Date();
		var year = date.getFullYear();
		var month_int = (date.getMonth() + 1).toString();
		var day = date.getDate();
		var hours = date.getHours();
		var minutes = date.getMinutes();
		var zone_offset = date.getTimezoneOffset()/60;
		if (zone_offset > 0) {
			var zone = zone_offset;
		}
		else {
			var zone = -zone_offset;
		}
		
		// set current date
		$(".calendar__days li").each(function(){
			if ($(this).text() == day) {
				$(".calendar__days li").removeClass("is-active");
				$(this).addClass("is-active");
			}
		});
		$(".calendar__months li").each(function(){
			if ($(this).attr("data-id") == date.getMonth()) {
				$(".calendar__months li").removeClass("is-active");
				$(this).addClass("is-active");
			}
		});
		$(".calendar__years li").each(function(){
			if ($(this).text() == year) {
				$(".calendar__years li").removeClass("is-active");
				$(this).addClass("is-active");
			}
		});

		var month = new Array(12);
		month[0] = "Jan";
		month[1] = "Feb";
		month[2] = "Mar";
		month[3] = "Apr";
		month[4] = "May";
		month[5] = "Jun";
		month[6] = "Jul";
		month[7] = "Aug";
		month[8] = "Sep";
		month[9] = "Oct";
		month[10] = "Nov";
		month[11] = "Dec";

		// write date in string format
		$(".js-calendar .js-year").text(year);
		$(".js-calendar .js-month").text(month[date.getMonth()]);
		$(".js-calendar .js-date").text(day);
		$(".js-calendar .js-time").text(hours+":"+minutes);
		$(".js-calendar .js-zone").text(zone);

		$(".js-calendar .js-year").val(year);
		$(".js-calendar .js-month").val(month);
		$(".js-calendar .js-date").val(day);
		$(".js-calendar .js-time").val(hours+":"+minutes);
		$(".js-calendar .js-zone").val(zone);		


	}
	calendar();
	$(".js-date-input").click(function(event){
		$(".js-date-input").parent().removeClass("is-active");
		$(this).parent().addClass("is-active");
		$(".js-calendar").addClass("is-active");
		event.stopPropagation();
	});
	$(".js-calendar").click(function(event) {
		event.stopPropagation();
	});

	$(".js-attach").hide();
	function check_radio() {
		if ($('.js-radio-attach').is(":checked")) {
			$(".js-attach").show();
		}
		else {
			$(".js-attach").hide();
		}
	}
	$(".js-radio-group input[type='radio']").on("change",function(){
		check_radio();
	});
	check_radio();
});

