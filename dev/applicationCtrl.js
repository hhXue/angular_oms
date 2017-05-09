define([
    'angularAMD'
], function(angularAMD){

    'use strict';

    angularAMD.controller('ApplicationCtrl', ['$scope', 'USER_ROLES', 'AuthService', '$rootScope', function ($scope, USER_ROLES, AuthService, $rootScope) {
        $scope.currentUser = null;
        $scope.userRoles = USER_ROLES;
        $scope.isAuthorized = AuthService.isAuthorized;

        $scope.setCurrentUser = function (user) {
            $scope.currentUser = user;
        };



     //    $rootScope.$on('$viewContentLoading',function(event, viewConfig){
    	//   	// runs on individual scopes, so putting it in "run" doesn't work.
    	//   	console.log('$viewContentLoading - view begins loading - dom not rendered',event,viewConfig);

    	//   	var target = event.target;

    	// });


    }]);

});