angular.module("ngDraggable",[]).service("ngDraggable",["$window",function(a){var b=function(a){return"undefined"!=typeof a};this.getEventProp=function(a,c,d){return b(a.touches)&&a.touches[0]?a.touches[0][c]:b(a[c])?a[c]:a.originalEvent&&!d?this.getEventProp(a.originalEvent,c,!0):void 0},this.getPrivOffset=function(c){var d={top:0,left:0};return b(c[0].getBoundingClientRect)&&(d=c[0].getBoundingClientRect()),{top:d.top+a.pageYOffset-c[0].clientTop,left:d.left+a.pageXOffset-c[0].clientLeft}}}]).directive("ngDrag",["$rootScope","$parse","$document","$window","ngDraggable",function(a,b,c,d,e){return{restrict:"A",link:function(f,g,h){f.value=h.ngDrag;var i,j,k,l,m,n,o,p=!1,q="ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch,r="touchstart mousedown",s="touchmove mousemove",t="touchend mouseup",u=f.$id,v=null,w=!1,x=null,y=b(h.ngDragSuccess)||null,z=function(){g.attr("draggable","false"),A(!0)},A=function(a){a&&(f.$on("$destroy",B),f.$watch(h.ngDrag,D),f.$watch(h.ngCenterAnchor,E),f.$watch(h.ngDragData,C),g.on(r,G),q||"img"!=g[0].nodeName.toLowerCase()||g.on("mousedown",function(){return!1}))},B=function(a){A(!1)},C=function(a,b){v=a},D=function(a,b){w=a},E=function(a,b){angular.isDefined(a)&&(p=a||"true")},F=function(a){return angular.isDefined(angular.element(a.target).attr("ng-click"))||angular.isDefined(angular.element(a.target).attr("ng-dblclick"))||angular.isDefined(angular.element(a.target).attr("ng-cancel-drag"))},G=function(a){w&&(F(a)||(q?(H(),x=setTimeout(function(){H(),I(a)},100),c.on(s,H),c.on(t,H)):I(a)))},H=function(){clearTimeout(x),c.off(s,H),c.off(t,H)},I=function(b){w&&(b.preventDefault(),g.addClass("dragging"),i=e.getPrivOffset(g),g.centerX=g[0].offsetWidth/2,g.centerY=g[0].offsetHeight/2,j=e.getEventProp(b,"pageX"),k=e.getEventProp(b,"pageY"),n=j-i.left,o=k-i.top,p?(l=j-g.centerX-d.pageXOffset,m=k-g.centerY-d.pageYOffset):(l=j-n-d.pageXOffset,m=k-o-d.pageYOffset),c.on(s,J),c.on(t,K),a.$broadcast("draggable:start",{x:j,y:k,tx:l,ty:m,event:b,element:g,data:v}))},J=function(b){w&&(b.preventDefault(),j=e.getEventProp(b,"pageX"),k=e.getEventProp(b,"pageY"),p?(l=j-g.centerX-d.pageXOffset,m=k-g.centerY-d.pageYOffset):(l=j-n-d.pageXOffset,m=k-o-d.pageYOffset),N(l,m),a.$broadcast("draggable:move",{x:j,y:k,tx:l,ty:m,event:b,element:g,data:v,uid:u}))},K=function(b){w&&(b.preventDefault(),a.$broadcast("draggable:end",{x:j,y:k,tx:l,ty:m,event:b,element:g,data:v,callback:L,uid:u}),g.removeClass("dragging"),M(),c.off(s,J),c.off(t,K))},L=function(a){y&&f.$apply(function(){y(f,{$data:v,$event:a})})},M=function(){g.css({left:"",top:"",position:"","z-index":"",margin:""})},N=function(a,b){g.css({left:a+"px",top:b+"px",position:"fixed","z-index":99999})};z()}}}]).directive("ngDrop",["$parse","$timeout","$window","ngDraggable",function(a,b,c,d){return{restrict:"A",link:function(c,e,f){c.value=f.ngDrop;var g=c.$id,h=!1,i=a(f.ngDropSuccess),j=function(){k(!0)},k=function(a){a&&(f.$observe("ngDrop",m),c.$on("$destroy",l),c.$on("draggable:start",n),c.$on("draggable:move",o),c.$on("draggable:end",p))},l=function(a){k(!1)},m=function(a,b){h=c.$eval(a)},n=function(a,b){h&&q(b.x,b.y,b.element)},o=function(a,b){h&&q(b.x,b.y,b.element)},p=function(a,d){h&&g!==d.uid&&(q(d.x,d.y,d.element)&&(d.callback&&d.callback(d),b(function(){i(c,{$data:d.data,$event:d})})),r(!1,d.element))},q=function(a,b,c){var d=s(a,b);return r(d,c),d},r=function(a,b){a?(e.addClass("drag-enter"),b.addClass("drag-over")):(e.removeClass("drag-enter"),b.removeClass("drag-over"))},s=function(a,b){var c=d.getPrivOffset(e);return c.right=c.left+e[0].offsetWidth,c.bottom=c.top+e[0].offsetHeight,a>=c.left&&a<=c.right&&b<=c.bottom&&b>=c.top};j()}}}]).directive("ngDragClone",["$parse","$timeout",function(a,b){return{restrict:"A",link:function(a,b,c){var d,e=!0;a.clonedData={};var f=function(){d=b.find("img"),b.attr("draggable","false"),d.attr("draggable","false"),l(),g(!0)},g=function(b){b&&(a.$on("draggable:start",i),a.$on("draggable:move",j),a.$on("draggable:end",k),h())},h=function(){d.off("mousedown touchstart touchmove touchend touchcancel",n),d.on("mousedown touchstart touchmove touchend touchcancel",n)},i=function(c,d,f){e=!0,angular.isDefined(d.data.allowClone)&&(e=d.data.allowClone),e&&(a.$apply(function(){a.clonedData=d.data}),b.css("width",d.element[0].offsetWidth),b.css("height",d.element[0].offsetHeight),m(d.tx,d.ty))},j=function(a,b){e&&m(b.tx,b.ty)},k=function(a,b){e&&l()},l=function(){b.css({left:0,top:0,position:"fixed","z-index":-1,visibility:"hidden"})},m=function(a,c){b.css({left:a+"px",top:c+"px",position:"fixed","z-index":99999,visibility:"visible"})},n=function(a){var b=a.originalEvent;return b.preventDefault&&b.preventDefault(),b.stopPropagation&&b.stopPropagation(),b.cancelBubble=!0,b.returnValue=!1,!1};f()}}}]).directive("ngPreventDrag",["$parse","$timeout",function(a,b){return{restrict:"A",link:function(a,b,c){var d=function(){b.attr("draggable","false"),e(!0)},e=function(a){a&&b.on("mousedown touchstart touchmove touchend touchcancel",f)},f=function(a){var b=a.originalEvent;return b.preventDefault&&b.preventDefault(),b.stopPropagation&&b.stopPropagation(),b.cancelBubble=!0,b.returnValue=!1,!1};d()}}}]).directive("ngCancelDrag",[function(){return{restrict:"A",link:function(a,b,c){b.find("*").attr("ng-cancel-drag","ng-cancel-drag")}}}]);