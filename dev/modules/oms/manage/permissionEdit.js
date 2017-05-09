define([
   'angularAMD',
   'modules/oms/manage/service'
], function(angularAMD){
    'use strict';

    angularAMD.controller('PermissionEditCtrl', function($scope, PermissionService){
        var permissionEditCtrl = $scope.permissionEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        console.log('$scope.ngDialogData',$scope.ngDialogData);

        $scope.title = $scope.ngDialogData.title;
        var permission = $scope.permission = $scope.ngDialogData.item;

        permissionEditCtrl.checkCloseDialog = function(){
            console.log('checkCloaseDialog');
            $scope.errorMessage = '';
            submitted = true;
            PermissionService.saveItem(permission , $scope).then(function(data){
                    $scope.submitStatus = false;
                $scope.closeThisDialog(data);
            },function(error){
                    $scope.submitStatus = false;
                // error handle
                console.info('checkCloseDialog failed',error);
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
            });
        };
    });
});
