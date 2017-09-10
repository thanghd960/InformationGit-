window.onload = function() {

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

				// Initialize the option controls.
				if (!localStorage.isInitialized || localStorage.LanguageTo1 == null || localStorage.LanguageTo1 == undefined) {
					localStorage.LanguageFrom = '';
					// The display activation.
					localStorage.LanguageTo1 = 'en';
					// The display frequency, in minutes.
					localStorage.LanguageTo2 = 'ar';
					// The display frequency, in minutes.
					localStorage.SelectKey = false;
					localStorage.isInitialized = true;
					// The option initialization.
				}

				options.SelectFrom.value = localStorage.LanguageFrom;
				options.SelectTo1.value = localStorage.LanguageTo1;
				options.SelectTo2.value = localStorage.LanguageTo2;
				options.theme.value = localStorage.theme;
				options.limit.value = localStorage.limit;
				options.SelectKey.checked = JSON.parse(localStorage.SelectKey);
				options.isFixed.checked = JSON.parse(localStorage.isFixed);
				options.fontSize.value = localStorage.fontSize;

				options.SelectFrom.onchange = function() {
					localStorage.LanguageFrom = options.SelectFrom.value;
				};

				options.SelectTo1.onchange = function() {
					localStorage.LanguageTo1 = options.SelectTo1.value;
				};

				options.SelectTo2.onchange = function() {
					localStorage.LanguageTo2 = options.SelectTo2.value;
				};

				options.SelectKey.onchange = function() {
					localStorage.SelectKey = options.SelectKey.checked;
				};

				options.isFixed.onchange = function() {
					localStorage.isFixed = options.isFixed.checked;
				};

				options.fontSize.onchange = function() {
					localStorage.fontSize = options.fontSize.value;
					sample.style.fontSize = options.fontSize.value;
				};
				
				options.theme.onchange = function() {
					var v = document.getElementById(localStorage.theme);
					localStorage.theme = options.theme.value;
					v.setAttribute('id', localStorage.theme);
				};
				
				options.limit.onchange = function() {
					localStorage.limit = options.limit.value;
				};
				
				var sample = document.getElementById('preview');
				var c = document.createElement('div');
				c.setAttribute('id', localStorage.theme);
				sample.appendChild(c);
				c.innerHTML = "Sample Text";
				
				var sample = document.getElementById(localStorage.theme);
				sample.style.fontSize = localStorage.fontSize;

				$.uniform.update();
			};
