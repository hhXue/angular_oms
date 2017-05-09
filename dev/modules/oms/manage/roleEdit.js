define([
   'angularAMD',
   'modules/oms/manage/service'
], function(angularAMD) {
    'use strict';

    function isEmptyObject(obj) {
        for (var n in obj) {
            return false
        }
        return true;
    }

    //修改权限控制器
    angularAMD.controller('roleEditCtrl', function($scope, manageService, $rootScope) {
        var roleEditCtrl = $scope.roleEditCtrl = {};
        $scope.submitted = false;
        $scope.errorMessage = '';
        $scope.userNameChecked = '';
        $scope.title = $scope.ngDialogData.title;
        $scope.item = $scope.ngDialogData.item;

        if (typeof($scope.item.roleName) != "undefined") {
            //临时保存角色名 修改时补验证是否唯一
            var temporaryName = angular.copy($scope.item.roleName);
        } else {
            $scope.item = {};
        }

        //修改用户角色名称
        roleEditCtrl.saveRole = function() {
            if (manageService.isEmptyObject($scope.myform.userName.$error)) {
                roleEditCtrl.ckRole($scope.item.roleName);
            }
            $scope.submitted = true;
        }

        //验证角色是否唯一
        roleEditCtrl.ckRole = function(rolename) {

            if (temporaryName == rolename) {
                manageService.saveItem($scope.item,$scope).then(function(data) {
                        $scope.submitStatus = false;
                    $scope.closeThisDialog(data);
                }, function(error) {
                        $scope.submitStatus = false;
                    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                });
                return;
            }


            //调用service接口数据库交互
            manageService.ckRole({
                roleName: rolename
            }).then(function(data) {
                $scope.roleNameCk = "no";
            }, function(error) {
                if (rolename.length > 0) {
                    //调用service接口数据库交互
                    manageService.saveItem($scope.item,$scope).then(function(data) {
                        $scope.closeThisDialog(data);
                    }, function(error) {
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    });
                }
            });
        }

    });

});
