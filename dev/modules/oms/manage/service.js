define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService) {
    'use strict';



    angularAMD.service('manageService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q) {
        var mapping = {
            "role": {
                "roleCreatedAt": "roleCreatedAt",
                "id": "roleId",
                "roleName": "roleName",
                "roleUpdatedAt": "roleUpdatedAt"
            },
            "permission": {
                "permissionId": "permissionId",
                "permissionName": "permissionName",
                "permissionDisplayName": "permissionDisplayName",
                "permissionControllerName": "permissionControllerName",
                "permissionCreatedAt": "permissionCreatedAt",
                "permissionUpdatedAt": "permissionUpdatedAt"
            },
            "user": {
                "id": 'userId',
                "userName": "userName",
                "userPassword": "userPassword",
                "userPersonName": "userPersonName",
                "userUnitName": "userUnitName",
                "userEmail": "userEmail",
                "userTelephone": "userTelephone",
                "userStatus": "userStatus",
                "CreatedAt": "userStatus",
                "UpdatedAt": "UpdatedAt",
                "roleId": "roleId",
                "roleName": "roleName"
            },
            "permissions": {
                "id": "permissionId",
                "permissionName": "permissionName",
                "permissionControllerName": "permissionControllerName",
                "permissionDisplayName": "permissionDisplayName"
            }
        };

        var manageService = new BaseService(config, $http, $q, mapping);

        //获取权限列表
        manageService.getPowerByRoleId = function(roleid) {
            var that = this;
            var d = $q.defer();
            $http({
                url: that.httpBaseUrl + '/permissionrole/show/' + roleid,
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //获取用户详细信息
        manageService.getUserById = function(userId) {
            var that = this;
            var d = that.$q.defer();
            $http({
                url: that.httpBaseUrl + '/user/show/' + userId,
                method: 'GET',
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);

            }, function(error) {
                d.reject(error);
            });
            return d.promise;


        }

        //获取权限
        manageService.getRoleForLogin = function() {
            var that = this;
            var d = $q.defer();
            $http({
                url: that.httpBaseUrl + '/role/alllist',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //验证名称是否唯一
        manageService.checkExist = function(params) {
            var that = this;
            var d = $q.defer();

            $http({
                url: that.httpBaseUrl + '/user/verifyname',
                method: 'POST',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true,
                params: params,
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };

        //验证角色名唯一
        manageService.ckRole = function(params) {
                var that = this;
                return $http({
                    url: that.httpBaseUrl + '/role/rolename',
                    method: "POST",
                    params: params,
                    headers: {
                        'Authorization': 'Basic fdfwoeigjiewoe',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                });
            }
            //设置角色权限
        manageService.savePower = function(roleid, powerList) {
            var that = this;
            var d = $q.defer();
            var strArry = "[" + powerList.toString() + "]";
            var params = {
                permissionroleId: roleid,
                permissionsids: strArry
            };
            
            // var params = {permissionroleId:roleid,permissionsids:powerList}

            $http({
                url: that.httpBaseUrl + '/permissionrole/update/' + roleid,
                method: 'PATCH',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: params,
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        return manageService;
    }]);
});