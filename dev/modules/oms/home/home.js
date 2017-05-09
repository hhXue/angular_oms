define(['angularAMD'], function(angularAMD){
	'use strict';


angularAMD.controller('HomeCtrl', ['$rootScope', '$scope', '$timeout',
    function($rootScope, $scope, $timeout)
    {
        $scope.message = '';

        $scope.gotoState = function(state) {
            // $state.go(state);
        };
    }]);

});
