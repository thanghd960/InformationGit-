chrome.extension.onRequest.addListener(function (request, sender, sendResponse) {
	// Conditionally initialize the options.
	if (!localStorage.isInitialized || localStorage.isFixed == null || localStorage.isFixed == undefined) {
		localStorage.isFixed = false;
	}
	if (!localStorage.isInitialized || localStorage.fontSize == null || localStorage.fontSize == undefined) {
		localStorage.fontSize = '100%';
	}

	if (!localStorage.isInitialized || localStorage.theme == null || localStorage.theme == undefined) {
		localStorage.theme = 'ttcont';
	}
	if (!localStorage.isInitialized || localStorage.limit == null || localStorage.limit == undefined) {
		localStorage.limit = '0';
	}
	if (!localStorage.isInitialized) {
		localStorage.LanguageFrom = '';
		// Auto detect language.
		localStorage.LanguageTo1 = 'en';
		// Translate to English.
		localStorage.LanguageTo2 = 'ar';
		// Translate to arabic by pressing  ALT.
		localStorage.SelectKey = false;
		localStorage.isInitialized = true;
		// The option initialization.
	}

	//Initialize Ctrl and Alt Keys
	var isCtrlKeyRequired = false;
	var isCtrlKeyDown = request.isCtrlKeyPressed;
	var isAltKeyDown = request.isAltKeyPressed;
	var isFixed = localStorage.isFixed;
	var theme = localStorage.theme;
	var fontSize = localStorage.fontSize;
	var textLimit = localStorage.limit;

	//Get Text to Translate Value
	var textToTranslate = request.text_to_translate;

	var numberOfWords = textToTranslate.split(' ').length;
	var txtToTranslateLength = textToTranslate.length;
	if ((textLimit == '0') || (textLimit >= numberOfWords) || (numberOfWords == 1 && txtToTranslateLength <= 25)) {

		//Get From & To Translate Languages.
		var from = localStorage.LanguageFrom;
		var to1 = localStorage.LanguageTo1;
		var to2 = localStorage.LanguageTo2;
		var to = to1;
		//Alt Key is Not Pressed.

		if (isAltKeyDown || isAltKeyDown == 'true') {
			to = to2;
			//Use Second To Translate Language
		}

		isCtrlKeyRequired = JSON.parse(localStorage.SelectKey);

		var text = encodeURIComponent("" + textToTranslate);

		var languageFrom = encodeURIComponent("" + from);
		var languageTo = encodeURIComponent("" + to);

		if (languageFrom == undefined || languageFrom == '' || languageFrom == 'auto') {
			languageFrom = '';
		}

		var myAppId = "D5B352B1E0F490AD5A106B88254CF0F6BE93C52B";
		if (isAltKeyDown || !isCtrlKeyRequired || (isCtrlKeyDown && isCtrlKeyRequired)) {

			window.mycallback = function (response) {
				chrome.tabs.getSelected(null, function (tab) {

					chrome.tabs.sendRequest(tab.id, {
						textResult: response,
						isFixedPopup: isFixed,
						SelectedTheme: theme,
						SelectedFontSize: fontSize,
						SelectedTextLimit: textLimit
					}, function (response) {});
				});
			}

			var xmlhttp;
			if (window.XMLHttpRequest) {
				xmlhttp = new XMLHttpRequest();
			}
			xmlhttp.onreadystatechange = function () {
				if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
					mycallback(JSON.parse(xmlhttp.responseText).sentences[0].trans);
				}
			}

			xmlhttp.open("GET", "https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=" + languageFrom + "&tl=" + languageTo + "&q=" + text, true);
			xmlhttp.send();
		}
	}
});