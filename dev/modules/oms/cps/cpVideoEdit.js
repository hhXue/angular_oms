define([
   'angularAMD',
   'modules/oms/cps/service'
], function(angularAMD){
    'use strict';

    angularAMD.controller('CpsVideoEditCtrl', function($scope, CpsService,$stateParams,StarsUtils){

        var cpsVideoEditCtrl = $scope.cpsVideoEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        $scope.videoList = [];
        //var id = $scope.ngDialogData.id;

        //search video
        cpsVideoEditCtrl.refreshVideos = function(name){
            CpsService.getVideoList(name).then(function(resp){
                $scope.videoList = resp.data.rows;
                $scope.id = resp.data.rows.id;
                console.log('videoList',$scope.videoList);

            },function(error){
                console.log('error',error);
            });
        };
        var id = $stateParams.cpId;

        var cpVideo = $scope.cpVideo = {cpId:id};

        cpsVideoEditCtrl.checkCloseDialog = function(){
            $scope.errorMessage = '';

            submitted = true;
            console.log("cpVideo,$scope.id",cpVideo,cpVideo.videoId);
            //cpVideo.videoId = $stateParams.videoId;
            //console.info('program',program.startTime);
            if(angular.isUndefined(cpVideo.videoId )){
                StarsUtils.alert('频道不存在！');
                return;
            }
            $scope.submitStatus = true;

            CpsService.saveCpVideo(cpVideo).then(function(data){
                $scope.submitStatus = false;
                console.log("cpVideo",cpVideo);
                $scope.closeThisDialog(data);

            },function(error){
                $scope.submitStatus = false;
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
            });

        };
    });

});
