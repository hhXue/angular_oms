define([
    'angularAMD',
    'modules/oms/content/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('VodEditCtrl', function($scope, contentService, StarsUtils) {
        var vodEditCtrl = $scope.vodEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        var vod = $scope.vod = $scope.ngDialogData.item;
        console.log('vod====',typeof vod.vip);
        if(typeof vod.vip == 'undefined'){
            vod.vip = 0;
        }
        $scope.typeSrc = {
            1: "自制",
            2: "第三方"
        };
        $scope.typeState = {
            1: "上线",
            2: "下线"
        };

        vodEditCtrl.checkCloseDialog = function() {
            $scope.errorMessage = '';
            submitted = true;
            console.log('vod2222====',vod);
            //return;
            contentService.saveItem(vod, $scope).then(function(data) {
                $scope.submitStatus = false;
                $scope.closeThisDialog(data);
            }, function(error) {
                $scope.submitStatus = false;
                $scope.errorMessage = error;
            });
        };
        //save


    });

});
