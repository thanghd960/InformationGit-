$(document).ready(function() {

	var arrHint = new Array();
	arrHint[0] = "Select the language you want to translate from it.";
	arrHint[1] = "Select the language you want to translate to it.";
	arrHint[2] = "Select the language you want to translate to while ALT key released.";
	arrHint[3] = "is CTRL Key Required to show translation popup? <br />if you select this option, translation popup will not appear unless you click CTRL while highlighting the text.";
	arrHint[4] = "Translation popup is following the mouse movement by default, you can stop it by selecting this option, so the mouse popup will be fixed over the highlighted text";
	arrHint[5] = "Limit the number of words you want to translate when you select text, <br /> Ex. If you set this option to '1 word' and you highlighted a paragraph, translation popup will not appear.<br /> you can select unlimited to translate as many words as you select.";
	arrHint[6] = "Increase or decrease the font size for the translation popup.";
	arrHint[7] = "Select your favorite theme, and see the preview below.";

	var arrId = new Array();
	arrId[0] = "#SelectFrom";
	arrId[1] = "#SelectTo1";
	arrId[2] = "#SelectTo2";
	arrId[3] = "#SelectKey";
	arrId[4] = "#isFixed";
	arrId[5] = "#limit";
	arrId[6] = "#fontSize";
	arrId[7] = "#theme";

	$('#hint').hide();
	$(arrId[0]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[0]);
	});

	$(arrId[0]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
	
	$(arrId[1]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[1]);
	});

	$(arrId[1]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
	
	$(arrId[2]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[2]);
	});

	$(arrId[2]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
	
	$(arrId[3]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[3]);
	});

	$(arrId[3]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
	
	$(arrId[4]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[4]);
	});

	$(arrId[4]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
	
	$(arrId[5]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[5]);
	});

	$(arrId[5]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
	
	$(arrId[6]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[6]);
	});

	$(arrId[6]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
	
	$(arrId[7]).mouseover(function() {
		$('#hint').show("fast");
		$('#hint').html(arrHint[7]);
	});

	$(arrId[7]).mouseout(function() {
		$('#hint').hide();
		$('#hint').html('');
	});
});
