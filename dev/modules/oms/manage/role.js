define([
    'angularAMD',
    'modules/oms/manage/service',
    'Session'
], function(angularAMD) {
    'use strict';

    //模块控制器 》里面的方法
    angularAMD.controller('RoleCtrl', ['$scope', 'manageService', '$controller', '$state', 'ngDialog',
        function($scope, manageService, $controller, $state, ngDialog) {

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;

            // //set data config
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/manage/roleEdit.html',
                    data: {
                        title: "编辑角色"

                    },
                    controller: 'roleEditCtrl'
                },
                create: {
                    template: 'modules/oms/manage/roleEdit.html',
                    data: {
                        title: "新增角色",
                        item: {}
                    },
                    controller: 'roleEditCtrl'
                }
            };

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            //set item service
            $scope.itemService = manageService.setName('role');

            //get list page
            if (typeof $scope.methods.index.name != 'undefined') {
                $scope.getResultsPage($scope.currentPage);
            }
            $scope.route()

        }
    ]);

});
