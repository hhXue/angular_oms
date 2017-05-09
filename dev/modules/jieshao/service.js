define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService){
    'use strict';
    angularAMD.service('VideoService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q ){
        var mapping = {
            "source": {
                "id": "lsId",
                "name": "lsName",
                "location": "location",
                "status":"lsStatus",
                "fromSource":"fromSource",
                "updatedAt":"updatedAt",
                "createdAt":"createdAt",
                "lsStatus":"lsStatus"
            }
         };

        var sourceService = new BaseService( config, $http, $q, mapping);


        //源管理 获取频道列表
        sourceService.getSourceVideo = function(id){
            var d = $q.defer();
            $http({
                url: config.serverUrl + '/liveSource/'+id,
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp){
                resp.data.rows = sourceService.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            },function(error){
                d.reject(error);
            });

            return d.promise;
        };

        return sourceService;
    }]);

});
