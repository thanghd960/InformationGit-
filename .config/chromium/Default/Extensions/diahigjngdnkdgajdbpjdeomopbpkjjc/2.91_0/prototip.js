var Prototip={Version:"1.3.5.1"},Tips={options:{className:"default",closeButtons:false,zIndex:6E3}};
Object.extend(Prototip,{REQUIRED_Prototype:"1.6.0.2",REQUIRED_Scriptaculous:"1.8.1",start:function(){this.require("Prototype");Tips.initialize();Element.observe(window,"unload",this.unload)},require:function(a){if(typeof window[a]=="undefined"||this.convertVersionString(window[a].Version)<this.convertVersionString(this["REQUIRED_"+a]))throw"Lightview requires "+a+" >= "+this["REQUIRED_"+a];},convertVersionString:function(a){var b=a.replace(/_.*|\./g,"");b=parseInt(b+"0".times(4-b.length));return a.indexOf("_")>
-1?b-1:b},capture:function(a){Prototype.Browser.IE||(a=a.wrap(function(b,e){var d=Object.isElement(this)?this:this.element,c=e.relatedTarget;c!=d&&!$A(d.select("*")).member(c)&&b(e)}));return a},getHiddenDimensions:function(a){a=$(a);var b=a.ancestors(),e=[],d=[];b.push(a);b.each(function(c){if(!(c!=a&&c.visible())){e.push(c);d.push({display:c.getStyle("display"),position:c.getStyle("position"),visibility:c.getStyle("visibility")});c.setStyle({display:"block",position:"absolute",visibility:"visible"})}});
b={width:a.clientWidth,height:a.clientHeight};e.each(function(c,g){c.setStyle(d[g])});return b},unload:function(){Tips.removeAll()}});
Object.extend(Tips,{tips:[],visible:[],initialize:function(){this.zIndexTop=this.zIndex},useEvent:function(a){return{mouseover:a?"mouseenter":"mouseover",mouseout:a?"mouseleave":"mouseout",mouseenter:a?"mouseenter":"mouseover",mouseleave:a?"mouseleave":"mouseout"}}(Prototype.Browser.IE),fixIE:function(a){return(a=/MSIE ([\d.]+)/.exec(a))?parseFloat(a[1])<7:false}(navigator.userAgent),add:function(a){this.tips.push(a)},remove:function(a){var b=this.tips.find(function(e){return e.element==$(a)});if(b){b.deactivate();
if(b.tooltip){b.wrapper.remove();Tips.fixIE&&b.iframeShim.remove()}this.tips=this.tips.without(b)}},removeAll:function(){this.tips.each(function(a){this.remove(a.element)}.bind(this))},raise:function(a){if(!a.highest){if(this.visible.length==0){this.zIndexTop=this.options.zIndex;for(var b=0;b<this.tips.length;b++)this.tips[b].wrapper.setStyle({zIndex:this.options.zIndex})}a.wrapper.setStyle({zIndex:this.zIndexTop++});a.loader&&a.loader.setStyle({zIndex:this.zIndexTop});for(b=0;b<this.tips.length;b++)this.tips[b].highest=
false;a.highest=true}},addVisibile:function(a){this.removeVisible(a);this.visible.push(a)},removeVisible:function(a){this.visible=this.visible.without(a)},hook:function(a,b,e){a=$(a);b=$(b);e=Object.extend({element:"bottomLeft",target:"topLeft",offset:{x:0,y:0}},e||{});var d=b.cumulativeOffset();d.left+=e.offset.x;d.top+=e.offset.y;var c=b.cumulativeScrollOffset(),g=document.viewport.getScrollOffsets();d.left+=-1*(c[0]-g[0]);d.top+=-1*(c[1]-g[1]);b={element:Prototip.getHiddenDimensions(a),target:Prototip.getHiddenDimensions(b)};
c={element:Object.clone(d),target:Object.clone(d)};for(var f in c)switch(e[f]){case "topRight":c[f][0]+=b[f].width;break;case "topMiddle":c[f][0]+=b[f].width/2;break;case "rightMiddle":c[f][0]+=b[f].width;c[f][1]+=b[f].height/2;break;case "bottomLeft":c[f][1]+=b[f].height;break;case "bottomRight":c[f][0]+=b[f].width;c[f][1]+=b[f].height;break;case "bottomMiddle":c[f][0]+=b[f].width/2;c[f][1]+=b[f].height;break;case "leftMiddle":c[f][1]+=b[f].height/2;break}d.left+=-1*(c.element[0]-c.target[0]);d.top+=
-1*(c.element[1]-c.target[1]);a.setStyle({left:d.left+"px",top:d.top+"px"})}});Tips.initialize();
var Tip=Class.create({initialize:function(a,b,e){this.element=$(a);Tips.remove(this.element);e=(a=Object.isString(b)||Object.isElement(b))?e||[]:b;this.content=a?b:null;this.options=Object.extend({ajax:false,className:Tips.options.className,closeButton:Tips.options.closeButtons,delay:!(e.showOn&&e.showOn=="click")?0.12:false,duration:0.3,effect:false,hideAfter:false,hideOn:"mouseleave",hook:e.hook,offset:e.hook?{x:0,y:0}:{x:16,y:16},fixed:e.hook?true:false,showOn:"mousemove",target:this.element,title:false,
viewport:e.hook?false:true},e);this.target=$(this.options.target);if(this.options.ajax)this.options.ajax.options=Object.extend({onComplete:Prototype.emptyFunction},this.options.ajax.options||{});this.setup();if(this.options.effect){Prototip.require("Scriptaculous");this.queue={position:"end",limit:1,scope:this.wrapper.identify()}}Tips.add(this);this.activate()},setup:function(){this.wrapper=(new Element("div",{className:"prototip"})).setStyle({display:"none",zIndex:Tips.options.zIndex});this.wrapper.identify();
if(Tips.fixIE)this.iframeShim=(new Element("iframe",{className:"iframeShim",src:"javascript:false;",frameBorder:0})).setStyle({display:"none",zIndex:Tips.options.zIndex-1,opacity:0});if(this.options.ajax)this.showDelayed=this.showDelayed.wrap(this.ajaxShow);this.tip=new Element("div",{className:"content"});this.title=(new Element("div",{className:"title"})).hide();if(this.options.closeButton||this.options.hideOn.element&&this.options.hideOn.element=="closeButton")this.closeButton=new Element("a",
{href:"#",className:"close"})},build:function(){Tips.fixIE&&$(document.body).insert(this.iframeShim);if(this.options.ajax)$(document.body).insert(this.loader=(new Element("div",{className:"prototipLoader"})).hide());var a="wrapper";if(this.options.effect){a="effectWrapper";this.wrapper.insert(this.effectWrapper=new Element("div",{className:"effectWrapper"}))}this[a].insert(this.tooltip=(new Element("div",{className:"tooltip "+this.options.className})).insert(this.toolbar=(new Element("div",{className:"toolbar"})).insert(this.title)));
this.tooltip.insert(this.tip).insert((new Element("div")).setStyle("clear:both"));$(document.body).insert(this.wrapper);this.options.ajax||this.update({title:this.options.title,content:this.content})},update:function(a){var b=this.tooltip.getStyle("visibility"),e=this.wrapper.setStyle("height:auto;width:auto;").getStyle("visibility");[this.tooltip,this.wrapper].invoke("setStyle","visibility:hidden;");this.toolbar.setStyle("width: auto;");this.options.effect&&this.effectWrapper.setStyle("height:auto;width:auto;");
if(a.title){this.title.show().update(a.title);this.toolbar.show()}else if(!this.closeButton){this.title.hide();this.toolbar.hide()}if(Object.isString(a.content)||Object.isElement(a.content))this.tip.update(a.content).insert((new Element("div")).setStyle("clear:both;"));a={width:Prototip.getHiddenDimensions(this.wrapper).width+"px"};var d=[this.wrapper];this.options.effect&&d.push(this.effectWrapper);Tips.fixIE&&d.push(this.iframeShim);if(this.closeButton){this.title.show().insert({top:this.closeButton});
this.toolbar.show()}this.toolbar.setStyle("width: 100%;");a.height=null;this.wrapper.setStyle({visibility:e});this.tooltip.setStyle({visibility:b});d.invoke("setStyle",a)},activate:function(){this.eventShow=this.showDelayed.bindAsEventListener(this);this.eventHide=this.hide.bindAsEventListener(this);if(this.options.fixed&&this.options.showOn=="mousemove")this.options.showOn="mouseover";if(this.options.showOn==this.options.hideOn){this.eventToggle=this.toggle.bindAsEventListener(this);this.element.observe(this.options.showOn,
this.eventToggle)}var a={element:this.eventToggle?[]:[this.element],target:this.eventToggle?[]:[this.target],tip:this.eventToggle?[]:[this.wrapper],closeButton:[],none:[]},b=this.options.hideOn.element;this.hideElement=b||(!this.options.hideOn?"none":"element");this.hideTargets=a[this.hideElement];if(!this.hideTargets&&b&&Object.isString(b))this.hideTargets=this.tip.select(b);$w("show hide").each(function(e){var d=e.capitalize(),c=this.options[e+"On"].event||this.options[e+"On"];this[e+"Action"]=
c;if(["mouseenter","mouseleave","mouseover","mouseout"].include(c)){this[e+"Action"]=Tips.useEvent[c]||c;this["event"+d]=Prototip.capture(this["event"+d])}}.bind(this));this.eventToggle||this.element.observe(this.options.showOn,this.eventShow);this.hideTargets&&this.hideTargets.invoke("observe",this.hideAction,this.eventHide);if(!this.options.fixed&&this.options.showOn=="click"){this.eventPosition=this.position.bindAsEventListener(this);this.element.observe("mousemove",this.eventPosition)}this.buttonEvent=
this.hide.wrap(function(e,d){var c=d.findElement(".close");if(c){d.stop();c.blur();e(d)}}).bindAsEventListener(this);this.closeButton&&this.wrapper.observe("click",this.buttonEvent);if(this.options.showOn!="click"&&this.hideElement!="element"){this.eventCheckDelay=Prototip.capture(function(){this.clearTimer("show")}).bindAsEventListener(this);this.element.observe(Tips.useEvent.mouseout,this.eventCheckDelay)}a=[this.element,this.wrapper];this.activityEnter=Prototip.capture(function(){Tips.raise(this);
this.cancelHideAfter()}).bindAsEventListener(this);this.activityLeave=Prototip.capture(this.hideAfter).bindAsEventListener(this);a.invoke("observe",Tips.useEvent.mouseover,this.activityEnter).invoke("observe",Tips.useEvent.mouseout,this.activityLeave);if(this.options.ajax&&this.options.showOn!="click"){this.ajaxHideEvent=Prototip.capture(this.ajaxHide).bindAsEventListener(this);this.element.observe(Tips.useEvent.mouseout,this.ajaxHideEvent)}},deactivate:function(){if(this.options.showOn==this.options.hideOn)this.element.stopObserving(this.options.showOn,
this.eventToggle);else{this.element.stopObserving(this.options.showOn,this.eventShow);this.hideTargets&&this.hideTargets.invoke("stopObserving")}this.eventPosition&&this.element.stopObserving("mousemove",this.eventPosition);this.eventCheckDelay&&this.element.stopObserving("mouseout",this.eventCheckDelay);this.wrapper.stopObserving();this.element.stopObserving(Tips.useEvent.mouseover,this.activityEnter).stopObserving(Tips.useEvent.mouseout,this.activityLeave);this.ajaxHideEvent&&this.element.stopObserving(Tips.useEvent.mouseout,
this.ajaxHideEvent)},ajaxShow:function(a,b){this.tooltip||this.build();this.position(b);if(this.ajaxContentLoaded)a(b);else if(!this.ajaxContentLoading){var e={ajaxPointer:{pointerX:Event.pointerX(b),pointerY:Event.pointerY(b)}},d=Object.clone(this.options.ajax.options);d.onComplete=d.onComplete.wrap(function(c,g){this.update({title:this.options.title,content:g.responseText});this.position(e);if(this.loader&&!this.loader.visible()){this.ajaxContentLoaded=true;this.ajaxContentLoading=false}else(function(){c(g);
this.loader&&this.loader.visible()&&this.show();this.clearTimer("loader");this.loader.remove();this.ajaxContentLoaded=true;this.ajaxContentLoading=false}).bind(this).delay(0.3)}.bind(this));this.loaderTimer=Element.show.delay(this.options.delay,this.loader);this.wrapper.hide();this.ajaxContentLoading=true;(function(){this.ajaxTimer=new Ajax.Request(this.options.ajax.url,d)}).bind(this).delay(this.options.delay)}},ajaxHide:function(){this.clearTimer("loader")},showDelayed:function(a){this.tooltip||
this.build();this.options.ajax||this.position(a);if(!this.wrapper.visible()){this.clearTimer("show");this.showTimer=this.show.bind(this).delay(this.options.delay)}},clearTimer:function(a){this[a+"Timer"]&&clearTimeout(this[a+"Timer"])},show:function(){if(!(this.wrapper.visible()&&this.options.effect!="appear")){Tips.fixIE&&this.iframeShim.show();Tips.addVisibile(this.wrapper);if(this.options.effect){this.effectWrapper.setStyle({height:Prototip.getHiddenDimensions(this.effectWrapper).height+"px"});
this.tooltip.hide();this.effectWrapper.hide();this.wrapper.show();this.activeEffect&&Effect.Queues.get(this.queue.scope).remove(this.activeEffect);this.activeEffect=Effect[Effect.PAIRS[this.options.effect][0]](this.effectWrapper,{beforeStart:Element.show.curry(this.tooltip),duration:this.options.duration,queue:this.queue,afterFinish:function(){this.effectWrapper.setStyle({height:"auto"});this.element.fire("prototip:shown")}.bind(this)})}else{this.tooltip.show();this.wrapper.show();this.element.fire("prototip:shown")}}},
hideAfter:function(){if(this.options.ajax){this.loader&&this.options.showOn!="click"&&this.loader.hide();this.clearTimer("ajax");this.ajaxContentLoading=null}if(this.options.hideAfter){this.cancelHideAfter();this.hideAfterTimer=this.hide.bind(this).delay(this.options.hideAfter)}},cancelHideAfter:function(){this.options.hideAfter&&this.clearTimer("hideAfter")},hide:function(){this.clearTimer("show");this.clearTimer("loader");if(this.wrapper.visible())if(this.options.effect){this.activeEffect&&Effect.Queues.get(this.queue.scope).remove(this.activeEffect);
this.activeEffect=Effect[Effect.PAIRS[this.options.effect][1]](this.effectWrapper,{duration:this.options.duration,queue:this.queue,afterFinish:this.afterHide.bind(this)})}else this.afterHide()},afterHide:function(){Tips.fixIE&&this.iframeShim.hide();this.loader&&this.loader.hide();this.wrapper.hide();Tips.removeVisible(this.wrapper);this.element.fire("prototip:hidden")},toggle:function(a){this.wrapper&&this.wrapper.visible()?this.hide(a):this.showDelayed(a)},position:function(a){Tips.raise(this);
if(this.options.effect){var b=this.effectWrapper.getStyle("visibility"),e=this.effectWrapper.getStyle("display");this.effectWrapper.setStyle({visibility:"visible"}).show()}if(this.options.hook){var d=Object.extend({offset:this.options.offset},{element:this.options.hook.tip,target:this.options.hook.target});Tips.hook(this.wrapper,this.target,d);this.loader&&Tips.hook(this.loader,this.target,d);Tips.fixIE&&Tips.hook(this.iframeShim,this.target,d)}else{var c=this.target.cumulativeOffset();d=Prototip.getHiddenDimensions(this.wrapper);
var g=a.ajaxPointer||{};a={left:(this.options.fixed?c[0]:g.pointerX||Event.pointerX(a))+this.options.offset.x,top:(this.options.fixed?c[1]:g.pointerY||Event.pointerY(a))+this.options.offset.y};if(!this.options.fixed&&this.element!==this.target){g=this.element.cumulativeOffset();a.left+=-1*(g[0]-c[0]);a.top+=-1*(g[1]-c[1])}if(!this.options.fixed&&this.options.viewport){c=document.viewport.getScrollOffsets();g=document.viewport.getDimensions();var f={left:"width",top:"height"};for(var h in f)if(a[h]+
d[f[h]]-c[h]>g[f[h]])a[h]=a[h]-d[f[h]]-2*this.options.offset[h=="top"?"x":"y"]}a={left:a.left+"px",top:a.top+"px"};this.wrapper.setStyle(a);this.loader&&this.loader.setStyle(a);Tips.fixIE&&this.iframeShim.setStyle(a)}this.options.effect&&this.effectWrapper.setStyle({visibility:b,display:e})}});Prototip.start();

chrome.extension.getVersion=function(){if(!chrome.extension.version_){var a=new XMLHttpRequest;a.open("GET",chrome.extension.getURL("manifest.json"),false);a.onreadystatechange=function(){if(this.readyState==4){var b=JSON.parse(this.responseText);chrome.extension.version_=b.version}};a.send()}return chrome.extension.version_};