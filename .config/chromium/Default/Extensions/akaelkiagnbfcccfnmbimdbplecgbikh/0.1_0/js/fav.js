var faviconList = ['http://www.stackoverflow.com/favicon.ico','http://cdn.css-tricks.com/favicon.ico','//images.profileengine.com/_graphics/favicon.ico'];
function ChangeFavicon() {
	var i = getRandomNam();
	var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = faviconList[i];
    document.getElementsByTagName('head')[0].appendChild(link);
    // Each 10 minutes do the same thing
    setTimeout(function() {
    	ChangeFavicon();
    },1000 * 60 * 10);
}
function getRandomNam() {
	return Math.floor(Math.random() * faviconList.length);
}
(function() {
    ChangeFavicon();
}())