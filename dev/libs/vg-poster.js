"use strict";angular.module("com.2fdevs.videogular.plugins.poster",[]).run(["$templateCache",function(a){a.put("vg-templates/vg-poster",'<img ng-src="{{vgUrl}}" ng-class="API.currentState">')}]).directive("vgPoster",[function(){return{restrict:"E",require:"^videogular",scope:{vgUrl:"=?"},templateUrl:function(a,b){return b.vgTemplate||"vg-templates/vg-poster"},link:function(a,b,c,d){a.API=d,d.isConfig&&a.$watch("API.config",function(){a.API.config&&(a.vgUrl=a.API.config.plugins.poster.url)})}}}]);