define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD) {
    'use strict';
    angularAMD.controller('versionAppCtrl', ['$scope', 'clientService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, clientService, Session, $controller, $state, ngDialog) {
            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.rItem = [];
            $scope.select = "";
            $scope.type = $scope.ngDialogData.type;
            $scope.title = $scope.ngDialogData.title;
            $scope.idOptions = $scope.ngDialogData.id;
            $scope.appIds = $scope.ngDialogData.appIds;
            $scope.objName = $scope.ngDialogData.objName;
            $scope.tabletId = $scope.ngDialogData.tabletId;
            $scope.targetId = $scope.ngDialogData.targetId;


            var versionAppCtrl = $scope.versionAppCtrl = {};

            // //单选
            $scope.ckOption = function(obj) {
                $scope.optionType = obj.name;
                $scope.searchParams.videoType = obj.id;
            }

            //多选
            $scope.ckMore = function(obj, ckbox) {

                if (ckbox) {
                    $scope.rItem[obj.id] = obj;
                } else {
                    $scope.rItem.splice($scope.rItem.indexOf($scope.rItem[obj.id]), 1);
                }
            }

            $scope.ckModel = function(item, option) {
                $scope.rItem[0] = item;
            }

            $scope.init = function() {

                if (typeof $scope.appIds != "undefined") {
                    $scope.itemService = clientService.setName("appRelation");
                    $scope.getResultsPage = function(pageNumber, params) {

                        console.log("父类",$scope.tabletId);

                        clientService.getAppRelaction(pageNumber, $scope.searchParams, $scope.tabletId).then(function(data) {
                            $scope.loading_list = false;
                            $scope.items = data.data.rows;
                            $scope.totalItems = data.data.totalResults;
                        }, function(error) {
                            console.log("error:", error.message);
                        })
                    }

                    $scope.getResultsPage(1, null);

                } else {
                    $scope.itemService = clientService.setName($scope.objName);
                    $scope.searchParams.tabletId = $scope.tabletId;
                    $scope.searchParams.id = $scope.targetId;
                    $scope.getResultsPage($scope.currentPage, {
                        type: 2,
                        tabletId: $scope.tabletId,
                        id: $scope.targetId
                    });
                }
            }


            $scope.init();



            // //监听
            $scope.$watch('items', function() {

                if (typeof $scope.idOptions == "undefined") {
                    return;
                }
                angular.forEach($scope.items, function(e, v) {

                    console.log(e, $scope.idOptions);

                    if (typeof(e.id) != "undefined" && $scope.idOptions.length > 0 && $scope.idOptions.indexOf(e.id) >= 0) {
                        $scope.items[v].check = true;
                        $scope.rItem[e.id] = e;
                    } else {
                        $scope.items[v].check = false;
                    }

                })
            });
            //$scope.init();
        }
    ]);

});
