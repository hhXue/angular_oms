define([
    'angularAMD',
    'modules/oms/client/service',
    'jquery'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('TabEditCtrl', function($scope, clientService) {
        var tabEditCtrl = $scope.tabEditCtrl = {};


        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        var tablet = $scope.tablet = $scope.ngDialogData.item;
        $scope.app = $scope.ngDialogData.item;
        var id = tablet.id;
        $scope.isShow = 0;
        $scope.typeApp = 'tab';


        if(angular.isUndefined(id)){
            tablet.tabType = 0;
        }

        if (tablet.id == null) {
            $scope.ngDialogData.item = {};
        }



        $scope.checkCloseDialog = function() {
            $scope.tablet.appId = tablet.appId;
            console.log('tablet', tablet,$scope.tablet);
            $scope.errorMessage = '';
            $scope.submitted = true;
            //$scope.itemService = clientService.setName('target');
            if (!clientService.isEmptyObject($scope.myform)) {
                //return;
                clientService.saveItem($scope.tablet, $scope).then(function (data) {
                    $scope.submitStatus = false;
                    console.log('length',$scope.tabVersion.length,tablet.appId.length,tablet,$scope.tabVersion);
                    $scope.closeThisDialog(data);
                }, function (error) {
                        $scope.submitStatus = false;
                    $scope.errorMessage = error;
                });
            }
        };

        //获取功能模块
        clientService.getClientModels(0).then(function(resp) {
            console.log('showTarget resp', resp);
            $scope.clientModels = resp.data;
        }, function(error) {
            console.log('error',error);
        });


        //模块选择
        $scope.toggleCheck = function(id) {
            if(angular.isUndefined($scope.tablet.modelId)){
                $scope.tablet.modelId = [];
            }
            console.log('$scope.tablet.modelId', $scope.tablet.modelId,id);
            if ($scope.tablet.modelId.indexOf(id) > -1) {
                $scope.tablet.modelId.splice($scope.tablet.modelId.indexOf(id), 1);
            } else {
                $scope.tablet.modelId.push(id);
            }
            console.log('$scope.tablet.modelId', $scope.tablet.modelId, $scope.tablet.modelId.toString());
        };
    });

});
