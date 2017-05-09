define(['../module'], function(module){
	'use strict';

	module.controller('PermissionEditCtrl', function($scope, ManageService){
		var permissionEditCtrl = $scope.permissionEditCtrl = {};
		
		var submitted = false;

		$scope.errorMessage = '';
		$scope.title = $scope.ngDialogData.title;
		var perm = $scope.perm = $scope.ngDialogData.perm;

		permissionEditCtrl.checkCloseDialog = function(){
			$scope.errorMessage = '';
			submitted = true;

			ManageService.savePermission(perm).then(function(){
				$scope.closeThisDialog();
			},function(msg){
				// error handle
				console.info('checkCloseDialog failed',msg);
				$scope.errorMessage = msg;
			});
		};

	});

});