define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD, BaseCtrl) {
    'use strict';
    angularAMD.controller('TabCtrl', ['$scope', 'clientService', 'Session', '$controller', '$state', '$stateParams', 'ngDialog', 'StarsUtils',
        function($scope, clientService, Session, $controller, $state, $stateParams, ngDialog, StarsUtils) {

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //set data config
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/client/tabEdit.html',
                    data: {
                        title: "编辑TAB"
                    },
                    controller: 'TabEditCtrl'
                },
                create: {
                    template: 'modules/oms/client/tabEdit.html',
                    data: {
                        title: "新增TAB",
                        item: {}
                    },
                    controller: 'TabEditCtrl'
                }
            };
            console.log("$stateParams222", $stateParams);
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });
            //set item service
            $scope.itemService = clientService.setName('tablet');

            var tabCtrl = $scope.tabCtrl = {};
            $scope.tabVals = [{
                val: 1,
                name: "上线"
            }, {
                val: 0,
                name: "下线"
            }];
            $scope.tabtype = {
                0: '导航',
                1: 'API'
            };

            tabCtrl.update = function(item, status) {
                clientService.saveShow({
                    id: item.id,
                    tabletStatus: status
                }, $scope).then(function(e) {

                    item.tabletStatus = e.data.tabletStatus;
                    //if(item.tabletStatus = 1) item.tabletLock = 2;
                    //else { item.tabletLock = 2;}
                    console.log("item.tabletLock", item.tabletStatus, item.tabletLock, item)
                }, function(error) {

                    var str = [];
                    if (error.status == 400) {
                        angular.forEach(error.data.message, function(e) {
                            console.log(e);
                            str.push(e);
                        });
                    } else {
                        str.push(error.data.message);
                        if (error.data.error) {
                            str.push(error.data.error.message);
                        }
                    }
                    var errorStr = 'code ' + error.status + ':' + str;

                    StarsUtils.confirm(errorStr).then(function() {});


                });
            };
            //版本查看
            tabCtrl.versionChoice = function(id) {
                    var ngdialog = ngDialog.open({
                        template: 'modules/oms/client/versionList.html',
                        data: {
                            title: '模块版本列表',
                            id: id
                        },
                        controller: 'VersionCtrl'
                    });

                };
                //get list page
            if (typeof $scope.methods.index.name != 'undefined') {
                $scope.getResultsPage($scope.currentPage);
            }

        }

    ]);

});
