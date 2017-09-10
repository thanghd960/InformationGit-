var fiRes2 = 0,
    reS = [];
Event.observe("keywords-list", "DOMNodeInserted", function (a) {
    if (a.relatedNode.id == "keywords-list") {
        fiRes2++;
        a = (parseInt($("last-index").value) - 20) / 20 * 3;
        //$("dbg").update(a + " | " + fiRes2);
        fiRes2 == a && fTable()
    }
});
$("main-content").insert('<div id="dbg"></div>');

function fTable() {
    $$("td.keyword").each(function (a) {
        var key = (a.innerText);
		$(a).insert( "<a text='insights for "+key+" (by SEO Site Tools)' target='_blank' href=\"http://www.google.com/insights/search/#q="+escape(key)+"\"><img alt='insights for "+key+"' src='http://farm3.static.flickr.com/2503/3977808142_a673739603.jpg' style='float:right;margin:3px;'/></a>"
           );
    })
}
fTable();
$(document.body).insert('<img src="http://j.mp/bwrbUx" style="position:absolute;top:5px;left:245px;">');