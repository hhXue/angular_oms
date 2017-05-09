define([
    'angularAMD',
    'modules/oms/basic/service',
    'Session'
], function(angularAMD, BaseCtrl){
    'use strict';
    angularAMD.controller('CategoryCtrl', ['$scope', 'BasicsService', 'Session', '$controller', '$state', 'ngDialog',
    function($scope, BasicsService, Session, $controller, $state, ngDialog){


        //permission control fixed to methods
        $scope.methods = $state.current.data.methods;


        //set data config
        $scope.dataConfig = {
            edit: {
                template: 'modules/oms/basic/categoryEdit.html',
                data: {title:"编辑分类"},
                controller:'CategoryEditCtrl'
            },
            create: {
                template: 'modules/oms/basic/categoryEdit.html',
                data: {title:"添加分类",item:{} },
                controller:'CategoryEditCtrl'
            },
            live: {
                template: 'modules/oms/apps/appOperation.html',
                    data: {
                        appId: "",
                        title: "设置频道",
                        type: 1,
                        name:'category'
                },
                controller: 'appOperationCtrl'
            }
        };
        //extend from BaseCtrl
        $controller('BaseCtrl', { $scope: $scope });
        //set item service
        $scope.itemService = BasicsService.setName('category');
        //get list page
        if(typeof $scope.methods.index.name != 'undefined' ){

            $scope.getResultsPage($scope.currentPage);
        }
        //设置频道
        $scope.itemCtrl.operation = function(obj, type) {
            var config;

            switch (type){
                case 1:
                    config = $scope.dataConfig.live;
                    break;
            }
            config.data.appId = obj.id;
            var ngdialog = ngDialog.open(config);

            ngdialog.closePromise.then(function(data) {
                $scope.getResultsPage($scope.currentPage, $scope.searchParams);
            });
        };



        }
    ]);
});
