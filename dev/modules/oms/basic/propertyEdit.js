define([
    'angularAMD',
    'modules/oms/basic/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('PropertyEditCtrl', function($scope, BasicsService) {
        var propertyEditCtrl = $scope.propertyEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';

        $scope.title = $scope.ngDialogData.title;
        var property = $scope.property = $scope.ngDialogData.item;

        if(property.id ==null){
             $scope.ngDialogData.item = {};
        }

        propertyEditCtrl.init = function() {

            $scope.options = [{
                id: 1,
                name: "基础属性"
            }, {
                id: 2,
                name: "频道属性"
            }, {
                id: 3,
                name: "栏目属性"
            }];

            if (typeof $scope.ngDialogData.item.id != "undefined") {
                $scope.property.propertyType = $scope.options[$scope.property.propertyType-1];
            } else {
                $scope.property.propertyType = $scope.options[0];
            }
        }

        propertyEditCtrl.checkCloseDialog = function() {

            $scope.errorMessage = '';
            $scope.submitted = true;

            if (!BasicsService.isEmptyObject($scope.myform.$error)) {
                return;
            }

            $scope.property.propertyType = $scope.property.propertyType.id;

            BasicsService.saveItem($scope.property,$scope).then(function(data) {
                $scope.submitStatus = false;
                $scope.closeThisDialog(data);
            }, function(error) {
                $scope.submitStatus = false;
                // error handle
                console.info('checkCloseDialog failed', error);
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
            });
        };

        propertyEditCtrl.init();

    });

});
