define([
    'angularAMD',
    'modules/oms/manage/permissionService',
    'Session'
], function(angularAMD, BaseCtrl) {
    'use strict';
    angularAMD.controller('PermissionCtrl', ['$scope', 'PermissionService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, PermissionService, Session, $controller, $state, ngDialog) {


            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;


            //set data config
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/manage/permissionEdit.html',
                    data: {
                        title: "编辑权限"
                    },
                    controller: 'PermissionEditCtrl'
                },
            };

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            //set item service
            $scope.itemService = PermissionService.setName('permissions');

            //get list page

            if (typeof $scope.methods.index.name != 'undefined') {
                $scope.getResultsPage($scope.currentPage);
            }
            $scope.route();
        }
    ]);

});
