define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD) {
    'use strict';
    angularAMD.controller('changeCtrl', ['$scope', 'clientService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, clientService, Session, $controller, $state, ngDialog) {
            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            console.info('$scope.ngDialogData==',$scope.ngDialogData);
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.typeOption = [{
                id: 1,
                name: "栏目"
            }, {
                id: 0,
                name: "直播"
            }];

            $scope.rItem = [];
            $scope.select = "";
            $scope.idOptions = $scope.ngDialogData.id;
            $scope.title = $scope.ngDialogData.title;
            $scope.type = $scope.ngDialogData.type;

            $scope.changeType = "1";

            var changeCtrl = $scope.changeCtrl = {};

            changeCtrl.showSelect = function() {
                if ($scope.select == "") {
                    $scope.select = "open";
                } else {
                    $scope.select = "";
                }
            };

            //单选
            $scope.ckOption = function(obj) {
                $scope.optionType = obj.name;
                $scope.changeType = obj.id;
                $scope.typeStatus = obj.id;
                clientService.getResultsPage(1, $scope.searchParams, obj.id).then(function(data) {
                    $scope.loading_list = false;
                    $scope.items = data.data.rows;
                    $scope.totalItems = data.data.totalResults;
                }, function(error) {});
            };

            changeCtrl.search = function() {
                clientService.getResultsPage(1, $scope.searchParams, $scope.changeType).then(function(data) {
                    $scope.loading_list = false;
                    $scope.items = data.data.rows;
                    $scope.totalItems = data.data.totalResults;
                }, function(error) {});
            };

            changeCtrl.getSearch = function() {
                clientService.getResultsPage(1, $scope.searchParams, $scope.typeStatus).then(function(data) {
                    $scope.loading_list = false;
                    $scope.items = data.data.rows;
                    $scope.totalItems = data.data.totalResults;
                }, function(error) {});
            };

            //多选
            $scope.ckMore = function(obj, ckbox) {

                if (ckbox.option) {
                    $scope.rItem[obj.id] = obj;
                } else {
                    $scope.rItem.splice($scope.rItem.indexOf($scope.rItem[obj.id]), 1);
                    //$scope.idOptions.splice($scope.rItem[obj.id]);
                }
            };

            //分页数据 配置初始化
            $scope.init = function() {

                $scope.initId = angular.copy($scope.idOptions);

                angular.forEach($scope.initId , function(app) {
                    $scope.rItem[app] = app;
                });

                    $scope.itemService = clientService.setName($scope.ngDialogData.objName);



                $scope.searchParams.isAll = true;

                //videoEpg 重写
                if ($scope.ngDialogData.objName == "videoEpg") {
                    clientService.getEpgItem(1, null).then(function(data) {
                        $scope.loading_list = false;
                        $scope.items = data.data.rows;
                        $scope.totalItems = data.data.totalResults;
                    });
                } else if ($scope.ngDialogData.objName == "appRelation") {
                    //app重写 重写
                    $scope.getResultsPage = function(pageNumber, params) {
                        $scope.appFun(pageNumber, params);
                    };
                    $scope.getResultsPage($scope.currentPage);
                } else {
                    if ($scope.type == 2) {
                        $scope.optionType = $scope.typeOption[0].name;
                    }
                    $scope.getResultsPage($scope.currentPage, $scope.type);
                }

                //console.info('$scope.idOptions----------',$scope.idOptions, $scope.items);
            };

            $scope.typeStatus = "";

            $scope.getResultsPage = function(page, type) {

                if (type != 0 && type != 1 && type != 2) {
                    type = $scope.typeStatus
                } else {
                    $scope.typeStatus = type;
                }

                //0:直播   1:直播
                clientService.getResultsPage(page, $scope.searchParams, type).then(function(data) {
                    $scope.loading_list = false;
                    $scope.items = data.data.rows;
                    $scope.totalItems = data.data.totalResults;
                }, function(error) {});
            };

            //app 接口非idnex  自定义
            $scope.appFun = function(pageNumber, params) {
                $scope.currentPage = pageNumber;
                $scope.items = [];
                $scope.loading_list = true;
                $scope.searchParams.tabletId = $state.params.tabletId;

                //$scope.searchParams.noAppId = $scope.idOptions.toString();
                clientService.getAppRelaction($scope.currentPage, $scope.searchParams).then(function(data) {
                    $scope.loading_list = false;
                    $scope.items = data.data.rows;
                    $scope.totalItems = data.data.totalResults;
                }, function(error) {
                    $scope.loading_list = false;
                    $scope.search_error_msg = 'code ' + error.data.code + ':' + error.data.message;
                    $scope.search_error = true;
                });
            };

            changeCtrl.ckAll = function(obj) {

                if (obj.selectAll) {
                    angular.forEach($scope.items, function(obj) {
                            $scope.rItem.push(obj);
                        });
                        //$scope.rItem = angular.copy($scope.items);
                } else {
                    $scope.rItem = [];
                    $scope.idOptions = [];
                }
            };

            // //监听
            $scope.$watch('items', function() {

                if (typeof $scope.idOptions == "undefined") {
                    return;
                }

                angular.forEach($scope.items, function(e, v) {

                    //e.id = parseInt(e.id);

                    if (typeof(e.id) != "undefined" && $scope.idOptions.length > 0 && $scope.idOptions.indexOf(e.id) > -1) {
                        $scope.rItem[e.id] = e;
                        //console.info('watch items', e,v);
                    }
                })
            });
            $scope.init();
        }
    ]);

});
