define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService) {
    'use strict';

    angularAMD.service('AppsService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q) {

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
                "userName": "userName",

                "cloneAId":"cloneAId",
                "appsUpdateStatus":"appsUpdateStatus",
                "areaId":"areaId",
                "isAll":"isAll"
            },
            "video": {
                "id": "videoId",
                "name": "videoName",
                "areaId":"areaId"
            },
            "appKey":{
                "id": "appKeyId",
                "name": "appKeyName",
                "keyType":"type",
                "description": "description",
                "appKey": "appKey",
                "secret": "Secret",
                "status": "status",
                "userName": "userName",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",

                "package":"package",
                "isAll":"isAll"
            },
            "area": {
                "id": "areaId",
                "name": "areaName",
                "areaNote":"areaNote",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "userId": "userId",
                "refName":"refName",
                "refId":"refId"
            },
            "market":{
                'id': 'id',
                'marketId': 'marketId',
                'name': "marketName",
                'note': "marketNote",
                'createdAt': 'createdAt',
                'updatedAt': 'updatedAt',
                'isAll':'isAll'
            }
        };

        var appsService = new BaseService(config, $http, $q, mapping);

        appsService.getVideo = function(type, currentPage) {
            var url;
            if (type == 0) {
                url = config.httpBaseUrl + '/apps/video?videoStatus=1&videoType=' + type + '&currentPage=' + currentPage
            } else if(type == 1) {
                url = config.httpBaseUrl + '/apps/video?videoStatus=1'+ '&currentPage=' + currentPage;
            }
            else if( type == 2){
                url = config.httpBaseUrl + '/tablet/index?isAll=1';
            }

            var that = this;
            var d = that.$q.defer();
            $http({
                url: url,
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

        appsService.getVideoList = function(params, type) {

            console.log('this.name===', this.name);
            var that = this;
            var d = that.$q.defer();
            var url;
            /*获取栏目*/
            if (type == 0) {
                params.videoStatus = 1;
                params.videoType = type;
                url = that.httpBaseUrl + '/apps/video'
            }
            /*获取频道*/
            if( type == 1){
                params.videoStatus = 1;
                url = that.httpBaseUrl + '/apps/video'
            }
            /*获取模块*/
            if(type==2){
                url = that.httpBaseUrl + '/tablet/index';
            }
            $http({
                url: url,
                method: "GET",
                params: params,
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/json'
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

        appsService.getRelation = function(appid, type) {
            console.log('type==',type);

            var url,params;
            url = config.httpBaseUrl + '/appRelation/index';
            /*获取版本关联的栏目*/
            if(type==0) {
                params = {
                    isAll:1,
                    appRelationType:0,
                    appId:appid
                }
            }
            /*获取版本关联的频道*/
            else if(type==1) {
                params = {
                    isAll:1,
                    isApp:1,
                    appRelationType:1,
                    appId:appid
                }
            }
            /*获取版本关联的模块*/
            else if(type==2) {
                params = {
                    isAll:1,
                    appRelationType:22,
                    appId:appid
                }
            }

            var that = this;
            var d = that.$q.defer();
            $http({
                url: url,
                method: 'GET',
                params:params,
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //分类获取关联频道

        appsService.getCategoryRelation = function(appid, type) {
            console.log('type==',type);

            var url,params;
            url = config.httpBaseUrl + '/videoCategory/index';
            /*获取版本关联的栏目*/
            if(type==1) {
                params = {
                    isAll:1,
                    categoryId:appid
                }
            }

            var that = this;
            var d = that.$q.defer();
            $http({
                url: url,
                method: 'GET',
                params:params,
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        appsService.getRoleList = function(params) {
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/apps/index',
                params:params,
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

        appsService.getUpdateGrades = function(id) {
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/apps/upgrades/'+id,

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

        appsService.saveUpGrades = function(item,scope){
            var that = this;
            var method = 'POST';
            var url = '';
            var name = that.name;

            scope.submitStatus = true;

            //item = that.changeFromLocalColumns(item);
            console.log('item===',item)
            return that.$http({
                url: that.httpBaseUrl + '/' + name + '/upgrades/'+item.appverId,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        appsService.getMarketList = function(params) {
            var that = this;
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/market/index',
                params:params,
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows,mapping['market']);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        appsService.saveRelation = function(item, scope) {
            var that = this;
            var method ;
            var url;
            if(item.categoryId){
                method = 'POST';
                url = config.httpBaseUrl + '/videoCategory/create';
            }else{
                method = 'PATCH';
                url = config.httpBaseUrl + '/appRelation/appupdate';
            }


            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        //change appKey status
        appsService.changeStatu = function(item,scope){
            var that = appsService;
            var method = '';
            var url = '';
            var name = that.name;
            scope.submitStatus = true;
            if (!_.isUndefined(item['id'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/' + name + '/updatestatus/' + item['id'];
            }
            item = that.changeFromLocalColumns(item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };
        //get appKey
        appsService.getAppKey = function(){
            var that = this;
            var d = $q.defer();
            $http({
                url:that.httpBaseUrl + '/appKey/appkey',
                method:'GET',
                headers:{
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
        //appKey get video
        appsService.getAppVideo = function(id, pageNumber, params){
            var that = this;

            var d = that.$q.defer();

            //params = params ? that.changeFromLocalColumns(params) : {};

            params.currentPage = pageNumber;
            that.$http({
                url:config.httpBaseUrl + '/appKey/video?appKeyId='+id,
                method:'GET',
                params: params,
                headers:{
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
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
        //appKey get vod
        appsService.getAppVod = function( id, pageNumber, params){
            var that = this;

            var d = that.$q.defer();

            //params = params ? that.changeFromLocalColumns(params) : {};
            params.currentPage = pageNumber;
            that.$http({
                url:config.httpBaseUrl + '/appKey/vod?appKeyId='+id,
                method:'GET',
                params: params,
                headers:{
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
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
        //get 同一应用下的版本
        appsService.getApp_version = function( params){
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
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        }



        return appsService;
    }]);

});
