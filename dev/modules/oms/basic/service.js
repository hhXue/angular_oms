define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService){
    'use strict';
    angularAMD.service('BasicsService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q ){
        var mapping = {
            "property": {
                "id": "propertyId",
                "propertyName": "propertyName",
                "propertyType": "propertyType",
                "typeName": "typeName"
            },
            "tag": {
                "id": "tagId",
                "tagName": "tagName",
                "userId": "userId",
                "pid": "tagPid",
                "origin": "tagOrigin",
                "tagType": "tagType",
                "pTag": "pTag"
            },
            "category":{
                "id": "categoryId",
                "categoryName": "categoryName",
                "userId": "userId",
                "categoryType": "categoryType",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "market":{
                'id': 'id',
                'marketId': 'marketId',
                'name': "marketName",
                'note': "marketNote",
                'createdAt': 'createdAt',
                'updatedAt': 'updatedAt'
            }
        };

        var basicsService = new BaseService( config, $http, $q, mapping);

        basicsService.getParentTags = function(){
            var d = $q.defer();
            $http({
                url: config.httpBaseUrl + '/tag/ptag',
                method: 'GET',
                headers: {
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp){
                resp.data.rows = basicsService.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            },function(error){
                d.reject(error);
            });

            return d.promise;
        };

        return basicsService;
    }]);

});
