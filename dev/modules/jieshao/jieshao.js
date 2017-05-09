define([
    'angularAMD',
    'modules/jieshao/service'
], function(angularAMD, videojs){
    'use strict';

    angularAMD.controller('JieshaoCtrl', function($scope, VideoService, $controller, $sce){

        //var showVideoCtrl = $scope.showVideoCtrl ={}  ;
        $controller('BaseCtrl', { $scope: $scope });
        $scope.title = $scope.ngDialogData.title;
        $scope.location = $scope.ngDialogData.location;


    });

});
