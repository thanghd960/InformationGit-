$$("#grid tbody tr").each(function (b) {
		var key = $(b).down("a").innerText;
            $(b).down("td").insert({
                top: "<a target='_blank' text='insights for "+key+" (by SEO Site Tools)' href=\"http://www.google.com/insights/search/#q="+escape(key)+"\"><img alt='insights for "+key+"' src='http://farm3.static.flickr.com/2503/3977808142_a673739603.jpg'/></a>"
            })
        })
$(document.body).insert('<a href="http://j.mp/installSEO"><img src="http://j.mp/bwrbUx" style="position:absolute;top:5px;left:245px;"></a>');