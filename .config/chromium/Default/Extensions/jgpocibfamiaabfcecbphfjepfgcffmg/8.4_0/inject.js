window.addEventListener("mouseup", function (event) {

	var p = "" + window.getSelection();
	if (p.trim() != "" && p.trim().length > 1 && p.indexOf("http://") < 0 && p.indexOf("https://") < 0 && p.indexOf("ftp://") < 0 && p.indexOf("udp://") < 0 && p.indexOf("www.") < 0) {

		chrome.extension.sendRequest({
			text_to_translate: p.trim(),
			isAltKeyPressed: event.altKey,
			isCtrlKeyPressed: event.ctrlKey
		}, function (response) {
			// Do stuff on successful response
		});
	} else {
		tooltip.hide();
	}

}, false);

window.addEventListener("keydown", function (event) {

	if (event.altKey || event.ctrlKey) {
		return;
	}
	tooltip.hide();

}, false);

chrome.extension.onRequest.addListener(
	function (request, sender, sendResponse) {
		if (request.textResult.trim() != "" || request.textResult.trim() != window.getSelection()) {
			var text = request.textResult.trim();
			tooltip.show(text, request.isFixedPopup, request.SelectedTheme, request.SelectedFontSize);
		} else {
			tooltip.hide();
		}
	});

var tooltip = function () {
	var id = 'tt';
	var top = 3;
	var left = 3;
	var maxw = 300;
	var speed = 10;
	var timer = 20;
	var endalpha = 95;
	var alpha = 0;
	var tt, t, c, b, h;
	var oldMouseMove;
	var oldMouseUp;
	return {
		show: function (v, isFixed, theme, fontSize) {
			if (tt == null) {
				oldMouseMove = document.onmousemove;
				oldMouseUp = document.onmouseup;
				tt = document.createElement('div');
				tt.setAttribute('id', id);
				t = document.createElement('div');
				t.setAttribute('id', id + 'top');
				c = document.createElement('div');
				c.setAttribute('id', theme);
				// c.style.fontWeight = 'bold';
				// c.style.color = 'red';
				b = document.createElement('div');
				b.setAttribute('id', id + 'bot');
				tt.appendChild(t);
				tt.appendChild(c);
				tt.appendChild(b);
				document.body.appendChild(tt);
				tt.style.opacity = 0;
				tt.style.filter = 'alpha(opacity=0)';
			}

			if (isFixed == 'true') {
				document.onmousemove = oldMouseMove;
				document.onmouseup = this.posFixed;
			} else {
				document.onmouseup = oldMouseUp;
				document.onmousemove = this.pos;
			}

			c.style.fontSize = fontSize;
			c.setAttribute('id', theme);

			tt.style.display = 'block';
			c.innerHTML = v;
			tt.style.width = 'auto';

			if (tt.offsetWidth > maxw) {
				tt.style.width = maxw + 'px'
			}
			h = parseInt(tt.offsetHeight) + top;
			clearInterval(tt.timer);
			tt.timer = setInterval(function () {
				tooltip.fade(1)
			}, timer);
		},
		pos: function (e) {
			var u = e.pageY;
			var l = e.pageX;

			if ((u - h) <= 3) {
				tt.style.top = 3 + 'px';
			} else {
				tt.style.top = (u - h) + 'px';
			}

			if (screen.width - l <= 300) {
				tt.style.left = (l - tt.offsetWidth) + 'px';
			} else {
				tt.style.left = (l - left) + 'px';
			}
		},
		posFixed: function (e) {
			var u = e.pageY;
			var l = e.pageX;

			if ((u - h) <= 3) {
				tt.style.top = 3 + 'px';
			} else {
				tt.style.top = (u - h) + 'px';
			}

			if (screen.width - l <= 300) {
				tt.style.left = (l - tt.offsetWidth) + 'px';
			} else {
				tt.style.left = (l - left) + 'px';
			}
		},
		fade: function (d) {
			var a = alpha;
			if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
				var i = speed;
				if (endalpha - a < speed && d == 1) {
					i = endalpha - a;
				} else if (alpha < speed && d == -1) {
					i = a;
				}
				alpha = a + (i * d);
				tt.style.opacity = alpha * .01;
				tt.style.filter = 'alpha(opacity=' + alpha + ')';
			} else {
				clearInterval(tt.timer);
				if (d == -1) {
					tt.style.display = 'none';
				}
			}
		},
		hide: function () {
			if (tt != null) {
				clearInterval(tt.timer);
				tt.timer = setInterval(function () {
					tooltip.fade(-1)
				}, timer);
			}
		}
	};
}();