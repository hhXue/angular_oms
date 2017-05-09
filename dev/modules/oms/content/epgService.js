define([
    'angularAMD',
    'BaseService',
    'jquery'
], function(angularAMD, BaseService,$){
    'use strict';

    angularAMD.service('EpgService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q) {
        var mapping = {

            "video": {
                "id": "videoId",
                "epgSource": "fromSrc",
                "channelName":"videoName",
                "thirdId":"thirdId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "epgLastTime":"epgLastTime"

            },
            "epg": {
                "id": "epgId",
                "programName": "epgName",
                "showId":"showId",
                "showName": "showName",
                "startDate":"startDate",
                "startTime":"startTime",
                "userId": "userId",
                "videoId":"videoId",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "thirdVideo":{
                "id": "thirdId",
                "name": "thirdName",
                "fromSrc": "fromSrc",
                "createdAt": "createdAt",
                "updatedAt":"updatedAt"
            }
        };

        var EpgService = new BaseService(config, $http, $q, mapping);

        EpgService.getChannelList = function(name,fromSrc){
            var that = EpgService;
            var params = {name:name, fromSrc: fromSrc};
            params = that.changeFromLocalColumns(params);
            console.log("params",params);

            var d = $q.defer();

            $http({
                url: config.epgBaseUrl + '/' + that.name +'/index',
                method: "GET",
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                params: params,
                withCredentials: true
            }).then(function(resp){
                resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
                EpgService.setName('video');
            },function(error){
                d.reject(error);
            });
            return d.promise;
        };
        EpgService.getChoiceName = function(id){
            var that = EpgService;

            var d = $q.defer();

            $http({
                url: config.epgBaseUrl + '/thirdVideo/show/' + id,
                method: "GET",
                header: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp){
                //resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            },function(error){
                d.reject(error);
            });
            return d.promise;
        }
        EpgService.saveEpg = function(item,uploadfile,scope){

            var that = EpgService;
            var method = '';
            var url = '';
            var name = that.name;
            scope.submitStatus = true;
            if (!_.isUndefined(item['id'])) {
                method = 'POST';
                url = that.httpBaseUrl + '/' + name + '/update/' + item['id'];
            } else {
                method = 'POST';
                url = that.httpBaseUrl + '/' + name + '/create';
           }

            item = that.changeFromLocalColumns(item);

            var formData = new FormData();

            if(item.fromSrc==2){
                //add file data to form data
                formData.append('upload',uploadfile);
            }
            //add other data to form data
            angular.forEach(item, function(v,k){
                formData.append(k,v);
            });



            return that.$http({
                url: url,
                method: method,
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type':  undefined//浏览器自动设置 multipart/form-data
                },
                data: formData,

                withCredentials: true
            });
        };
        return EpgService;
    }]);

});

