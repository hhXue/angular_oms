define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService) {
    'use strict';

    angularAMD.service('clientService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q, $scope) {
        var mapping = {
            "client": {
                "id": "videoId",
                "name": "videoName"
            },
            "tablet": {
                "id": "tabletId",
                "modelId": "modelId",
                "tabName": "tabletName",
                "tabApi": "apiName",
                "weight": "tabletSort",
                "tabletStatus": "tabletStatus",
                "tabletLock": "tabletLock",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "userId": "userId",
                "userName": "userName",
                //新增字段
                "tabType": "tabletType",
                "appId": "appId"
            },
            "target": {
                "id": "targetId",
                "tabletId": "tabletId",
                "name": "targetName",
                "userName": "userName",
                "appId": "appId",
                "data": "data",
                "delModelId": "delModelId",
                "userId": "userId",
                "status": "status",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "video": {
                "id": "videoId",
                "name": "videoName",
                "videoType": "videoType",
                "imgUrl": "videoImage",
                "status": "videoStatus",
                "intro": "intro",
                "recomm": "recomm",
                "videoCategory": "videoCategory"
            },
            "apps": {
                "id": "appsId",
                "version": "appsAppVersion",
                "name": "appsAppOs",
                "appKeyName":"appKeyName"
            },
            "appRelation": {
                "appRelationId": "appRelationId",
                "refId": "refId",
                "id": "appId",
                "userId": "userId",
                "type": "type",
                "targetId": "targetId",
                "version": "appsAppVersion",
                "name": "appsAppOs",
                "noAppId": "noAppId",
                "appKeyName":"appKeyName"
            },
            "radio": {
                "id": "id",
                "videoId": "videoId",
                "videoName": "videoName",
                "sort": "sort",
                "status": "status",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "customApi": {
                "id": "customApiId",
                "name": "customName",
                "apiName": "customApiName",
                "status": "customStatus",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "userId": "userId",
                "userName": "userName",
                "appId": "appId",
                "customValue": "customValue",
                "areaId":"areaId",
                "isAll":"isAll"
            }
        };

        var clientService = new BaseService(config, $http, $q, mapping);

        clientService.editData = function(id) {
            var that = this;
            var d = that.$q.defer();
            that.$http({
                url: that.httpBaseUrl + '/target/show/' + id,
                method: "GET",
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        clientService.getAppRelaction = function(pageNumber, params, tabletId) {

            var that = this;

            var d = that.$q.defer();

            console.log(params, tabletId);

            if (typeof tabletId == "undefined" || tabletId == null) {
                tabletId = angular.copy(params.tabletId);
            }

            params = params ? that.changeFromLocalColumns(params) : {};
            params.currentPage = pageNumber;

            that.$http({
                url: that.httpBaseUrl + '/apps/targetappindex?tabletId=' + tabletId,
                method: "GET",
                params: params,
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };



        clientService.appByTarget = function(pageNumber, params) {

            var that = this;

            var d = that.$q.defer();

            params = params ? that.changeFromLocalColumns(params) : {};
            params.currentPage = pageNumber;

            that.$http({
                url: that.httpBaseUrl + '/apps/targetappindex',
                method: "GET",
                params: params,
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        clientService.getModelData = function(url, targetId, appId) {

            var that = this;
            var d = that.$q.defer();
            var URL;
            if (typeof appId == "undefined" || appId == null) {

                URL = that.httpBaseUrl + '/preview/' + url + '/' + targetId;

            } else {
                URL = that.httpBaseUrl + '/preview/' + url + '/' + targetId + "/" + appId;
            }
            that.$http({
                url: URL,
                method: "GET",
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        clientService.saveShow = function(item, scope) {
            var that = clientService;
            var method = '';
            var url = '';
            var name = that.name;
            scope.submitStatus = true;
            if (!_.isUndefined(item['id'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/' + name + '/onoroff/' + item['id'] + '/' + item['tabletStatus'];
            }
            item = that.changeFromLocalColumns(item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        clientService.getClientModels = function(tabletId) {
            var that = clientService;
            var method = '';
            var url = '';

            method = 'GET';
            if (tabletId == 0) {
                url = that.httpBaseUrl + '/target/clientmodel';
            } else {
                url = that.httpBaseUrl + '/target/clientmodel?tabletId=' + tabletId;
            }
            return that.$http({
                url: url,
                method: method,
                withCredentials: true

            });
        };
        //get all area
        clientService.getAreaList = function() {
            var that = clientService;
            var method = 'GET';
            var url = that.areaUrl + '/area/index';

            return that.$http({
                url: url,
                method: method,
                withCredentials: true

            });
        };

        clientService.versionEach = function(params) {

            var that = clientService;
            var method = '';
            var url = '';
            var name = that.name;

            method = 'PATCH';
            url = that.httpBaseUrl + '/appRelation/appupdate';

            return that.$http({
                url: url,
                method: method,
                data: params,
                withCredentials: true
            });
        };


        clientService.targetTab = function(pageNumber, params) {

            var that = this;
            var d = that.$q.defer();
            that.$http({
                url: that.httpBaseUrl + '/tablet/index',
                method: "GET",
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        ///admin
        clientService.versionByTarget = function(targetId) {
            var that = this;

            var d = that.$q.defer();

            that.$http({
                url: that.httpBaseUrl + '/target/appversion/' + targetId,
                method: "GET",
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        clientService.getResultsPage = function(pageNumber, params, type) {

            var urlIndex = "";
            if (type == 0) {
                urlIndex = "indexfornormal";
            } else {
                urlIndex = "indexfornormalvod";
            }

            var that = this;
            var d = that.$q.defer();
            params = params ? that.changeFromLocalColumns(params) : {};
            params.currentPage = pageNumber;

            that.$http({
                url: that.httpBaseUrl + '/' + that.name + '/' + urlIndex + "?isAll=true",
                method: "GET",
                params: params,
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };
        //audio api
        clientService.updateStatus = function(item, scope) {
            var that = clientService;
            var method = '';
            var url = '';
            var name = that.name;
            scope.submitStatus = true;
            if (!_.isUndefined(item['id'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/' + name + '/update/' + item['id'];
            }
            item = that.changeFromLocalColumns(item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        clientService.saveOrder = function(list, scope) {
            var that = this;
            var method = '';
            var url = '';
            var name = that.name;
            scope.submitStatus = true;
            var data = list;
            method = 'POST';
            url = that.httpBaseUrl + '/' + name + '/sort';

            return that.$http({
                url: url,
                method: method,
                data: data,
                withCredentials: true
            });
        };

        //tmp api
        clientService.saveTmp = function(item, scope) {
            var that = clientService;
            var method = '';
            var url = '';
            var name = that.name;
            scope.submitStatus = true;
            if (!_.isUndefined(item['id'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/' + name + '/update/' + item['id'];
            }
            item = that.changeFromLocalColumns(item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        clientService.getTmpVersion = function() {
            var that = clientService;
            var method = '';
            var url = '';

            method = 'GET';
            url = that.httpBaseUrl + '/apps/index?isAll=1';

            return that.$http({
                url: url,
                method: method,
                withCredentials: true

            });
        };

        clientService.showVeision = function(id) {
            var that = clientService;
            var params = {refId:id, appRelationType: 21 , isAll:1};

            //params = that.changeFromLocalColumns(params);
            //var method = '';
            //var url = '';
            //
            //method = 'GET';
            //url = that.httpBaseUrl + '/appRelation/index';
            //
            //return that.$http({
            //    url: url,
            //    method: method,
            //    params: params,
            //    withCredentials: true
            //
            //});


            var d = $q.defer();

            $http({
                url: that.httpBaseUrl + '/appRelation/index',
                method: "GET",
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: params,
                withCredentials: true
            }).then(function(resp) {
                //resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };
        //tab管理获取版本列表
        clientService.showTabVeision = function(id) {
            var that = clientService;
            var params = {
                refId: id,
                appRelationType: 22,
                isAll:1
            };
            console.log("params", params);

            var d = $q.defer();

            $http({
                url: that.httpBaseUrl + '/appRelation/index',
                method: "GET",
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: params,
                withCredentials: true
            }).then(function(resp) {
                //resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //获取所有应用
        clientService.getApp = function(){
            var that = this;
            var d = $q.defer();
            $http({
                url:that.httpBaseUrl + '/appKey/index',
                method:'GET',
                headers:{
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows,mapping['appKey']);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //get 同一应用下的版本
        clientService.getApp_version = function( params){
            var that = this;

            var d = that.$q.defer();

            that.$http({
                url: that.httpBaseUrl + '/apps/index',
                method: "GET",
                params: params,
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows,mapping['apps']);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //自定义管理根据app id获取应用
        clientService.getAppsByVersionId = function(id) {
            var that = this;
            var method = 'GET';
            var url = '';
            var d = that.$q.defer();

            url = that.httpBaseUrl + '/appRelation/index';


            that.$http({
                url: url,
                method: method,
                params: {
                    refId: id,
                    appRelationType: 21,
                    isAll:1
                },
                withCredentials: true
            }).then(function(resp) {
                //resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };
        //根据tab id获取应用
        clientService.getTabByVersionId = function(id) {
            var that = this;
            var method = 'GET';
            var url = '';
            var d = that.$q.defer();

            url = that.httpBaseUrl + '/appRelation/index';


            that.$http({
                url: url,
                method: method,
                params: {
                    refId: id,
                    appRelationType: 22,
                    isAll:1
                },
                withCredentials: true
            }).then(function(resp) {
                //resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };
        //根据ID获取返回值
        clientService.getValue = function(id) {
            var that = this;
            var method = 'GET';
            var url = '';
            var d = that.$q.defer();

            url = that.httpBaseUrl + '/' + that.name + '/show/' + id;


            that.$http({
                url: url,
                method: method,
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };
        return clientService;
    }]);
});