define([
    'angularAMD',
    'modules/oms/content/service'
], function(angularAMD){
    'use strict';

    angularAMD.controller('ShowVideoCtrl', function($scope, contentService,$sce){
        //var showVideoCtrl = $scope.showVideoCtrl ={}  ;

        //var submitted = false;
        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        console.log("$scope.ngDialogData;",$scope.ngDialogData);
        //$scope.urlId = $scope.ngDialogData.urlId;
        var urlId = $scope.ngDialogData.urlId;
        var location = $scope.ngDialogData.location;
        var vodurls = $scope.vodurls = {id:urlId,location:location};
        console.log("vodurls",vodurls);
        contentService.showVideo(vodurls).then(function(resp){
            console.log('showVideo resp',resp);
            $scope.location = resp.data.location;
            play();

            console.log("$scope.location",$scope.location)
        },function(){

        });

        //视频播放
        var _self = this;
        this.currentTime = 0;
        this.totalTime = 0;
        this.state = null;
        this.volume = 1;
        this.isCompleted = false;
        this.API = null;
        this.onPlayerReady = function (API) {
            _self.API = API;
        };
       function play(){
           _self.config = {
                autoHide: false,
                autoHideTime: 3000,
                autoPlay: false,
                sources: [
                    //{src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/videos/videogular.ogg"), type: "video/ogg"}
                    {src: $sce.trustAsResourceUrl($scope.location), type: "video/mp4"}
                ],
                loop: false
            };
        }

    });

});
