define(['../module', './service', 'utils'], function(module){
	'use strict';
	module.controller('PermissionCtrl', ['$scope', 'ManageService', 'ngDialog', 'usSpinnerService', 'StarsUtils',
        function($scope, ManageService, ngDialog, usSpinnerService, StarsUtils){

        $scope.loading_list = true;
        $scope.processing_delete = false;
        $scope.search_error = false;

		var permissionsCtrl = $scope.permissionsCtrl = {};
		var permissions = $scope.permissions = [];

        ManageService.getPermissions().then(function(data){
            console.log('getpermissions',data);
            ManageService.permissions = data;
            $scope.loading_list = false;
            $scope.permissions = data;
        },function(data){
            $scope.loading_list = false;
            alert('error');
        });
        console.info('permissions',permissions);

		permissionsCtrl.createNew = function(){
			console.info('createNew',ngDialog);
			var ngdialog = ngDialog.open({
				template: 'modules/oms/manage/permissionEdit.html',
				data: {title:"添加权限",perm:{}},
				controller:'PermissionEditCtrl'
			});

			// ngdialog.closePromise.then(function(data){
			// 	console.info('closePromise',data);
			// 	ManageService.savePermission(data);
			// });
		};


		permissionsCtrl.editItem = function(perm){
			var ngdialog = ngDialog.open({
				template: 'modules/oms/manage/permissionEdit.html',
				data: {title:"编辑权限",perm:perm},
				controller:'PermissionEditCtrl'
			});

			ngdialog.closePromise.then(function(data){
				ManageService.savePermission(data);
			});
		};

		permissionsCtrl.deleteItem = function(id, e){
            StarsUtils.confirm('确定删除吗？','删除','不删除') .then(function(){
                $scope.processing_delete = true;

                var target = e.currentTarget || e.target;
                angular.element(target).css('display','none').next().css('display','inline-block');
                usSpinnerService.spin('spinner_'+id);

                ManageService.deletePermission(id).then(function(list){
                    console.log('delete in ctrl',list);
                    $scope.permissions = list;
                },function(reason){
                    StarsUtils.alert('删除失败:'+reason);
                    $scope.processing_delete = true;

                    var target = e.currentTarget || e.target;
                    angular.element(target).css('display','inline-block').next().css('display','none');
                    usSpinnerService.stop('spinner_'+id);
                });
            })


		};

        permissionsCtrl.search = function(){
            $scope.search_error = true;
        };

	}]);

});