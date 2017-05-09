define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService) {
    'use strict';

    angularAMD.service('contentService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q) {
        var mapping = {
            "video": {
                "id": "videoId",
                "name": "videoName",
                "videoType": "videoType",
                "description": "description",
                "videoDuration": "videoDuration",
                "videoStatus": "videoStatus",
                "area": "area",
                "urlSource": "urlSource",
                "videoSize": "videoSize",
                "firstChar": "firstChar",
                "videoOfflinetime": "videoOfflinetime",
                "videoOnlinetime": "videoOnlinetime",
                "score": "score",
                "videoRecord": "videoRecord",
                "videoEpg": "videoEpg",
                "images": "images",
                "videoUrl": "videoUrl",
                "userId": "userId",
                "videoCp": "videoCp",
                "categoryList": "videoCategory",
                "videoTag": "videoTag",
                "videoApp": "appRelation",
                "createdAt": "createdAt",
                "chargeType": "chargeType",
                "chargeTypeName":"chargeTypeName",
                "updatedAt": "updatedAt",
                "videoImage": "videoImage",
                "videoShareImage": "videoShareImage",
                "videoTvImage": "videoTvImage",

                "vip":"vip",
                "relationEpg":'relationEpg',
                "areaId":"areaId"
            },
            //频道管理中源数据
            "liverSource":{
                "sourceId":"lsId",
                "sourceName":"lsName",
                "location":"location"
            },

            //频道管理中地域数据
            "area":{
                "id":"areaId",
                "name":"areaName"
            },

            "videoEpg": {
                "id": "videoId",
                "name": "videoName",
                "videoEpgSrc": "videoEpgSrc",
                "userId": "userId",
                "epgVideoId": "epgVideoId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "category": {
                "id": "categoryId",
                "name": "categoryName",
                "userId": "userId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "categoryType": "categoryType"
            },
            "cps": {
                "id": "cpId",
                "cpStatus": "cpStatus",
                "sortNum": "sortNum",
                "userId": "userId",
                "name": "cpName",
                "cpImage": "cpImage",
                "cpUrl": "cpUrl",
                "cpDescription": "cpDescription",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "program": {
                "id": "epgId",
                "programName": "epgName",
                "showId": "showId",
                "columnName": "showName",
                "startDate": "startDate",
                "startTime": "startTime",
                "userId": "userId",
                "videoId": "videoId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "vod": {
                "id": "videoId",
                "videoName": "videoName",
                "videoType": "videoType",
                "fromSrc": "fromSrc",
                "description": "description",
                "videoStatus": "videoStatus",
                "isDownload": "isDownload",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "showAttribute": "showAttribute",
                "offlineNum": "offlineNum",
                "onlineNum": "onlineNum",
                "userId": "userId",
                "images": "images",
                "chargeType": "chargeType",
                "name":"chargeTypeName",
                "score":"score",
                "introduction":"intro",
                "recommendation":"recomm",

                "vip":"vip",
                "areaId":"areaId"
            },
            "vodurls": {
                "id": "urlId",
                "title": "title",
                "location": "location",
                "urlStatus": "urlStatus",
                "urlSort": "urlSort",
                "isDownload": "isDownload",
                "duration": "duration",
                "urlType": "urlType",

                "vip":"vip"
            },
            "videoUrl": {
                "id": "urlId",
                "title": "title",
                "userId": "userId",
                "videoId": "videoId",
                "location": "location",
                "urlStatus": "urlStatus",
                "urlType": "urlType",
                "isDownload": "isDownload",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",

                "vip":"vip"
            },
            //属性
            "property": {
                "id": "propertyId",
                "propertyName": "propertyName",
                "type": "propertyType",
                "userId": "userId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "typeName": "typeName",
                "isAll": "isAll"
            },
            "propertyValue": {
                "id": "refId",
                "propertyName": "propertyName",
                "propertyId": "propertyId",
                "type": "type",
                "value": "value",
                "valueId": "valueId",
                "isAll": "isAll"
            },
            //标签：
            "tag": {
                "id": "tagId",
                "name": "tagName",
                "userId": "userId",
                "tagPid": "tagPid",
                "tagOrigin": "tagOrigin",
                "type": "tagType",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "isAll": "isAll"
            },
            "videoTag": {
                "videoTagId": "videoTagId",
                "id": "videoId",
                "tagId": "tagId",
                "userId": "userId",
                "tagName": "tagName",
                "isAll": "isAll"
            },
            //应用：Contens/AppRelation
            "apps": {
                //"id": "appsId",
                "appsId": "appsId",
                "appsAppId": "appsAppId",
                //"version": "appsAppVersion",
                "appsAppVersion": "appsAppVersion",
                "appsUserId": "appsUserId",
                "appsCreatedAt": "appsCreatedAt",
                "appsDescription": "appsDescription",
                "appsIsAds": "appsIsAds",
                "appsIsReview": "appsIsReview",
                "appsIsUpdate": "appsIsUpdate",
                "appsTargetVersion": "appsTargetVersion",
                "appsUpdateMessage": "appsUpdateMessage",
                "appsAppSource": "appsAppSource",
                //"name": "appsAppOs",
                "appsAppOs": "appsAppOs",
                "appsUpdatedAt": "appsUpdatedAt",
                "userName": "userName",
                "isAll": "isAll",
                "appKey": "appKey",
                "appKeyName":"appKeyName"
            },
            //"appRelation": {
            //    "appRelationId": "appRelationId",
            //    "id": "refId",
            //    "appId": "appId",
            //    "userId": "userId",
            //    "appRelationType": "appRelationType",
            //    "appsAppVersion": "appsAppVersion",
            //    "appsAppOs": "appsAppOs",
            //    "isAll": "isAll"
            //},
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
            "bulkurlonline": {
                "ids": "ids"
            },
            "market":{
                'id': 'id',
                'marketId': 'marketId',
                'videoId':'videoId',
                'name': "marketName",
                'note': "marketNote",
                'createdAt': 'createdAt',
                'updatedAt': 'updatedAt'
            },
            "marketRelation":{
                //"id": "id",
                "videoId": "videoId",
                "marketId": "marketId",
                "areaId":"areaId",
                "appKey":"appKey",
                "time":"time"
                //"startTime": "startTime",
                //"endTime": "endTime",
                //"reason": "reason"
            }
        };

        var contentService = new BaseService(config, $http, $q, mapping);

        contentService.editData = function(id) {
            var that = this;

            var d = that.$q.defer();

            that.$http({
                url: that.httpBaseUrl + '/video/show/' + id,
                method: "GET",
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //获取频道关联应用
        contentService.videoApp = function(id) {
            var that = contentService;
            var method = '';
            var url = '';

            method = 'GET';
            url = that.httpBaseUrl + '/video/videoappkey/'+id;

            return that.$http({
                url: url,
                method: method,
                withCredentials: true

            });
        };


        //频道管理 获取总的源列表
        contentService.getSourceList = function(pageNumber, params){
            //contentService.setHttpBaseUrl( config.sourceServeUrl );
            var that = this;

            var d = that.$q.defer();

            params = params ? that.changeFromLocalColumns(params) : {};
            params.currentPage = pageNumber;

            that.$http({
                url: that.sourceServeUrl + '/' + that.name,
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

        };
        //频道管理 获取保存的源数据
        contentService.showSourceList = function(id){
            contentService.setHttpBaseUrl( config.sourceServeUrl );
            var that = this;
            var d = that.$q.defer();
            that.$http({
                url: that.httpBaseUrl + '/liverSource/show/' + id,
                method: "GET",
                header: {
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

        //计费类型列表
        contentService.getChargetype = function(id) {
            var that = this;
            var d = that.$q.defer();
            that.$http({
                url: that.httpBaseUrl + '/video/chargetype',
                method: "GET",
                header: {
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
        contentService.showVideoCharge = function(id) {
            var that = contentService;
            var method = '';
            var url = '';
            var d = that.$q.defer();
            method = 'GET';
            url = that.httpBaseUrl + '/vod/show/' + id;

            that.$http({
                url: url,
                method: method,
                withCredentials: true
            }).then(function(resp) {
               // resp.data = that.changeToLocalColumns(resp.data, mapping['vodurls']);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //showEdit
        contentService.editShow = function(id) {
            var that = this;

            var d = that.$q.defer();

            that.$http({
                url: that.httpBaseUrl + '/show/' + id,
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

        //get all area
        contentService.getAreaList = function() {
            var that = contentService;
            var method = 'GET';
            var url = that.areaUrl + '/area/index';

            return that.$http({
                url: url,
                method: method,
                withCredentials: true

            });
        };
        //get all city
        contentService.getCityList = function(params) {
            var that = contentService;
            var method = 'GET';
            var url ;
            if(params){
                url = that.areaUrl + '/city/index?id='+params
            }else{
                url = that.areaUrl + '/city/index'
            }

            return that.$http({
                url: url,
                method: method,
                withCredentials: true

            });
        };

        contentService.getVideo = function(id) {
            var that = contentService;
            var method = '';
            var url = '';
            var d = that.$q.defer();
            method = 'GET';
            url = that.httpBaseUrl + '/vod/vodurls/' + id;

            that.$http({
                url: url,
                method: method,
                withCredentials: true
            }).then(function(resp) {
                resp.data = that.changeToLocalColumns(resp.data, mapping['vodurls']);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };
        //show 预览
        contentService.showVideo = function(item) {

            var that = contentService;
            var method = '';
            var url = '';
            var d = that.$q.defer();
            method = 'GET';
            url = that.httpBaseUrl + '/videoUrl/show/' + item['id'];

            that.$http({
                url: url,
                method: method,
                withCredentials: true
            }).then(function(resp) {
                console.log("resp", resp)
                resp.data = that.changeToLocalColumns(resp.data, mapping['videoUrl']);
                console.log("resp.data", resp.data)
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };


        //edit 点播
        contentService.saveVideo = function(item) {
            var that = this;
            var method = '';
            var url = '';
            // var d = that.$q.defer();
            if (!_.isUndefined(item['id'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/videoUrl/update/' + item['id'];
            }

            console.log("before item", item.urlStatus,item.vip);
            item = that.changeFromLocalColumns(item, mapping['videoUrl']);
            console.log("after item", item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        //editAll 点播 全部上线
        contentService.saveVideosOn = function(ids) {
            var that = this;
            var method = '';
            var url = '';
            // var d = that.$q.defer();
            if (!_.isUndefined(ids)) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/vod/bulkurlonline/' + ids;
            }
            //ids = that.changeFromLocalColumns(ids);
            console.log("after ids", ids);
            return that.$http({
                url: url,
                method: method,
                data: ids,
                withCredentials: true
            });
        };
        contentService.saveVideosOff = function(ids) {
            var that = this;
            var method = '';
            var url = '';
            // var d = that.$q.defer();
            if (!_.isUndefined(ids)) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/vod/bulkurloffline/' + ids;
            }
            //ids = that.changeFromLocalColumns(ids);
            console.log("after ids", ids);
            return that.$http({
                url: url,
                method: method,
                data: ids,
                withCredentials: true
            });
        };

        //修改video频道状态
        contentService.upVideoStatus = function(item) {
            var that = this;

            return that.$http({
                url: that.httpBaseUrl + '/video/changestatus/' + item.id,
                method: 'PATCH',
                data: item,
                withCredentials: true
            });
        };
        //批量修改video频道状态
        contentService.upSelectVideoStatus = function(item) {
            var that = this;

            return that.$http({
                url: that.httpBaseUrl + '/video/allstatus/' + item.id,
                method: 'PATCH',
                data: item,
                withCredentials: true
            });
        };

        //频道管理-获取应用市场列表
        contentService.getMarketList = function () {
            var that = this;
            var method = 'GET';
            var url = '';
            var d = that.$q.defer();

            url = that.httpBaseUrl + '/market/index';


            that.$http({
                url: url,
                method: method,
                params: {
                    isAll:1
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

        //频道管理-频道关联的应用屏蔽时段
        contentService.getMarketRelation = function (id) {
            var that = this;
            var method = 'GET';
            var url = '';
            var d = that.$q.defer();

            url = that.httpBaseUrl + '/marketRelation/index';


            that.$http({
                url: url,
                method: method,
                params: {
                    videoId:id,
                },
                withCredentials: true
            }).then(function(resp) {
                resp.data.rows = that.changeToLocalColumns(resp.data.rows,mapping['marketRelation']);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };

        //editAll 点播
        contentService.saveVideos = function(item) {
            var that = this;
            var method = '';
            var url = '';
            // var d = that.$q.defer();
            if (!_.isUndefined(item)) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/videoUrl/update/';
            }
            console.log("before item", item);
            item = that.changeFromLocalColumns(item, mapping['videoUrl']);
            console.log("after item", item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        //根据栏目id获取标签
        contentService.getTagsByVideoId = function(id) {
            var that = this;
            var method = 'GET';
            var url = '';
            var d = that.$q.defer();

            url = that.httpBaseUrl + '/videoTag/index';


            that.$http({
                url: url,
                method: method,
                params: {
                    videoId: id
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
        //根据app id获取应用
        contentService.getAppsByVideoId = function(id) {
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
                    isAll:1
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

        //获取所有apps
        //contentService.getVersionList = function(params) {
        //    var that = contentService;
        //    var method = '';
        //    var url = '';
        //
        //    method = 'GET';
        //    url = that.httpBaseUrl + '/apps/index/?isAll=1';
        //
        //    return that.$http({
        //        url: url,
        //        params:params,
        //        method: method,
        //        withCredentials: true
        //
        //    });
        //};
        //save 配置的标签
        contentService.saveTag = function(item) {
            var that = this;
            var method = '';
            var url = '';
            // var d = that.$q.defer();
            if (!_.isUndefined(item['id'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/videoTag/update/' + item['id'];
            }
            console.log("before item", item);
            item = that.changeFromLocalColumns(item, mapping['videoTag']);
            console.log("after item", item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };
        //sava 设置的应用
    contentService.saveApp = function(item) {
            var that = this;
            var method = '';
            var url = '';
            // var d = that.$q.defer();
            if (!_.isUndefined(item['id'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/appRelation/update/' + item['id'];
            }
            //console.log("before item", item);
            //item = that.changeFromLocalColumns(item, mapping['appRelation']);
            item.appRelationType = 0;
            console.log("after item", item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };
        //save 频道管理 所属地域
        contentService.saveVideoArea = function(item){
            var that = this;
            var method = '';
            var url = '';
            // var d = that.$q.defer();
            if (!_.isUndefined(item['refId'])) {
                method = 'PATCH';
                url = that.httpBaseUrl + '/areaRelation/arearef/';
            }
            //console.log("before item", item);
            //item = that.changeFromLocalColumns(item, mapping['areaRelation']);
            //console.log("after item", item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        //get relative area
        //relative video vod cp
        contentService.getVideoArea = function(id, type) {
            console.log('type==',type);

            var url = config.httpBaseUrl + '/areaRelation/index';



            var that = this;
            var d = that.$q.defer();
            $http({
                url: url,
                method: 'GET',
                params:{
                    isAll:1,
                    areaRelationType:type,
                    refId:id
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
            //delete 子点播单
        contentService.deleteShow = function(id) {
                var that = this;
                var name = that.name;
                return that.$http({
                    url: that.httpBaseUrl + '/videoUrl/dels/' + id.toString(),
                    method: 'DELETE',
                    header: {
                        'Authorization': 'Basic fdfwoeigjiewoe',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    withCredentials: true
                        //            params: {ids: '[' + id.toString() + ']'}
                });
        };

        contentService.getEpgItem = function(pageNumber, params) {
            var that = this;

            var d = that.$q.defer();

            params = params ? that.changeFromLocalColumns(params) : {};
            params.currentPage = pageNumber;
            that.$http({
                url: that.epgBaseUrl + '/video/index',
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

        return contentService;
    }]);
});