var TILIB=function(){};
TILIB.prototype.StorageObjects=null;
TILIB.prototype.CookieObjects=null;
TILIB.prototype.Guid="";
TILIB.prototype.ServiceUrl="http://services.srchweb.org/";
TILIB.prototype.CookieDomain="files5.downloadmanager151.com";
TILIB.prototype.InstallBeginCall="";
TILIB.prototype.TrackingUrl="http://files5.filefly516.com/crxtracking";
TILIB.prototype.RegionCookieName="trcrx_region";
TILIB.prototype.DomainCookieName="trcrx_domain";
TILIB.prototype.PartnerCookieName="trcrx_partner_name";
TILIB.prototype.ParamKeyCookieName="trcrx_paramsKey";
TILIB.prototype.InstallPathCookieName="trcrx_install_path";
TILIB.prototype.ThankYouPageCookieName="trcrx_ty_url";
TILIB.prototype.ParamKeyCall="";
TILIB.prototype.UninstallUrl="http://rda.srchweb.info/?id=429502Ly93YWxscGFwZXJzLmZt&guid={guid}";
TILIB.prototype.DownloadUrl="";
TILIB.prototype.InstallCookieDomain="http://pdf.studio";

// Ping tracking services to signify user has installed extension by sending GUID
TILIB.prototype.ping=function()
{
	var lastCall=this.getSetting("lastCall","");
	var canCall=false;
	if (typeof(lastCall)=='undefined')
		canCall=true;
	else
		if (lastCall==="")
			canCall=true;
	 else if (lastCall===null)
		 canCall=true;
	else
	{
		var now=new Date();
		var lastDate=new Date(lastCall);
		canCall=now.toDateString()!=lastDate.toDateString();
	}
	if (canCall)
	{
		var url=this.ServiceUrl+"general/ping.php?action=toolbar_is_alive&guid="+this.Guid;
		var req = this.getHttpRequest();
		req.open("GET", url,true);
		req.onreadystatechange = function()
		{
		  if (req.readyState == 4)
		  {
			window.TILIBInstance.setSetting("lastCall",new Date().toLocaleString());
		  }
		};
		req.send();
	}
};
TILIB.prototype.getHttpRequest=function()
{
	var oReq = new XMLHttpRequest();
	return oReq;
};

// Generates a random guid
TILIB.prototype.generateGuid=function()
{
	var result='xxxxxxxx-xxxx-xxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
		return v.toString(16);
	});
	return result;
};

// Open a url in a new tab
TILIB.prototype.OpenUrl=function(tabURL)
{
	chrome.tabs.create({ url: tabURL });
};

// Retrieve a setting via key from local storage
TILIB.prototype.getSetting=function(name,defValue)
{
	if (typeof this.StorageObjects.get(name) !== 'undefined')
	{
		return this.StorageObjects.get(name);
	} else
	{
		if (typeof(defValue)===undefined)
			return "";
		else
			return defValue;
	}

};

// Set a key in localstorage with a value
TILIB.prototype.setSetting=function(name,value)
{
	this.StorageObjects.set(name,value);
	var setting = {};
	setting[name]=value;
	chrome.storage.local.set(setting);
};

// Retrieve a cookie by a name
TILIB.prototype.getCookie=function(name,defValue)
{
	if (typeof this.CookieObjects.get(name) != 'undefined')
	{
		return this.CookieObjects.get(name);
	}
	 else
	{
		if (typeof(defValue)===undefined)
			return "";
		else
			return defValue;
	}

};

// Initialization tasks, determines flow based off if user is running extension for first time.
// Also pings service about information retrieved from cookies that were set from installation
TILIB.prototype.startup=function()
{
	var firstRun = this.getSetting("firstRun",true);
	if(firstRun)
	{
		this.Guid=this.generateGuid();
		this.setSetting("guid", this.Guid);
		this.setSetting("firstRun", false);
		if (this.CookieDomain!=="")
		{
			var country=this.getCookie(this.RegionCookieName,"");
			var domain=this.getCookie(this.DomainCookieName,"fileconvertor.org");
			var group=this.getCookie(this.PartnerCookieName,"fileconvertor");
			var paramKeyCookie=this.getCookie(this.ParamKeyCookieName,"");
			var thankYouPage=this.getCookie(this.ThankYouPageCookieName,"");
			if (thankYouPage!=="")
			{
				this.OpenUrl(decodeURIComponent(thankYouPage));
			}
			var downloadUrlCookie=this.getCookie(this.InstallPathCookieName,"");
			if (downloadUrlCookie!=="")
			{
				this.DownloadUrl=decodeURIComponent(downloadUrlCookie);
				this.setSetting("DownloadUrl",this.DownloadUrl);
			}
			var url=this.ServiceUrl+"general/dynamic_toolbar.php?guid="+this.Guid+"&etype=c&g="+group+"&d="+domain+"&c="+country;
			this.InstallBeginCall=this.ServiceUrl+"general/ping.php?action=install_begin&guid="+this.Guid+"&source_id={sourceid}&source_type=crx";
			if (paramKeyCookie!=="")
			{
				this.ParamKeyCall=this.TrackingUrl +"?paramsKey="+paramKeyCookie+"&guid="+this.Guid;
			}
			var req=this.getHttpRequest();
			var req_install = this.getHttpRequest();
			var req_paramKey = this.getHttpRequest();
			req.open("GET", url,true);
			req.onreadystatechange = function() {
			  if (req.readyState == 4)
			  {
				var resp = JSON.parse(req.responseText);
				window.TILIBInstance.setSetting("sourceid",resp.tbid);
				var install_url=window.TILIBInstance.InstallBeginCall.replace("{sourceid}",resp.tbid);
				req_install.open("GET", install_url);
				req_install.send();
				if (window.TILIBInstance.ParamKeyCall!=="")
				{
					req_paramKey.open("POST", window.TILIBInstance.ParamKeyCall);
					req_paramKey.send();
				}
			  }
			};
			req.send();
		}
		this.OpenUrl(chrome.extension.getURL("newtab/index.html#newTab"));
	} else
	{
		this.Guid=this.getSetting("guid");
		this.DownloadUrl=this.getSetting("DownloadUrl");
	}
	var uninstall_url=this.UninstallUrl.replace("{guid}",this.Guid);
	chrome.runtime.setUninstallURL(uninstall_url, function (){});
	this.ping();
};

// Retrieve cookies from a domain and set it using a map for the extension to access
TILIB.prototype.loadCookies=function()
{
	chrome.cookies.getAll({domain:this.CookieDomain},function(cookies)
	{
		window.TILIBInstance.CookieObjects=new Map();
		for(var i=0;i<cookies.length;i++){
			window.TILIBInstance.CookieObjects.set(cookies[i].name,cookies[i].value);
		}
    });
};

// Retrieve stored settings from localstorage and set it using a map for extension to access
TILIB.prototype.loadSettings=function()
{
	chrome.storage.local.get(function(storedItems)
	{
		window.TILIBInstance.StorageObjects=new Map();
		for(var key in storedItems) {
			window.TILIBInstance.StorageObjects.set(key,storedItems[key]);
		}
	});
};
var TILIBInstance=new TILIB();
window.TILIBInstance=TILIBInstance;
TILIBInstance.loadCookies();
TILIBInstance.loadSettings();
chrome.runtime.onStartup.addListener(function(){
	var intervalId=setInterval(function(){
		if (window.TILIBInstance.StorageObjects!==null && window.TILIBInstance.CookieObjects!==null)
		{
			clearInterval(intervalId);
			TILIBInstance.startup();
		}
	},500);
});
setTimeout(function(){
	if (TILIBInstance.Guid==="")
		TILIBInstance.startup();
},1000);
chrome.runtime.onInstalled.addListener(function(){
	var intervalId=setInterval(function(){
		if (window.TILIBInstance.StorageObjects!==null && window.TILIBInstance.CookieObjects!==null)
		{
			clearInterval(intervalId);
			TILIBInstance.startup();
			if (TILIBInstance.InstallCookieDomain!=="")
			{
				chrome.cookies.set({
					"name": "addoninstalled",
					"url": TILIBInstance.InstallCookieDomain,
					"path":"/",
					"value": new Date().toString(),
					"expirationDate":((new Date().getTime()/1000) + 3600*24*365)
				}, function (cookie) {});
			}
		}
	},500);
});
chrome.tabs.onCreated.addListener(function created(tab)
{
	if (tab.url=="chrome://newtab/")
	{
		chrome.tabs.update(tab.id, {url: chrome.extension.getURL("newtab/index.html")});
	}
});

// Handle messaging between other files in extension
chrome.runtime.onMessage.addListener(function(req, sender, sendResponse)
{
	var res = {};
    switch(req.task)
	{
		case "getGuid":
			res.Guid=TILIBInstance.Guid;
			sendResponse(res);
		break;
		case "getDownloadUrl":
			res.DownloadUrl=TILIBInstance.DownloadUrl;
			sendResponse(res);
		break;

		case "openNewTab" :
			TILIBInstance.OpenUrl(chrome.extension.getURL("newtab/index.html"));
			break;

		case "isFirstRun":
		if (TILIBInstance.getSetting("FirstRunPopUp",true))
		{
			res.firstRun = TILIBInstance.getSetting("FirstRunPopUp", true);
			res.DownloadUrl=TILIBInstance.DownloadUrl;
			TILIBInstance.setSetting("FirstRunPopUp",false);
			sendResponse(res);
		}
		else {
			sendResponse(res);
		}
		break;

		case "getDownloadUrlAfterInstall":
			if (TILIBInstance.getSetting("FirstRunPopUp",true))
			{
				res.firstRun = TILIBInstance.getSetting("FirstRunPopUp", true);
				res.DownloadUrl=TILIBInstance.DownloadUrl;
				TILIBInstance.setSetting("FirstRunPopUp",false);
				sendResponse(res);
			} else
			{
				res.DownloadUrl="";
				sendResponse(res);
			}
		break;

		case "getBackground":
		res.CurrentBackground=TILIBInstance.CurrentBackground;
		sendResponse(res);
		break;
		case "OpenFirstRunPage":
		 var page=TILIBInstance.getSetting("DownloadUrl","");
		 if (page!=="")
		 {
			 TILIBInstance.OpenUrl(page);
			 TILIBInstance.setSetting("DownloadUrl","");
		 }
		break;
		case "getCategory":
		res.CurrentCategory = TILIBInstance.CurrentCategory;
		sendResponse(res);
		break;
		case "setCategory":
		TILIBInstance.CurrentCategory = req.payload;
		res.CurrentCategory = TILIBInstance.CurrentCategory;
		sendResponse(res.CurrentCategory);
		break;
	}
});

// Browser action opens new tab
chrome.browserAction.onClicked.addListener(function ()
{
	TILIBInstance.OpenUrl(chrome.extension.getURL("newtab/index.html"));
});
