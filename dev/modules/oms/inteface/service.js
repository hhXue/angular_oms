define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService) {
    'use strict';

    angularAMD.service('intefaceService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q) {
        var mapping = {
            "web": {
                "id": "appsId",
                "appid": "appsAppId",
                "version": "appsAppVersion",
                "appsUserId": "appsUserId",
                "appsCreatedAt": "appsCreatedAt",
                "appsDescription": "appsDescription",
                "appsIsAds": "appsIsAds",
                "appsIsReview": "appsIsReview",
                "appsIsUpdate": "appsIsUpdate",
                "appsTargetVersion": "appsTargetVersion",
                "appsUpdateMessage": "appsUpdateMessage",
                "appsAppSource": "appsAppSource",
                "name": "appsAppOs",
                "appsUpdatedAt": "appsUpdatedAt"
            },
             "ios": {
                "id": "appsId",
                "appid": "appsAppId",
                "version": "appsAppVersion",
                "appsUserId": "appsUserId",
                "appsCreatedAt": "appsCreatedAt",
                "appsDescription": "appsDescription",
                "appsIsAds": "appsIsAds",
                "appsIsReview": "appsIsReview",
                "appsIsUpdate": "appsIsUpdate",
                "appsTargetVersion": "appsTargetVersion",
                "appsUpdateMessage": "appsUpdateMessage",
                "appsAppSource": "appsAppSource",
                "name": "appsAppOs",
                "appsUpdatedAt": "appsUpdatedAt",
                 "appKeyName":"appKeyName",
                 "appKey":"appKey"
            },
             "android": {
                "id": "appsId",
                "appid": "appsAppId",
                "version": "appsAppVersion",
                "appsUserId": "appsUserId",
                "appsCreatedAt": "appsCreatedAt",
                "appsDescription": "appsDescription",
                "appsIsAds": "appsIsAds",
                "appsIsReview": "appsIsReview",
                "appsIsUpdate": "appsIsUpdate",
                "appsTargetVersion": "appsTargetVersion",
                "appsUpdateMessage": "appsUpdateMessage",
                "appsAppSource": "appsAppSource",
                "name": "appsAppOs",
                "appsUpdatedAt": "appsUpdatedAt",
                 "appKeyName":"appKeyName",
                 "appKey":"appKey"
            }
            //"apps": {
            //    "id": "appsId",
            //    "appsAppId": "appsAppId",
            //    "appsAppVersion": "appsAppVersion",
            //    "appsUserId": "appsUserId",
            //    "appsCreatedAt": "appsCreatedAt"
            //},
        };

        var intefaceService = new BaseService(config, $http, $q, mapping);

        intefaceService.getWebApi = function() {
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/web/show',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };

        intefaceService.getServerApi = function() {
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/server/show',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };

        intefaceService.getIosApi = function(name,version, appKey) {
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/ios/show?appOs='+name+'&appVer='+version+'&appKey='+appKey,
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        intefaceService.getAndroidApi = function(name,version, appKey) {
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/android/show?appOs='+name+'&appVer='+version+'&appKey='+appKey,
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };



        return intefaceService;
    }]);

});