define([
    'angularAMD',
    'modules/oms/basic/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('MarketEditCtrl', function($scope, BasicsService) {
        var marketEditCtrl = $scope.marketEditCtrl = {};

        $scope.submitted = false;

        $scope.errorMessage = '';
        console.log('$scope.ngDialogData', $scope.ngDialogData);

        $scope.title = $scope.ngDialogData.title;
        var market = $scope.market = $scope.ngDialogData.item;

        //初始化
        marketEditCtrl.init = function() {
            if (market.id == null) {
                $scope.ngDialogData.item = {};
            }
        };

        //保存数据
        marketEditCtrl.checkCloseDialog = function() {
            $scope.errorMessage = '';
            $scope.submitted = true;

            if (!BasicsService.isEmptyObject($scope.myform.$error)) {
                return;
            }

            market = angular.copy($scope.market);

            BasicsService.saveItem(market , $scope).then(function(data) {
                $scope.closeThisDialog(data);
                $scope.submitStatus = false;
            }, function(error) {
                $scope.submitStatus = false;
                $scope.errorMessage = error;
            });
        };

        marketEditCtrl.init();

    });

});
