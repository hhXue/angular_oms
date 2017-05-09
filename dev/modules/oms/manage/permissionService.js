define([
    'angularAMD',
    'BaseService'
], function(angularAMD, BaseService){
	'use strict';

angularAMD.service('PermissionService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q ){

    var mapping = {
        "permissions": {
            "id": "permissionId",
            "permissionName": "permissionName",
            "permissionControllerName": "permissionControllerName",
            "permissionDisplayName": "permissionDisplayName"
        }
    };

	var permissionService = new BaseService( config, $http, $q, mapping);

    permissionService.getPermissionList = function(){
        return $http({
            url: config.httpBaseUrl + '/permissions/index',
            method: 'GET',
            headers: {
                'Authorization': 'Basic fdfwoeigjiewoe',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            withCredentials: true
        });
    };
    console.log('permissionService', permissionService, config);
	return permissionService;
}]);

});
