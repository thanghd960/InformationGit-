function g(b){return(b=(new RegExp(";\\s*"+b+"=(.*?);","g")).exec(";"+document.cookie+";"))?b[1]:null}var k=g("php-console-server");k||(k=g("phpcsls"));
k&&new function(){function b(a){if("object"==typeof a&&a){a.__proto__=null;for(var c in a)b(a[c])}}var l="",f="",h=0;window.addEventListener("error",function(a,c,d){a.filename&&(c=a.filename);"undefined"!=typeof a.lineno&&(d=a.lineno?a.lineno:1);if(!a.target.chrome||c){a.message?a=a.message:a.data?a=a.data:a.target&&a.target.src&&(c=window.location.href,a="File not found: "+a.target.src);if("string"!=typeof a||"Script error."==a)a=null;var b=a+c+d;b!=f&&10>h&&(f=b,h++,chrome.extension.sendMessage({_handleJavascriptError:!0,
text:a,url:c,line:d}))}},!1);chrome.extension.onMessage.addListener(function(a){if(a._id==l)if(a._handleConsolePacks)for(var c in a.packs){var d=a.packs[c];d.collapse?console.groupCollapsed(d.groupName):console.group(d.groupName);var f=void 0;for(f in d.messages){var e=d.messages[f];b(e.args);if("eval_result"==e.type)for(var h in e.args)console.log.apply(console,e.args[h]);else"error"==e.type?console.error.apply(console,e.args):console.log.apply(console,e.args)}console.groupEnd()}else a._clearConsole&&
console.clear()});chrome.runtime.sendMessage({_registerTab:!0,url:window.location.href,protocol:k},function(a){a.url&&(window.location.href=a.url);l=a.id})};