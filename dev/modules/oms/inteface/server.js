define([
    'angularAMD',
    'modules/oms/inteface/service',
    'Session'
], function(angularAMD) {
    'use strict';
    angularAMD.controller('serverCtrl', ['$scope', 'intefaceService', 'Session', '$controller', '$state', 'ngDialog', 'StarsUtils',
        function($scope, intefaceService, Session, $controller, $state, ngDialog, StarsUtils) {

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            //set item service
            $scope.itemService = intefaceService.setName('server');

            var serverCtrl = $scope.serverCtrl = {};

            serverCtrl.openApi = function() {
                intefaceService.getServerApi().then(function(e) {
                    var tempwindow = window.open('_blank');
                    tempwindow.location = e.data.url
                }, function(error) {
                    alert(error.message);
                })
            }

            serverCtrl.init = function() {
                if (typeof $scope.methods.index.name != 'undefined') {
                    $scope.getResultsPage($scope.currentPage);
                }
            }
            serverCtrl.init();
        }
    ]);

});
