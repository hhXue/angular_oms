define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService) {
    'use strict';

    angularAMD.service('roleService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q) {

        var mapping = {
            "apps": {
                "id": "appsId",
                "appsAppId": "appsAppId",
                "appVersion": "appsAppVersion",
                "appsUserId": "appsUserId",
                "appsCreatedAt": "appsCreatedAt",
                "appsUpdatedAt": "appsUpdatedAt",
                "appsDescription": "appsDescription",
                "appsIsAds": "appsIsAds",
                "appsIsReview": "appsIsReview",
                "appsIsUpdate": "appsIsUpdate",
                "appsTargetVersion": "appsTargetVersion",
                "appsUpdateMessage": "appsUpdateMessage",
                "appsAppSource": "appsAppSource",
                "appsAppOs": "appsAppOs",
                "userName": "userName"
            }
        };
        
        var roleService = new BaseService(config, $http, $q, mapping);
        //获取权限列表
        roleService.getRoleList = function(pageNumber, params) {
            params = params ? params : {};
            params.currentPage = pageNumber;

            return $http({
                url: config.httpBaseUrl + '/role/index',
                method: "GET",
                params: params,
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });
        }
        //更新角色名称
        roleService.upRole = function(roleId,params) {
               return $http({
                url: config.httpBaseUrl + '/role/update/'+roleId,
                method: "PATCH",
                params: params,
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });
        }
        //新增角色
         roleService.addRole = function(params) {
               return $http({
                url: config.httpBaseUrl + '/role/create',
                method: "POST",
                params: params,
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });
        }
        //验证角色名唯一
        roleService.ckRole = function(params) {
               return $http({
                url: config.httpBaseUrl + '/role/rolename',
                method: "POST",
                params: params,
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });
        }
        //删除角色
         roleService.delRole = function(params) {
        
               return $http({
                url: config.httpBaseUrl + '/role/dels/'+params,
                method: "DELETE",
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            });
        }

        return roleService;
    }]);

});