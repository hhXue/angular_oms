define([
    'angularAMD',
    'modules/oms/apps/service',
    'Session'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('AppsKeyCtrl', ['$scope', 'AppsService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, AppsService, Session, $controller, $state, ngDialog) {

            //console.log("cookie对象", window.document.cookie);

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            console.log('$scope.methods===',$scope.methods)
            var appsKeyCtrl = $scope.appsKeyCtrl = {};

            //set data config
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/apps/appsKeyEdit.html',
                    data: {
                        title: "编辑应用"
                    },
                    controller: 'AppsKeyEditCtrl'
                },
                create: {
                    template: 'modules/oms/apps/appsKeyEdit.html',
                    data: {
                        title: "应用增加"
                    },
                    controller: 'AppsKeyEditCtrl'
                },
                video: {
                    template: 'modules/oms/apps/appShow.html',
                    data: {
                        title: "所有版本涉及的频道：频道总数",
                        type: 1,
                        name:$scope.name
                    },
                    controller: 'AppShowCtrl'
                },
                vod: {
                    template: 'modules/oms/apps/appShow.html',
                    data: {
                        title: "所有版本涉及的栏目：栏目总数",
                        type: 0,
                        name:$scope.name
                    },
                    controller: 'AppShowCtrl'
                }
            };

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            //set item service
            $scope.itemService = AppsService.setName('appKey');

            $scope.searchParams.isAll = 1;


            if (typeof $scope.methods.index.name != 'undefined') {
                $scope.getResultsPage($scope.currentPage,$scope.searchParams);
            }
            //操作是否允许 状态
            $scope.itemCtrl.changeStatus = function(item,status){
                AppsService.changeStatu({
                    id:item.id,
                    status:status
                },$scope).then(function(resp){
                    console.log('resp.data.status;',resp.data.status);
                    $scope.status = resp.data.status;
                    $scope.getResultsPage($scope.currentPage,$scope.searchParams)
                })
            };

            appsKeyCtrl.operation = function(obj, type ,name ) {
                var config;
                if (type == 1) {
                    config = $scope.dataConfig.video;
                } else {
                    config = $scope.dataConfig.vod;
                }
                config.data.appKeyId = obj.id;
                config.data.name = obj.name;

                var ngdialog = ngDialog.open(config);

                ngdialog.closePromise.then(function(data) {
                    $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                });
            }



        }
    ]);

});
