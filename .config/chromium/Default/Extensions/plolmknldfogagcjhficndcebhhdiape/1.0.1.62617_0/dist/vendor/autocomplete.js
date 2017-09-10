if(window.jQuery && window.jQuery.ui && window.jQuery.ui.autocomplete){
	(function($)
	{
		$("#"+window._tr_ac_se).autocomplete({
			delay: 500,
			minLength:2,
			select: function( e, ui ) {
				var el = $(e.target);
				var sel = $("#"+window._tr_ac_se).val(ui.item.value);
				$("#"+window._tr_ac_se).parents('form:first').submit();
			},
			source: function(request, response) 
			{	
				var xmlHttpRequest;
				var URL="http://ff.search.yahoo.com/gossip?output=fxjson&command={searchTerms}";
				URL=sprintf(URL,{searchTerms:request.term});
				xmlHttpRequest = new XMLHttpRequest();
				xmlHttpRequest.open("GET", URL, true);
				xmlHttpRequest.onreadystatechange = function(){			
					if(xmlHttpRequest.readyState==4){
						if (xmlHttpRequest.status==200){						
							var result = xmlHttpRequest.response ;							
							var suggestions = JSON.parse(result);
							response(suggestions[1]);					
						}
					}
				};
				xmlHttpRequest.send();
			}
		});
		$.ui.autocomplete.prototype._renderItem = function( ul, item) {
			var re = new RegExp(this.term) ;
			var t = item.label.replace(re,"<span style='font-weight:bold;color:#324fe1;'>" + 
									   this.term + 
									   "</span>");
			return $( "<li></li>" )
			.data( "item.autocomplete", item )
			.append( "<a>" + t + "</a>" )
			.appendTo( ul );
		};
	})(jQuery);
}
function sprintf(str,params)
{
	var formatted = str;
	for (var k in params) {
		var v = params[k];
		var regexp = new RegExp('\\{'+(k)+'\\}', 'gi');
		formatted = formatted.replace(regexp, v);
	}
	return formatted;
}