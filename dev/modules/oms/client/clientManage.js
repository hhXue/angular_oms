define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD) {
    'use strict';

    //模块控制器 》里面的方法
    angularAMD.controller('clientCtrl', ['$scope', 'clientService', '$controller', '$state', 'ngDialog',
        function($scope, clientService, $controller, $state, ngDialog) {
            $scope.methods = $state.current.data.methods;

            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.itemService = clientService.setName('tablet');

            var clientCtrl = $scope.clientCtrl = {};

            clientCtrl.edit = function(item, status) {
                clientService.saveItem({
                    id: item.id,
                    status: status
                }, $scope).then(function(e) {
                    $scope.submitStatus = false;
                    item.status = status;
                    $scope.itemCtrl.search();
                }, function(e) {
                    alert(e);
                    $scope.submitStatus = false;
                })
            };

            clientCtrl.changeItem = function(obj) {
                console.log('window.sessionStorage==',window.sessionStorage);
                sessionStorage.setItem('changeIndex', obj.id);
                $scope.titleName = obj.tabName;
                $scope.nameIndex = obj.tabApi;
                $scope.itemService = clientService.setName('target');
                $scope.searchParams.tabletId = obj.id;

                $scope.items = {};

                // $scope.getResultsPage($scope.currentPage, {
                //     tabletId: obj.id
                // });
            };

            clientCtrl.modelShow = function(obj) {

                var ngdialog = ngDialog.open({
                    template: 'modules/oms/client/template.html',
                    data: {
                        title: "预览模版",
                        id: obj.id,
                        name: obj.name,
                        tabletId: $scope.searchParams.tabletId,
                        nameIndex: $scope.nameIndex,
                        type: 3
                    },
                    controller: 'templateCtrl'
                });
            };

            clientCtrl.changeCk = function(obj) {

                if (obj.selectAll) {
                    $scope.selectAll = true;
                } else {
                    $scope.selectAll = false;
                }
            };

            //初始化 获取tag列表(模块管理列表)
            clientCtrl.init = function() {
                $scope.selectAll = false;
                clientService.targetTab($scope.currentPage).then(function(e) {
                    $scope.tabItem = e.data.rows;


                    if ($scope.tabItem.length > 0) {
                        var changeIndex = sessionStorage.getItem('changeIndex');
                        if (changeIndex && changeIndex != "null") {
                            angular.forEach($scope.tabItem, function(obj, i) {
                                if (obj.id == changeIndex) {
                                    clientCtrl.changeItem($scope.tabItem[i]);
                                    $scope.searchParams.tabletId = $scope.tabItem[i].id;
                                }
                            })
                        } else {
                            clientCtrl.changeItem($scope.tabItem[0])
                            $scope.searchParams.tabletId = $scope.tabItem[0].id;
                        }
                    }
                }, function(error) {
                    console.log("error:", error.toString())
                });
            };

            //get list page
            if (typeof $scope.methods.index.name != 'undefined') {
                clientCtrl.init();
            }
        }
    ]);



    angularAMD.directive("ckStatus", function() {
        return {
            restrict: 'A',
            require: "?ngModel",
            link: function(scope, el, attrs, ctrl) {
                el.on('click', function() {
                    scope.$apply(status);
                });

                function status() {
                    angular.element(el).parent().find('a').removeClass("btn-warning");
                    scope.searchParams.status = el.attr("name");
                    el.addClass("btn-warning");
                    scope.itemCtrl.search();
                }
            }
        };
    });

    angularAMD.directive("rmTitle", function() {
        return {
            restrict: 'A',
            require: "?ngModel",
            link: function(scope, el, attrs, ctrl) {
                el.on('click', function() {
                    scope.$apply(clear);
                });

                function clear() {
                    angular.element(el).parent().parent().find('div.title-div').children().removeClass("btn-warning");
                }
            }
        };
    });
});
