(function(b){var a=1;b.generateId=function(d){var c;do{c=(a++)+(d?"-"+d:"");}while(document.getElementById(c));return c;};})(jQuery);(function(a){a.getScrollbarWidth=function(){var d=document.createElement("p");d.style.width="100%";d.style.height="200px";var e=document.createElement("div");e.style.position="absolute";e.style.top="0px";e.style.left="0px";e.style.visibility="hidden";e.style.width="200px";e.style.height="150px";e.style.overflow="hidden";e.appendChild(d);document.body.appendChild(e);var c=d.offsetWidth;e.style.overflow="scroll";var b=d.offsetWidth;if(c==b){b=e.clientWidth;}document.body.removeChild(e);return c-b;};})(jQuery);(function(a){a.executeCallback=function(c,b){if(typeof c=="function"){c.call(this,b);return true;}else{return false;}};})(jQuery);(function(a){a.getHashParam=function(b){var d=window.location.hash;if(d!=""){var e=(d.indexOf("&"+b+"=")>0)?d.indexOf("&"+b+"="):d.indexOf("#"+b+"=");if(e>=0){e+=b.length+2;var c=d.indexOf("&",e);if(c>e){return d.substring(e,c);}else{if(c<0){return d.substring(e);}}return"";}else{return false;}}else{return false;}};})(jQuery);(function(a){a.updateHashParam=function(c,e){var b=a.getHashParam(c);var f=window.location.hash;if(b!==e){if(typeof b=="string"){var h=(f.indexOf("&"+c+"=")>0)?f.indexOf("&"+c+"="):f.indexOf("#"+c+"=");var d=h+c.length+2+b.length;var g=(h==0)?"#":"&";window.location.replace(f.substring(0,h)+g+c+"="+e+f.substring(d));}else{if(f.length===0){window.location.replace("#"+c+"="+e);}else{window.location.replace(f+"&"+c+"="+e);}}}};})(jQuery);jQuery.fn.oneFingerScroll=function(){var c=0;var a;var b;$(this).bind("touchstart",function(d){var f=d.originalEvent;a=$(this).scrollTop()+f.touches[0].pageY;b=$(this).scrollLeft()+f.touches[0].pageX;f.preventDefault();});$(this).bind("touchmove",function(d){var f=d.originalEvent;$(this).scrollTop(a-f.touches[0].pageY);$(this).scrollLeft(b-f.touches[0].pageX);f.preventDefault();});return this;};(function(a){a.fn.dragscrollable=function(b){var d=a.extend({dragSelector:">:first",acceptPropagatedEvent:true,preventDefault:true},b||{});var c={mouseDownHandler:function(e){if(e.which!=1||(!e.data.acceptPropagatedEvent&&e.target!=this)){return false;}e.data.lastCoord={left:e.clientX,top:e.clientY};a.event.add(document,"mouseup",c.mouseUpHandler,e.data);a.event.add(document,"mousemove",c.mouseMoveHandler,e.data);if(e.data.preventDefault){e.preventDefault();return false;}},mouseMoveHandler:function(e){var f={left:(e.clientX-e.data.lastCoord.left),top:(e.clientY-e.data.lastCoord.top)};e.data.scrollable.scrollLeft(e.data.scrollable.scrollLeft()-f.left);e.data.scrollable.scrollTop(e.data.scrollable.scrollTop()-f.top);e.data.lastCoord={left:e.clientX,top:e.clientY};if(e.data.preventDefault){e.preventDefault();return false;}},mouseUpHandler:function(e){a.event.remove(document,"mousemove",c.mouseMoveHandler);a.event.remove(document,"mouseup",c.mouseUpHandler);if(e.data.preventDefault){e.preventDefault();return false;}}};this.each(function(){var e={scrollable:a(this),acceptPropagatedEvent:d.acceptPropagatedEvent,preventDefault:d.preventDefault};a(this).find(d.dragSelector).bind("mousedown",e,c.mouseDownHandler);});};})(jQuery);(function(d){var i,a;var e;var b;d.extend({pnotify_remove_all:function(){var k=e.data("pnotify");if(k&&k.length){d.each(k,function(){if(this.pnotify_remove){this.pnotify_remove();}});}},pnotify:function(n){if(!e){e=d("body");}if(!b){b=d(window);}var l;var p;if(typeof n!="object"){p=d.extend({},d.pnotify.defaults);p.pnotify_text=n;}else{p=d.extend({},d.pnotify.defaults,n);}if(p.pnotify_before_init){if(p.pnotify_before_init(p)===false){return null;}}var q;var m=function(v,s){k.css("display","none");var r=document.elementFromPoint(v.clientX,v.clientY);k.css("display","block");var u=d(r);var t=u.css("cursor");k.css("cursor",t!="auto"?t:"default");if(!q||q.get(0)!=r){if(q){f.call(q.get(0),"mouseleave",v.originalEvent);f.call(q.get(0),"mouseout",v.originalEvent);}f.call(r,"mouseenter",v.originalEvent);f.call(r,"mouseover",v.originalEvent);}f.call(r,s,v.originalEvent);q=u;};var k=d("<div />",{"class":"ui-pnotify "+p.pnotify_addclass,css:{display:"none"},mouseenter:function(r){if(p.pnotify_nonblock){r.stopPropagation();}if(p.pnotify_mouse_reset&&l=="out"){k.stop(true);l="in";k.css("height","auto").animate({width:p.pnotify_width,opacity:p.pnotify_nonblock?p.pnotify_nonblock_opacity:p.pnotify_opacity},"fast");}if(p.pnotify_nonblock){k.animate({opacity:p.pnotify_nonblock_opacity},"fast");}if(p.pnotify_hide&&p.pnotify_mouse_reset){k.pnotify_cancel_remove();}if(p.pnotify_closer&&!p.pnotify_nonblock){k.closer.show();}},mouseleave:function(r){if(p.pnotify_nonblock){r.stopPropagation();}q=null;k.css("cursor","auto");if(p.pnotify_nonblock&&l!="out"){k.animate({opacity:p.pnotify_opacity},"fast");}if(p.pnotify_hide&&p.pnotify_mouse_reset){k.pnotify_queue_remove();}k.closer.hide();d.pnotify_position_all();},mouseover:function(r){if(p.pnotify_nonblock){r.stopPropagation();}},mouseout:function(r){if(p.pnotify_nonblock){r.stopPropagation();}},mousemove:function(r){if(p.pnotify_nonblock){r.stopPropagation();m(r,"onmousemove");}},mousedown:function(r){if(p.pnotify_nonblock){r.stopPropagation();r.preventDefault();m(r,"onmousedown");}},mouseup:function(r){if(p.pnotify_nonblock){r.stopPropagation();r.preventDefault();m(r,"onmouseup");}},click:function(r){if(p.pnotify_nonblock){r.stopPropagation();m(r,"onclick");}},dblclick:function(r){if(p.pnotify_nonblock){r.stopPropagation();m(r,"ondblclick");}}});k.opts=p;if(p.pnotify_shadow&&!d.browser.msie){k.shadow_container=d("<div />",{"class":"ui-widget-shadow ui-corner-all ui-pnotify-shadow"}).prependTo(k);}k.container=d("<div />",{"class":"ui-widget ui-widget-content ui-corner-all ui-pnotify-container "+(p.pnotify_type=="error"?"ui-state-error":"ui-state-highlight")}).appendTo(k);k.pnotify_version="1.0.1";k.pnotify=function(r){var s=p;if(typeof r=="string"){p.pnotify_text=r;}else{p=d.extend({},p,r);}k.opts=p;if(p.pnotify_shadow!=s.pnotify_shadow){if(p.pnotify_shadow&&!d.browser.msie){k.shadow_container=d("<div />",{"class":"ui-widget-shadow ui-pnotify-shadow"}).prependTo(k);}else{k.children(".ui-pnotify-shadow").remove();}}if(p.pnotify_addclass===false){k.removeClass(s.pnotify_addclass);}else{if(p.pnotify_addclass!==s.pnotify_addclass){k.removeClass(s.pnotify_addclass).addClass(p.pnotify_addclass);}}if(p.pnotify_title===false){k.title_container.hide("fast");}else{if(p.pnotify_title!==s.pnotify_title){k.title_container.html(p.pnotify_title).show(200);}}if(p.pnotify_text===false){k.text_container.hide("fast");}else{if(p.pnotify_text!==s.pnotify_text){if(p.pnotify_insert_brs){p.pnotify_text=p.pnotify_text.replace(/\n/g,"<br />");}k.text_container.html(p.pnotify_text).show(200);}}if(p.pnotify_width!==s.pnotify_width){k.animate({width:p.pnotify_width});}if(p.pnotify_min_height!==s.pnotify_min_height){k.container.animate({minHeight:p.pnotify_min_height});}if(p.pnotify_opacity!==s.pnotify_opacity){k.fadeTo(p.pnotify_animate_speed,p.pnotify_opacity);}if(!p.pnotify_hide){k.pnotify_cancel_remove();}else{if(!s.pnotify_hide){k.pnotify_queue_remove();}}k.pnotify_queue_position();return k;};k.pnotify_queue_position=function(){if(a){clearTimeout(a);}a=setTimeout(function(){d.pnotify_position_all;},10);};k.pnotify_display=function(){if(!k.parent().length){k.appendTo(e);}if(p.pnotify_before_open){if(p.pnotify_before_open(k)===false){return;}}k.pnotify_queue_position();if(p.pnotify_animation=="fade"||p.pnotify_animation.effect_in=="fade"){k.show().fadeTo(0,0).hide();}else{if(p.pnotify_opacity!=1){k.show().fadeTo(0,p.pnotify_opacity).hide();}}k.animate_in(function(){if(p.pnotify_after_open){p.pnotify_after_open(k);}k.pnotify_queue_position();if(p.pnotify_hide){k.pnotify_queue_remove();}});};k.pnotify_remove=function(){if(k.timer){window.clearTimeout(k.timer);k.timer=null;}if(p.pnotify_before_close){if(p.pnotify_before_close(k)===false){return;}}k.animate_out(function(){if(p.pnotify_after_close){if(p.pnotify_after_close(k)===false){return;}}k.pnotify_queue_position();if(p.pnotify_remove){k.detach();}});};k.animate_in=function(s){l="in";var r;if(typeof p.pnotify_animation.effect_in!="undefined"){r=p.pnotify_animation.effect_in;}else{r=p.pnotify_animation;}if(r=="none"){k.show();s();}else{if(r=="show"){k.show(p.pnotify_animate_speed,s);}else{if(r=="fade"){k.show().fadeTo(p.pnotify_animate_speed,p.pnotify_opacity,s);}else{if(r=="slide"){k.slideDown(p.pnotify_animate_speed,s);}else{if(typeof r=="function"){r("in",s,k);}else{if(k.effect){k.effect(r,{},p.pnotify_animate_speed,s);}}}}}}};k.animate_out=function(s){l="out";var r;if(typeof p.pnotify_animation.effect_out!="undefined"){r=p.pnotify_animation.effect_out;}else{r=p.pnotify_animation;}if(r=="none"){k.hide();s();}else{if(r=="show"){k.hide(p.pnotify_animate_speed,s);}else{if(r=="fade"){k.fadeOut(p.pnotify_animate_speed,s);}else{if(r=="slide"){k.slideUp(p.pnotify_animate_speed,s);}else{if(typeof r=="function"){r("out",s,k);}else{if(k.effect){k.effect(r,{},p.pnotify_animate_speed,s);}}}}}}};k.pnotify_cancel_remove=function(){if(k.timer){window.clearTimeout(k.timer);}};k.pnotify_queue_remove=function(){k.pnotify_cancel_remove();k.timer=window.setTimeout(function(){k.pnotify_remove();},(isNaN(p.pnotify_delay)?0:p.pnotify_delay));};k.closer=d("<div />",{"class":"ui-pnotify-closer",css:{cursor:"pointer",display:"none"},click:function(){k.pnotify_remove();k.closer.hide();}}).append(d("<span />",{"class":"ui-icon ui-icon-circle-close"})).appendTo(k.container);k.title_container=d("<div />",{"class":"ui-pnotify-title",html:p.pnotify_title}).appendTo(k.container);if(p.pnotify_title===false){k.title_container.hide();}if(p.pnotify_insert_brs&&typeof p.pnotify_text=="string"){p.pnotify_text=p.pnotify_text.replace(/\n/g,"<br />");}k.text_container=d("<div />",{"class":"ui-pnotify-text",html:p.pnotify_text}).appendTo(k.container);if(p.pnotify_text===false){k.text_container.hide();}if(typeof p.pnotify_width=="string"){k.css("width",p.pnotify_width);}if(typeof p.pnotify_min_height=="string"){k.container.css("min-height",p.pnotify_min_height);}var o=e.data("pnotify");if(o==null||typeof o!="object"){o=[];}if(p.pnotify_stack.push=="top"){o=d.merge([k],o);}else{o=d.merge(o,[k]);}e.data("pnotify",o);if(p.pnotify_after_init){p.pnotify_after_init(k);}p.pnotify_stack.animation=false;k.pnotify_display();return k;}});var j=/^on/;var c=/^(dbl)?click$|^mouse(move|down|up|over|out|enter|leave)$|^contextmenu$/;var h=/^(focus|blur|select|change|reset)$|^key(press|down|up)$/;var g=/^(scroll|resize|(un)?load|abort|error)$/;var f=function(l,k){var m;l=l.toLowerCase();if(document.createEvent&&this.dispatchEvent){l=l.replace(j,"");if(l.match(c)){d(this).offset();m=document.createEvent("MouseEvents");m.initMouseEvent(l,k.bubbles,k.cancelable,k.view,k.detail,k.screenX,k.screenY,k.clientX,k.clientY,k.ctrlKey,k.altKey,k.shiftKey,k.metaKey,k.button,k.relatedTarget);}else{if(l.match(h)){m=document.createEvent("UIEvents");m.initUIEvent(l,k.bubbles,k.cancelable,k.view,k.detail);}else{if(l.match(g)){m=document.createEvent("HTMLEvents");m.initEvent(l,k.bubbles,k.cancelable);}}}if(!m){return;}this.dispatchEvent(m);}else{if(!l.match(j)){l="on"+l;}m=document.createEventObject(k);this.fireEvent(l,m);}};d.pnotify.defaults={pnotify_nonblock:false,pnotify_type:"notice",pnotify_opacity:1,pnotify_shadow:false,pnotify_closer:true,pnotify_delay:8000,pnotify_mouse_reset:true,pnotify_remove:true,pnotify_insert_brs:true,pnotify_stack:{dir1:"down",dir2:"left",push:"bottom"}};})(jQuery);(function(a){var b=function(t,F){var O={adaptivePadding:0.05,backendServer:"",enableAutoTitle:true,enableFilename:true,enableFullscreen:true,enableGotoPage:true,enableGrid:true,enableGridSlider:true,enableKeyScroll:true,enableSpaceScroll:false,enableZoomSlider:true,fixedPadding:10,fixedHeightGrid:true,viewerFloat:"none",iipServerBaseUrl:"",maxPagesPerRow:8,maxZoomLevel:0,minPagesPerRow:2,minZoomLevel:0,onFullscreen:null,onFullscreenEnter:null,onFullscreenExit:null,onJump:null,onReady:null,onScroll:null,onScrollDown:null,onScrollUp:null,onZoom:null,onZoomIn:null,onZoomOut:null,pagesPerRow:5,protocol:"http://",tileFadeSpeed:300,tileHeight:256,tileWidth:256,viewportMargin:200,zoomLevel:2};var am=a.extend({},O,F);var p={centerX:0,centerY:0,ctrlKey:false,currentPageIndex:0,desiredXOffset:0,desiredYOfffset:0,dimAfterZoom:0,dimBeforeZoom:0,doubleClick:false,elementSelector:"",firstAjaxRequest:true,firstPageLoaded:-1,firstRowLoaded:-1,fullscreenStatusbar:null,goDirectlyTo:-1,hashParamSuffix:"",heightAbovePages:[],horizontalOffset:0,horizontalPadding:0,ID:null,inFullscreen:false,inGrid:false,itemTitle:"",lastPageLoaded:-1,lastRowLoaded:-1,maxHeight:0,maxWidth:0,mobileSafari:false,numClicks:0,numPages:0,numRows:0,pages:[],panelHeight:0,panelWidth:0,prevVptTop:0,scaleWait:false,selector:"",scrollbarWidth:0,scrollLeft:-1,scrollSoFar:0,scrollTop:-1,totalHeight:0,verticalOffset:0,verticalPadding:0,viewerXOffset:0,viewerYOffset:0,zoomInCallback:null,zoomOutCallback:null};a.extend(am,p);var V=function(ax,au){var av=am.panelHeight;var at=am.scrollSoFar-am.viewportMargin;var aw=at+av+am.viewportMargin*2;if(ax>=at&&ax<=aw){return true;}else{if(au>=at&&au<=aw){return true;}else{if(ax<=at&&au>=aw){return true;}else{return false;}}}};var n=function(at){if(a(am.selector+"page-"+at).length===0){return false;}else{return true;}};var ag=function(at){var au=am.heightAbovePages[at];var av=au+am.pages[at].h+am.verticalPadding;return V(au,av);};var x=function(at,av,ax){var au=am.heightAbovePages[at]+(av*am.tileHeight)+am.verticalPadding;var aw=au+am.tileHeight;return V(au,aw);};var Y=function(at,au){if(a(am.selector+"tile-"+at+"-"+au).length>0){return true;}else{return false;}};var y=function(aI){var aN=[];var aO=am.pages[aI].fn;var aE=am.pages[aI].r;var aG=am.pages[aI].c;var aM=am.pages[aI].w;var aJ=am.pages[aI].h;var aL=am.pages[aI].m_z;var aF,az;var aQ,av,aB,aA,aC,at,au;var aS=0;var ax=am.heightAbovePages[aI]+am.verticalPadding;if(!n(aI)){aN.push('<div id="'+am.ID+"page-"+aI+'" style="top: '+ax+"px; width: "+aM+"px; height: "+aJ+"px; left: 50%; margin-left: -"+(aM/2)+'px" class="diva-page">');}aQ=aJ-(aE-1)*am.tileHeight;av=aM-(aG-1)*am.tileWidth;var aR=[];for(aB=0;aB<aE;aB++){for(aA=0;aA<aG;aA++){var aH=aB*am.tileHeight;var ay=aA*am.tileWidth;var aD=(am.tileFadeSpeed)?"none":"inline";var aK=(aL===am.maxZoomLevel)?am.zoomLevel:am.zoomLevel+(aL-am.maxZoomLevel);aC=(aB===aE-1)?aQ:am.tileHeight;at=(aA===aG-1)?av:am.tileWidth;au=am.iipServerBaseUrl+aO+"&amp;JTL="+aK+","+aS;if(!Y(aI,aS)&&x(aI,aB,aA)){aN.push('<div id="'+am.ID+"tile-"+aI+"-"+aS+'"style="display: '+aD+"; position: absolute; top: "+aH+"px; left: "+ay+"px; background-image: url('"+au+"'); height: "+aC+"px; width: "+at+'px;"></div>');}aR.push(aS);aS++;}}if(!n(aI)){aN.push("</div>");var aw=aN.join("");a(am.innerSelector).append(aw);}else{a(am.selector+"page-"+aI).append(aN.join(""));}if(am.tileFadeSpeed){for(var aP=0;aP<aR.length;aP++){a(am.selector+"tile-"+aI+"-"+aR[aP]).fadeIn(am.tileFadeSpeed);}}};var P=function(at){if(n(at)){a(am.selector+"page-"+at).remove();}};var r=function(at){if(at>=0&&at<am.numRows){return true;}else{return false;}};var aa=function(at){if(at>=0&&at<am.numPages){return true;}else{return false;}};var ac=function(au){var av=am.heightAbovePages[au]+am.pages[au].h+am.verticalPadding;var at=am.scrollSoFar;if(av<at){return true;}else{return false;}};var d=function(at){var au=am.heightAbovePages[at];var av=am.scrollSoFar+am.panelHeight;if(au>av){return true;}else{return false;}};var ai=function(av){var au=am.rowHeight*(av+1);var at=am.scrollSoFar;if(au<at){return true;}else{return false;}};var h=function(av){var at=am.rowHeight*av;var au=am.scrollSoFar+am.panelHeight;if(at>au){return true;}else{return false;}};var X=function(at){var au=at+1;a(am.selector+"current span").text(au);if(am.inFullscreen){if(am.fullscreenStatusbar===null){i("fade");}a(am.selector+"page-number-fullscreen").text(au);}};var B=function(aw){var av=am.currentPageIndex;var at=am.currentPageIndex+parseInt(aw,10);var au=false;if(aw<0){if(at>=0&&(am.heightAbovePages[at]+am.pages[at].h+(am.verticalPadding)>=am.scrollSoFar)){au=true;}}else{if(aw>0){if(am.heightAbovePages[av]+am.pages[av].h+am.verticalPadding<am.scrollSoFar){au=true;}}}if(au){am.currentPageIndex=at;if(aw!==0){if(!B(aw)){X(at);}}return true;}else{return false;}};var w=function(aw){var at=Math.floor(am.currentPageIndex/am.pagesPerRow);var av=at+parseInt(aw,10);var au=am.scrollSoFar+(am.panelHeight/2);var ax=false;if(aw<0){if(av>=0&&(am.rowHeight*at>=au||am.rowHeight*av>=am.scrollSoFar)){ax=true;}}else{if(aw>0){if((am.rowHeight*(at+1))<am.scrollSoFar&&r(av)){ax=true;}}}if(ax){am.currentPageIndex=av*am.pagesPerRow;if(aw!==0){if(!w(aw)){X(am.currentPageIndex);}}return true;}else{return false;}};var H=function(at,au){if(au>0){if(aa(at)){if(ag(at)){y(at);am.lastPageLoaded=at;H(am.lastPageLoaded+1,au);}else{if(ac(at)){H(at+1,au);}}}else{return;}}else{if(aa(at)){if(ag(at)){y(at);am.firstPageLoaded=at;H(am.firstPageLoaded-1,au);}else{if(d(at)){H(at-1,au);}}}else{return;}}};var Q=function(at,au){if(au>0){if(aa(at)&&ac(at)){P(at);am.firstPageLoaded++;Q(am.firstPageLoaded,au);}else{return;}}else{if(aa(at)&&d(at)){P(at);am.lastPageLoaded--;Q(am.lastPageLoaded,au);}else{return;}}};var K=function(au,at){if(at>0){if(r(au)){if(ae(au)){l(au);am.lastRowLoaded=au;K(am.lastRowLoaded+1,at);}else{if(ai(au)){K(au+1,at);}}}}else{if(r(au)){if(ae(au)){l(au);am.firstRowLoaded=au;K(am.firstRowLoaded-1,at);}else{if(h(au)){K(au-1,at);}}}}};var N=function(at){if(T(at)){a(am.selector+"row-"+at).remove();}};var W=function(au,at){if(at>0){if(r(au)&&ai(au)){N(au);am.firstRowLoaded++;W(am.firstRowLoaded,at);}}else{if(r(au)&&h(au)){N(au);am.lastRowLoaded--;W(am.lastRowLoaded,at);}}};var R=function(at){if(at<0){K(am.firstRowLoaded,-1);w(-1);W(am.lastRowLoaded,-1);}else{if(at>0){W(am.firstRowLoaded,1);w(1);K(am.lastRowLoaded,1);}}};var A=function(at){if(at<0){H(am.firstPageLoaded,at);B(-1);Q(am.lastPageLoaded,at);}else{if(at>0){Q(am.firstPageLoaded,at);H(am.lastPageLoaded,at);B(1);}}if(at!==0){a.executeCallback(am.onScroll,am.scrollSoFar);if(at>0){a.executeCallback(am.onScrollDown,am.scrollSoFar);}else{a.executeCallback(am.onScrollUp,am.scrollSoFar);}}};var k=function(){if(am.goDirectlyTo>=0){ab(am.goDirectlyTo+1,am.desiredYOffset,am.desiredXOffset);X(am.goDirectlyTo);am.goDirectlyTo=-1;return true;}return false;};var U=function(){if(am.gridScrollTop){a(am.outerSelector).scrollTop(am.gridScrollTop);am.gridScrollTop=0;}else{ab(am.currentPageIndex+1);}};var g=function(){if(k()){return;}if(am.scrollLeft>=0&&am.scrollTop>=0){a(am.outerSelector).scrollTop(am.scrollTop);a(am.outerSelector).scrollLeft(am.scrollLeft);am.scrollLeft=-1;am.scrollTop=-1;return;}var ax,aw,av,at;var au=(am.dimBeforeZoom>0)?am.dimAfterZoom/am.dimBeforeZoom:1;if(am.doubleClick){ax=am.centerX*au;aw=am.centerY*au;av=Math.max((ax)-(am.panelWidth/2),0);at=Math.max((aw)-(am.panelHeight/2),0);}else{av=am.maxWidth/2-am.panelWidth/2+am.horizontalPadding;at=am.verticalOffset*au;}am.prevVptTop=0;a(am.outerSelector).scrollTop(at);a(am.outerSelector).scrollLeft(av);};var j=function(au,at){a.ajax({url:am.backendServer+"&z="+au,cache:true,context:this,dataType:"json",success:function(av){am.pages=av.pgs;am.maxWidth=av.dims.max_w;am.maxHeight=av.dims.max_h;if(am.firstAjaxRequest){q(av,au);}c();a.executeCallback(at,av);am.firstAjaxRequest=false;}});};var q=function(aw,ax){am.itemTitle=aw.item_title;am.numPages=aw.pgs.length;am.maxZoomLevel=(am.maxZoomLevel>0&&am.maxZoomLevel<=aw.max_zoom)?am.maxZoomLevel:aw.max_zoom;if(ax>am.maxZoomLevel){ax=0;}a(am.selector+"current label").text(am.numPages);a(am.selector+"goto-page-fullscreen input").attr("placeholder",am.numPages);if(am.enableAutoTitle){a(am.elementSelector).prepend('<div id="'+am.ID+'title">'+am.itemTitle+"</div>");}var av=parseInt(a.getHashParam("p"+am.hashParamSuffix),10);if(!am.enableFilename&&aa(av)){am.goDirectlyTo=av;}var au=a.getHashParam("i"+am.hashParamSuffix);var at=o(au);if(am.enableFilename&&at>=0){am.goDirectlyTo=at;}};var T=function(at){if(a(am.selector+"row-"+at).length>0){return true;}else{return false;}};var ae=function(av){var au=am.rowHeight*av;var at=au+am.rowHeight+am.fixedPadding;return V(au,at);};var l=function(aA){if(T(aA)){return;}var az;var at=(am.rowHeight)*aA+am.fixedPadding;var aw=[];aw.push('<div id="'+am.ID+"row-"+aA+'" style="width: 100%; height: '+am.rowHeight+"; position: absolute; top: "+at+'px;">');for(az=0;az<am.pagesPerRow;az++){var ax=aA*am.pagesPerRow+az;if(!aa(ax)){break;}var au=am.pages[ax].fn;var aB=(am.fixedHeightGrid)?(am.rowHeight-am.fixedPadding)*am.pages[ax].w/am.pages[ax].h:am.gridPageWidth;var ay=(am.fixedHeightGrid)?am.rowHeight-am.fixedPadding:aB/am.pages[ax].w*am.pages[ax].h;var av=parseInt(az*(am.fixedPadding+am.gridPageWidth)+am.fixedPadding,10);aB=parseInt(aB,10);ay=parseInt(ay,10);av+=(am.fixedHeightGrid)?(am.gridPageWidth-aB)/2:0;var aC=am.iipServerBaseUrl+au+"&amp;HEI="+(ay+2)+"&amp;CVT=JPG";aw.push('<div id="'+am.ID+"page-"+ax+'" class="diva-page" style="width: '+aB+"px; height: "+ay+"px; left: "+av+'px; display: inline;"><div style="position: absolute; background-image: url(\''+aC+"'); background-repeat: no-repeat; width: "+aB+"px; height: "+ay+'px;"></div></div>');}a(am.innerSelector).append(aw.join(""));};var f=function(){j(0,function(av){if(am.enableGridSlider){I();}var aw=am.fixedPadding*(am.pagesPerRow+1);var at=(am.panelWidth-aw)/am.pagesPerRow;am.gridPageWidth=at;am.rowHeight=(am.fixedHeightGrid)?am.fixedPadding+av.dims.min_ratio*at:am.fixedPadding+av.dims.max_ratio*at;am.numRows=Math.ceil(am.numPages/am.pagesPerRow);am.totalHeight=am.numRows*am.rowHeight+am.fixedPadding;a(am.innerSelector).css("height",Math.round(am.totalHeight));a(am.innerSelector).css("width",Math.round(am.panelWidth));U();am.scrollSoFar=a(am.outerSelector).scrollTop();for(var au=0;au<am.numPages;au+=am.pagesPerRow){var ax=Math.floor(au/am.pagesPerRow);if(ae(ax)){am.firstRowLoaded=(am.firstRowLoaded<0)?ax:am.firstRowLoaded;l(ax);am.lastRowLoaded=ax;}}});};var c=function(){a(am.outerSelector).scrollTop(0);am.scrollSoFar=0;a(am.innerSelector).text("");am.firstPageLoaded=0;am.firstRowLoaded=-1;};var ar=function(at){j(at,function(ax){if(at>ax.max_zoom){at=0;}if(am.adaptivePadding>0){am.horizontalPadding=ax.dims.a_wid*am.adaptivePadding;am.verticalPadding=ax.dims.a_hei*am.adaptivePadding;}else{am.horizontalPadding=am.fixedPadding;am.verticalPadding=am.fixedPadding;}am.totalHeight=ax.dims.t_hei+am.verticalPadding*(am.numPages+1);am.zoomLevel=at;am.dimAfterZoom=am.totalHeight;if(am.enableZoomSlider){S();}var au=0;for(var av=0;av<am.numPages;av++){am.heightAbovePages[av]=au;au=am.heightAbovePages[av]+am.pages[av].h+am.verticalPadding;if(ag(av)){y(av);am.lastPageLoaded=av;}}a(am.innerSelector).css("height",Math.round(am.totalHeight));var aw=(ax.dims.max_w+am.horizontalPadding*2<am.panelWidth)?am.panelWidth:ax.dims.max_w+am.horizontalPadding*2;a(am.innerSelector).css("width",Math.round(aw));g();if(!am.firstAjaxRequest){if(am.dimBeforeZoom!==am.dimAfterZoom){a.executeCallback(am.onZoom,at);if(am.dimBeforeZoom>am.dimAfterZoom){a.executeCallback(am.onZoomOut,at);a.executeCallback(am.zoomOutCallback,at);am.zoomOutCallback=null;}else{a.executeCallback(am.onZoomIn,at);a.executeCallback(am.zoomInCallback,at);am.zoomInCallback=null;}}else{a.executeCallback(am.onFullscreen,at);}}else{a.executeCallback(am.onReady);}am.dimBeforeZoom=am.dimAfterZoom;if(am.scaleWait){am.scaleWait=false;}});};var ah=function(){am.scrollSoFar=a(am.outerSelector).scrollTop();A(am.scrollSoFar-am.prevVptTop);am.prevVptTop=am.scrollSoFar;};var aq=function(){am.scrollSoFar=a(am.outerSelector).scrollTop();R(am.scrollSoFar-am.prevVptTop);am.prevVptTop=am.scrollSoFar;};var J=function(at){if(am.zoomLevel!=at&&at>=am.minZoomLevel&&at<=am.maxZoomLevel){ar(at);a(am.selector+"zoom-slider").slider({value:at});return true;}else{a.executeCallback(am.zoomInCallback,am.zoomLevel);a.executeCallback(am.zoomOutCallback,am.zoomLevel);am.zoomOutCallback=null;am.zoomInCallback=null;return false;}};var af=function(at){am.verticalOffset=a(am.outerSelector).scrollTop();am.horizontalOffset=a(am.outerSelector).scrollLeft();if(am.inGrid){e(true);}am.doubleClick=false;J(at);};var ab=function(at,au,av){if(!au){var au=1;}if(!av){var av=0;}if(am.inGrid){var ay=Math.ceil(at/am.pagesPerRow)-1;if(r(ay)){var ax=ay*am.rowHeight;a(am.outerSelector).scrollTop(ax);X(at-1);am.currentPageIndex=at-1;return true;}}else{pageIndex=at-1;if(aa(pageIndex)){var ax=am.heightAbovePages[pageIndex]+au;X(pageIndex);a(am.outerSelector).scrollTop(ax);var aw=(av>0)?av:(a(am.innerSelector).width()-am.panelWidth)/2;a(am.outerSelector).scrollLeft(aw);a.executeCallback(am.onJump,at);return true;}}return false;};var L=function(au){var at;if(am.zoomLevel===am.maxZoomLevel){if(au.ctrlKey||am.ctrlKey){at=am.zoomLevel-1;}else{return;}}else{if(am.zoomLevel===am.minZoomLevel){if(au.ctrlKey||am.ctrlKey){return;}else{at=am.zoomLevel+1;}}else{if(au.ctrlKey||am.ctrlKey){at=am.zoomLevel-1;}else{at=am.zoomLevel+1;}}}am.numClicks=0;am.centerX=(au.pageX-am.viewerXOffset)+a(am.outerSelector).scrollLeft();am.centerY=(au.pageY-am.viewerYOffset)+a(am.outerSelector).scrollTop();am.doubleClick=true;J(at);};var E=function(at){at.preventDefault();};var M=function(au){var at=am.zoomLevel;if(au.scale>1&&at<am.maxZoomLevel){at++;}else{if(au.scale<1&&at>am.minZoomLevel){at--;}else{return;}}am.scaleWait=true;af(at);};var v=function(){am.verticalOffset=a(am.outerSelector).scrollTop();am.horizontalOffset=a(am.outerSelector).scrollLeft();am.doubleClick=false;a(am.innerSelector).text("");if(am.inFullscreen){Z();}else{aj();}am.panelWidth=parseInt(a(am.outerSelector).width(),10)-am.scrollbarWidth;am.panelHeight=parseInt(a(am.outerSelector).height(),10);a(am.innerSelector).width(am.panelWidth);if(am.inGrid){f();}else{ar(am.zoomLevel);}};var aj=function(){if(am.fullscreenStatusbar===null){i("none");}a(am.selector+"fullscreen").css("position","fixed").css("z-index","9001");a(am.outerSelector).addClass("fullscreen");am.inFullscreen=true;a("body").css("overflow","hidden");a.executeCallback(am.onFullscreenEnter);var at;a(window).resize(function(){clearTimeout(at);at=setTimeout(function(){am.panelHeight=parseInt(a(am.outerSelector).height(),10);am.panelWidth=parseInt(a(am.outerSelector).width(),10);A(1);},10);});};var Z=function(){if(am.fullscreenStatusbar!==null){am.fullscreenStatusbar.pnotify({pnotify_animation:"none"});am.fullscreenStatusbar.pnotify_remove();am.fullscreenStatusbar=null;}a(am.outerSelector).removeClass("fullscreen");am.inFullscreen=false;a(am.selector+"fullscreen").css("position","absolute").css("z-index","8999");a.executeCallback(am.onFullscreenExit);};var z=function(){if(am.inGrid){e();}else{D();}};var D=function(){am.desiredXOffset=ap();am.desiredYOffset=ao();am.inGrid=true;f();};var e=function(at){am.gridScrollTop=a(am.outerSelector).scrollTop();am.inGrid=false;if(am.goDirectlyTo<0){am.goDirectlyTo=am.currentPageIndex;}if(!at){ar(am.zoomLevel);}};var G=function(){if(am.enableGrid){a(am.selector+"grid-icon").click(function(){z();});}if(am.enableFullscreen){a(am.selector+"fullscreen").click(function(){v();});}a(am.innerSelector).mouseover(function(){a(this).removeClass("grabbing").addClass("grab");});a(am.innerSelector).mouseout(function(){a(this).removeClass("grab");});a(am.innerSelector).mousedown(function(){a(this).removeClass("grab").addClass("grabbing");});a(am.innerSelector).mouseup(function(){a(this).removeClass("grabbing").addClass("grab");});a(am.outerSelector+", "+am.innerSelector).dragscrollable({dragSelector:".dragger",acceptPropagatedEvent:true});a(am.outerSelector).scroll(function(){if(am.inGrid){aq();}else{ah();}});a(am.outerSelector).bind("contextmenu",function(az){var aA=az.originalEvent;if(aA.ctrlKey){am.ctrlKey=true;am.numClicks++;if(am.numClicks>1){L(az);am.numClicks=0;}aA.preventDefault();aA.stopPropagation();am.ctrlKey=false;}});a(am.outerSelector).dblclick(function(aB){am.viewerXOffset=a(this).offset().left;am.viewerYOffset=a(this).offset().top;if(am.inGrid){var aD=(aB.pageX-am.viewerXOffset)+a(am.outerSelector).scrollLeft();var aC=(aB.pageY-am.viewerYOffset)+a(am.outerSelector).scrollTop();var aE=Math.floor(aC/am.rowHeight);var aA=Math.floor(aD/(am.panelWidth/am.pagesPerRow));var az=aE*am.pagesPerRow+aA;am.desiredXOffset=0;am.desiredYOffset=0;am.goDirectlyTo=az;e();}else{L(aB);}});if(am.mobileSafari){a(am.outerSelector).oneFingerScroll();var au=[];au.push('<meta name="viewport" content="user-scalable=no, width=device-width" />');au.push('<meta name="apple-mobile-web-app-capable" content="yes" />');au.push('<meta name="apple-mobile-web-app-status-bar-style" content="black" />');a("head").append(au.join("\n"));a("body").bind("touchmove",function(az){var aA=az.originalEvent;E(aA);});a("body").bind("gestureend",function(az){var aA=az.originalEvent;if(!am.scaleWait){if(am.inGrid){e();}else{M(aA);}}return false;});}if(am.enableSpaceScroll||am.enableKeyScroll){var av=a.ui.keyCode.SPACE;var at=a.ui.keyCode.PAGE_UP;var ay=a.ui.keyCode.PAGE_DOWN;var ax=a.ui.keyCode.HOME;var aw=a.ui.keyCode.END;a(document).keydown(function(az){if((am.enableSpaceScroll&&az.keyCode==av)||(am.enableKeyScroll&&az.keyCode==ay)){a(am.outerSelector).scrollTop(am.scrollSoFar+am.panelHeight);return false;}if(am.enableKeyScroll&&az.keyCode==at){a(am.outerSelector).scrollTop(am.scrollSoFar-am.panelHeight);return false;}if(am.enableKeyScroll&&az.keyCode==ax){a(am.outerSelector).scrollTop(0);return false;}if(am.enableKeyScroll&&az.keyCode==aw){a(am.outerSelector).scrollTop(am.totalHeight);return false;}});}};var i=function(av){var at=(am.enableGrid)?'<div id="'+am.ID+'grid-icon-fullscreen"></div>':"";var au={pnotify_text:'<form id="'+am.ID+'goto-page-fullscreen"><input placeholder="'+am.numPages+'" type="text" size="4" id="'+am.ID+'goto-input-fullscreen" /><input type="submit" value="Go"></form><div id="'+am.ID+'tools-fullscreen" style="height: 60px;"></div><div id="'+am.ID+'link-fullscreen"><a href="">Link</a></div>',pnotify_title:at+'Page: <span id="'+am.ID+'page-number-fullscreen">'+(am.currentPageIndex+1)+"</span>",pnotify_history:false,pnotify_width:"160px",pnotify_hide:false,pnotify_notice_icon:"",pnotify_animation:av,pnotify_before_close:function(){am.fullscreenStatusbar=null;}};am.fullscreenStatusbar=a.pnotify(au);a(am.selector+"link-fullscreen a").click(function(){a("body").prepend('<div id="'+am.ID+'link-popup-fullscreen"><input id="'+am.ID+'link-popup-input-fullscreen" class="diva-input" value="'+C()+'" /></div>');var aw=a("div.ui-pnotify").offset();a(am.selector+"link-popup-fullscreen").css("left",aw.left+"px").css("top",(aw.top+a("div.ui-pnotify").height()+5)+"px");a("body").mouseup(function(ay){var ax=ay.target.id;if(ax!==am.ID+"link-popup-fullscreen"&&ax!==am.ID+"link-popup-input-fullscreen"){a(am.selector+"link-popup-fullscreen").remove();}});a(am.outerSelector).scroll(function(){a(am.selector+"link-popup-fullscreen").remove();});return false;});a(am.selector+"grid-icon-fullscreen").click(function(){z();});if(am.inGrid&&am.enableGridSlider){I();}else{if(am.enableZoomSlider){S();}}a(am.selector+"goto-page-fullscreen").submit(function(){var aw=parseInt(a(am.selector+"goto-input-fullscreen").val(),10);if(!ab(aw)){alert("Invalid page number");}return false;});};var S=function(){a(am.selector+"slider").remove();a(am.selector+"slider-label").remove();var at=(am.inFullscreen)?"tools-fullscreen":"tools";a(am.selector+at).prepend('<div id="'+am.ID+'slider"></div>');a(am.selector+"slider").slider({value:am.zoomLevel,min:am.minZoomLevel,max:am.maxZoomLevel,step:1,slide:function(au,av){af(av.value);}});a(am.selector+"slider").after('<div id="'+am.ID+'slider-label">Zoom level: <span>'+am.zoomLevel+"</span></div>");};var I=function(){a(am.selector+"slider").remove();a(am.selector+"slider-label").remove();var at=(am.inFullscreen)?"tools-fullscreen":"tools";a(am.selector+at).prepend('<div id="'+am.ID+'slider"></div>');a(am.selector+"slider").slider({value:am.pagesPerRow,min:am.minPagesPerRow,max:am.maxPagesPerRow,step:1,slide:function(au,av){u(av.value);}});a(am.selector+"slider").after('<div id="'+am.ID+'slider-label">Pages per row: <span>'+am.pagesPerRow+"</span></div>");};var u=function(at){am.pagesPerRow=at;D();};var ad=function(){a(am.selector+"tools").prepend('<div id="'+am.ID+'grid-icon"></div>');};var s=function(){a(am.selector+"tools").append('<form id="'+am.ID+'goto-page">Go to page <input type="text" size="3" id="'+am.ID+'goto-input" /> <input type="submit" value="Go" /><br /><div id="'+am.ID+'current">Current page: <span>1</span> of <label></label> <a href="" id="'+am.ID+'link">(link)</a></div></form>');a(am.selector+"link").click(function(){var at=a(am.outerSelector).offset().left+am.panelWidth;a("body").prepend('<div id="'+am.ID+'link-popup"><input id="'+am.ID+'link-popup-input" class="diva-input" type="text" value="'+C()+'"/></div>');a(am.selector+"link-popup").css("top",a(am.outerSelector).offset().top+"px").css("left",(at-298)+"px");a("body").mouseup(function(av){var au=av.target.id;if(au==am.ID+"link-popup"||au==am.ID+"link-popup-input"){}else{a(am.selector+"link-popup").remove();}});a(am.outerSelector).scroll(function(){a(am.selector+"link-popup").remove();});return false;});a(am.selector+"goto-page").submit(function(){var at=parseInt(a(am.selector+"goto-input").val(),10);if(!ab(at)){alert("Invalid page number");}return false;});};var o=function(at){for(var au=0;au<am.numPages;au++){if(am.pages[au].fn==at){return au;}}return -1;};var ao=function(){var at=a(am.outerSelector).scrollTop();var au=am.heightAbovePages[am.currentPageIndex];return parseInt(at-au,10);};var ap=function(){return a(am.outerSelector).scrollLeft();};var an=function(){var at={f:am.inFullscreen,g:am.inGrid,z:am.zoomLevel,n:am.pagesPerRow,i:am.currentPageIndex,y:(am.inGrid)?am.documentLeftScroll:ao(),x:(am.inGrid)?am.documentLeftScroll:ap(),gy:(am.inGrid)?a(am.outerSelector).scrollTop():am.gridScrollTop,h:am.panelHeight,w:am.panelWidth+am.scrollbarWidth};return at;};var al=function(){var at=an();var au=at.i;at.i=(am.enableFilename)?am.pages[au].fn:au+1;var av=[];for(var aw in at){if(at[aw]){av.push(aw+am.hashParamSuffix+"="+at[aw]);}}return av.join("&");};var C=function(){return am.protocol+location.host+location.pathname+"#"+al();};var m=function(au,at){if(au>=am.minWidth&&at>=am.minHeight){a(am.outerSelector).width(au);a(am.outerSelector).height(at);am.panelHeight=at;am.panelWidth=au-am.scrollbarWidth;a(am.outerSelector).css("float",am.viewerFloat);a(am.parentSelector).width(au);if(am.inGrid){f();}}};var ak=function(){am.scrollbarWidth=a.getScrollbarWidth();am.mobileSafari=navigator.platform=="iPad"||navigator.platform=="iPhone"||navigator.platform=="iPod";am.elementSelector="#"+a(t).attr("id");am.ID=a.generateId("diva-");am.selector="#"+am.ID;var ax=parseInt(am.ID,10);if(ax>1){am.hashParamSuffix=ax;}am.outerSelector=am.selector+"outer";am.innerSelector=am.selector+"inner";if(am.zoomSlider||am.enableGotoPage||am.enableGrid){a(am.elementSelector).prepend('<div id="'+am.ID+'tools"></div>');}if(am.enableGotoPage){s();}if(am.enableGrid){ad();}a(am.elementSelector).append('<div id="'+am.ID+'outer"></div>');a(am.outerSelector).append('<div id="'+am.ID+'inner" class="dragger"></div>');if(am.mobileSafari){am.panelWidth=screen.width-am.scrollbarWidth;if(navigator.platform=="iPad"){am.panelHeight=screen.height-170;}else{am.panelHeight=screen.height-250;}a(am.elementSelector).css("width",am.panelWidth);a(am.outerSelector).css("width",am.panelWidth+"px");a(am.outerSelector).css("height",am.panelHeight+"px");}else{am.panelWidth=parseInt(a(am.elementSelector).width(),10)-18;a(am.outerSelector).css("width",(am.panelWidth+18)+"px");am.panelHeight=parseInt(a(am.outerSelector).height(),10);}if(am.enableFullscreen){a(am.elementSelector).prepend('<div id="'+am.ID+'fullscreen"></div>');}var aB=parseInt(a.getHashParam("n"+am.hashParamSuffix),10);if(aB>=am.minPagesPerRow&&aB<=am.maxPagesPerRow){am.pagesPerRow=aB;}var aw=a.getHashParam("z"+am.hashParamSuffix);if(aw!==""){aw=parseInt(aw,10);if(aw>=am.minZoomLevel){am.zoomLevel=aw;}}var au=parseInt(a.getHashParam("y"+am.hashParamSuffix),10);if(au>0){am.desiredYOffset=au;}var aC=parseInt(a.getHashParam("x"+am.hashParamSuffix),10);if(aC>0){am.desiredXOffset=aC;}var ay=a.getHashParam("f"+am.hashParamSuffix);if(ay==="true"&&am.enableFullscreen){v();}var av=parseInt(a.getHashParam("gy"+am.hashParamSuffix),10);if(av>0){am.gridScrollTop=av;}var at=parseInt(a.getHashParam("h"+am.hashParamSuffix),10);var aA=parseInt(a.getHashParam("w"+am.hashParamSuffix),10);am.minHeight=parseInt(a(am.outerSelector).css("min-height"));am.minWidth=parseInt(a(am.outerSelector).css("min-width"));if(at>0||aA>0){m(aA,at);}var az=a.getHashParam("g"+am.hashParamSuffix);if(az==="true"&&am.enableGrid){z();}if(!am.inFullscreen&&!am.inGrid){ar(am.zoomLevel);}G();};ak();this.getItemTitle=function(){return am.itemTitle;};this.gotoPage=function(at){return ab(at);};this.getCurrentPage=function(){return am.currentPageIndex;};this.getZoomLevel=function(){return am.zoomLevel;};this.zoomIn=function(at){am.zoomInCallback=at;return J(am.zoomLevel+1);};this.zoomOut=function(at){am.zoomOutCallback=at;return J(am.zoomLevel-1);};this.inViewport=function(av,ax,au){var at=av-1;var ay=am.heightAbovePages[at]+ax;var aw=ay+au;return V(ay,aw);};this.gotoPageByName=function(at){for(var au=0;au<am.numPages;au++){if(am.pages[au].fn==at){ab(au);return true;}}return false;};this.getCurrentURL=function(){return C();};this.getURLHash=function(){return al();};this.getState=function(){return an();};this.setState=function(at){am.gridScrollTop=at.gy;am.goDirectlyTo=(isNaN(at.i))?o(at.i):at.i;am.desiredXOffset=at.x;am.desiredYOffset=at.y;if(at.g){am.zoomLevel=at.z;if(am.inGrid){if(am.pagesPerRow===at.n){U();}else{u(at.n);}}else{am.pagesPerRow=at.n;am.inGrid=true;f();}}else{am.pagesPerRow=at.n;if(am.inGrid){am.zoomLevel=at.z;e();}else{if(am.zoomLevel===at.z){g();}else{J(at.z);}}}if(am.panelHeight!==at.h||(am.panelWidth+am.scrollbarWidth)!==at.w){m(at.h,at.w);}};this.resize=function(au,at){m(au,at);};};a.fn.diva=function(c){return this.each(function(){var e=a(this);if(e.data("diva")){return;}c.parentSelector=e;var d=new b(this,c);e.data("diva",d);});};})(jQuery);