define([
    'angularAMD',
    'modules/oms/apps/service',
    'Session'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('AppsCtrl', ['$scope', 'AppsService', 'Session', '$controller', '$state', 'ngDialog','$stateParams',
        function($scope, AppsService, Session, $controller, $state, ngDialog, $stateParams) {

            console.log("cookie对象", window.document.cookie);

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            var appsCtrl = $scope.appsCtrl = {};

            //set data config
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/apps/appsEdit.html',
                    data: {
                        title: "编辑版本",
                        appsAppId:$stateParams.appsAppId
                    },
                    controller: 'AppsEditCtrl'
                },
                create: {
                    template: 'modules/oms/apps/appsEdit.html',
                    data: {
                        title: "添加版本",
                        appsAppId:$stateParams.appsAppId
                    },
                    controller: 'AppsEditCtrl'
                },
                live: {
                    template: 'modules/oms/apps/appOperation.html',
                    data: {
                        appId: "",
                        title: "设置频道",
                        type: 1
                    },
                    controller: 'appOperationCtrl'
                },
                onDemand: {
                    template: 'modules/oms/apps/appOperation.html',
                    data: {
                        appId: "",
                        title: "设置栏目",
                        type: 0
                    },

                    controller: 'appOperationCtrl'
                }
                ,
                tab: {
                    template: 'modules/oms/apps/appOperation.html',
                    data: {
                        appId: "",
                        title: "设置模块",
                        type: 2
                    },

                    controller: 'appOperationCtrl'
                }
            };

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.route();

            //set item service
            $scope.itemService = AppsService.setName('apps');
            console.log("$stateParams",$stateParams);

            $scope.searchParams.appsAppId = $stateParams.appsAppId;
            $scope.searchParams.isAll = 1;
            $scope.titleName = $stateParams.titleName;

            if (typeof $scope.methods.index.name != 'undefined') {
                $scope.getResultsPage($scope.currentPage,$scope.searchParams);
            }

            $scope.itemCtrl.operation = function(obj, type) {
                var config;

                switch (type){
                    case 0:
                        config = $scope.dataConfig.onDemand;
                        break;
                    case 1:
                        config = $scope.dataConfig.live;
                        break;
                    case 2:
                        config = $scope.dataConfig.tab;
                        break;
                }
                config.data.appId = obj.id;
                var ngdialog = ngDialog.open(config);

                ngdialog.closePromise.then(function(data) {
                    $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                });
            };

            //methods not contained in BaseCtrl..
            $scope.itemCtrl.forceUpdate = function(app) {
                var ngdialog = ngDialog.open({
                    template: 'modules/oms/apps/appsForceUpdate.html',
                    data: {
                        title: "升级管理",
                        app: angular.copy(app)
                    },
                    controller: 'AppsForceUpdateCtrl'
                });
                ngdialog.closePromise.then(function(data) {
                    console.log('close app',data);
                    $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                });
            };

        }
    ]);

});
