(function(){var c=function(){},a=("onprogress" in new Browser.Request);var b=this.RESTRequest=new Class({Implements:[Chain,Events,Options],options:{url:"",raw:"",data:{},files:[],headers:{},async:true,format:false,method:"get",link:"ignore",isSuccess:null,emulation:false,urlEncoded:false,encoding:"utf-8",evalScripts:false,evalResponse:false,timeout:0,noCache:false},initialize:function(d){this.xhr=new Browser.Request();this.setOptions(d);this.headers=this.options.headers},onStateChange:function(){var d=this.xhr;if(d.readyState!=4||!this.running){return}this.running=false;this.status=0;Function.attempt(function(){var e=d.status;this.status=(e==1223)?204:e}.bind(this));d.onreadystatechange=c;if(a){d.onprogress=d.onloadstart=c}clearTimeout(this.timer);this.response={text:this.xhr.responseText||"",xml:this.xhr.responseXML};if(this.options.isSuccess.call(this,this.status)){this.success(this.response.text,this.response.xml)}else{this.failure()}},isSuccess:function(){var d=this.status;return(d>=200&&d<300)},isRunning:function(){return !!this.running},processScripts:function(d){return d.stripScripts(this.options.evalScripts)},success:function(e,d){this.onSuccess(this.processScripts(e),d)},onSuccess:function(){this.fireEvent("complete",arguments).fireEvent("success",arguments).callChain()},failure:function(){this.onFailure()},onFailure:function(){this.fireEvent("complete").fireEvent("failure",this.xhr)},loadstart:function(d){this.fireEvent("loadstart",[d,this.xhr])},progress:function(d){this.fireEvent("progress",[d,this.xhr])},timeout:function(){this.fireEvent("timeout",this.xhr)},setHeader:function(d,e){this.headers[d]=e;return this},getHeader:function(d){return Function.attempt(function(){return this.xhr.getResponseHeader(d)}.bind(this))},check:function(){if(!this.running){return true}switch(this.options.link){case"cancel":this.cancel();return true;case"chain":this.chain(this.caller.pass(arguments,this));return false}return false},send:function(r){if(!this.check(r)){return this}this.options.isSuccess=this.options.isSuccess||this.isSuccess;this.running=true;var n=typeOf(r);if(n=="string"||n=="element"){r={data:r}}var g=this.options;r=Object.append({data:g.data,url:g.url,method:g.method},r);var l=r.data,e=String(r.url),d=r.method.toLowerCase();switch(typeOf(l)){case"element":l=document.id(l).toQueryString();break;case"object":case"hash":l=Object.toQueryString(l)}if(this.options.format){var o="format="+this.options.format;l=(l)?o+"&"+l:o}if(this.options.emulation&&!["get","post"].contains(d)){var m="_method="+d;l=(l)?m+"&"+l:m;d="post"}if(this.options.urlEncoded&&["post","put"].contains(d)){var f=(this.options.encoding)?"; charset="+this.options.encoding:"";this.headers["Content-type"]="application/x-www-form-urlencoded"+f}if(!e){e=document.location.pathname}var j=e.lastIndexOf("/");if(j>-1&&(j=e.indexOf("#"))>-1){e=e.substr(0,j)}if(this.options.noCache){e+=(e.contains("?")?"&":"?")+String.uniqueID()}if(l&&(d=="get"||this.options.raw!=undefined)){e+=(e.contains("?")?"&":"?")+l;l=null}var p=this.xhr;if(a){p.onloadstart=this.loadstart.bind(this);p.onprogress=this.progress.bind(this)}p.open(d.toUpperCase(),e,this.options.async,this.options.user,this.options.password);if(this.options.user&&"withCredentials" in p){p.withCredentials=true}p.onreadystatechange=this.onStateChange.bind(this);Object.each(this.headers,function(s,i){try{p.setRequestHeader(i,s)}catch(t){this.fireEvent("exception",[i,s])}},this);this.fireEvent("request");if(this.options.files.length>0){var q=new FormData();Object.each(this.options.data,function(s,i){q.append(i,s)});for(var k=0,h;h=this.options.files[k];++k){if(this.options.file_key){q.append(this.options.file_key,h)}else{q.append(h.name,h)}}p.send(q)}else{if(this.options.raw!=undefined){p.send(this.options.raw)}else{p.send(l)}}if(!this.options.async){this.onStateChange()}if(this.options.timeout){this.timer=this.timeout.delay(this.options.timeout,this)}return this},cancel:function(){if(!this.running){return this}this.running=false;var d=this.xhr;d.abort();clearTimeout(this.timer);d.onreadystatechange=c;if(a){d.onprogress=d.onloadstart=c}this.xhr=new Browser.Request();this.fireEvent("cancel");return this}})})();