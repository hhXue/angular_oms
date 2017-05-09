define([
    'angularAMD',
    'modules/oms/inteface/service',
    'Session'
], function(angularAMD) {
    'use strict';
    angularAMD.controller('iosCtrl', ['$scope', 'intefaceService', 'Session', '$controller', '$state', 'ngDialog', 'StarsUtils',
        function($scope, intefaceService, Session, $controller, $state, ngDialog, StarsUtils) {

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            //set item service
            $scope.itemService = intefaceService.setName('ios');

            var iosCtrl = $scope.iosCtrl = {};

            iosCtrl.openApi = function(obj) {

                intefaceService.getIosApi(obj.name, obj.version , obj.appKey).then(function(e) {
                    var tempwindow = window.open('_blank');
                    console.info('e.data+++', e.data);
                    tempwindow.location = e.data.url
                }, function(error) {
                    alert(error.message);
                })

            };

            iosCtrl.init = function() {
                if (typeof $scope.methods.index.name != 'undefined') {
                    $scope.getResultsPage($scope.currentPage);
                }
            };

            iosCtrl.init();


        }
    ]);

});
