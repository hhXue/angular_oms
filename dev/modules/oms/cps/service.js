define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService){
    'use strict';

    angularAMD.service('CpsService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q ){
        var mapping = {
            "cps": {
                "id": "cpId",
                "cpStatus": "cpStatus",
                "sortNum": "sortNum",
                "userId": "userId",
                "userName": "userName",
                "cpName": "cpName",
                "cpImage": "cpImage",
                "cpUrl": "cpUrl",
                "cpDescription": "cpDescription",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "isAll": "isAll",
                "areaId":'areaId'
            },
            "cpVideo":{
                "id": "cpVideoId",
                "videoId": "videoId",
                "cpId": "cpId",
                "userId": "userId",
                "cpVideoSort": "cpVideoSort",
                "cpName": "cpName",
                "userName": "userName",
                "videoName":"videoName",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "video":{
                "id": "videoId",
                "name": "videoName",
                "videoType": "videoType",
                "description": "description",
                "videoStatus": "videoStatus",
                "userId": "userId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            }
        };
        
        var cpsService = new BaseService( config, $http, $q, mapping);

        cpsService.getVideoList = function(name){
            var that = this;
            var params = {name:name, sensor: false};
            params = that.changeFromLocalColumns(params);
            console.log('params22',params);

            var d = $q.defer();

            $http({
                url: that.httpBaseUrl + '/video/index?isAll=1&videoStatus=1',
                method: "GET",
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: params,
                withCredentials: true
            }).then(function(resp){
                resp.data.rows = that.changeToLocalColumns(resp.data.rows,mapping['video']);
                console.log("resp test",resp);
                d.resolve(resp);
            },function(error){
                d.reject(error);
            });
            return d.promise;
        };
        //saveCpVideo
        cpsService.saveCpVideo = function(item){
            var that = this;
            var method = '';
            var url = '';
            var name = that.name;
            if (!_.isUndefined(item)) {
                method = 'POST';
                url = that.httpBaseUrl + '/' + name + '/create';
            }
            //else {
            //    method = 'POST';
            //    url = that.httpBaseUrl + '/' + name + '/create';
            //}
            item = that.changeFromLocalColumns(item);
            console.log("after item",item);
            return that.$http({
                url: url,
                method: method,
                data: item,
                withCredentials: true
            });
        };

        //order
        cpsService.saveOrder = function(ordername, list){
            var that = this;
            var method = '';
            var url = '';
            var name = that.name;

            method = 'PATCH';
            url = that.httpBaseUrl + '/' + name + '/sort';

            var data = {};
            data[ordername] = list;

            return that.$http({
                url: url,
                method: method,
                data: data,
                withCredentials: true
            });
        };
        //验证CP名称是否唯一
        cpsService.checkExist = function(params) {
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
                params: params
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });

            return d.promise;
        };

        return cpsService;
    }]);

});

