define([
    'angularAMD',
    'modules/oms/manage/service',
    'Session'
], function(angularAMD) {
    'use strict';

    //模块控制器 》里面的方法
    angularAMD.controller('PowerCtrl', ['$scope', 'manageService', 'ngDialog', 'Session', '$state', 'usSpinnerService', 'StarsUtils', '$stateParams', '$controller',
        function($scope, manageService, ngDialog, $rootScope, $state, usSpinnerService, StarsUtils, $stateParams, $controller) {

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            var powerCtrl = $scope.powerCtrl = {};
            $scope.ids = [];
            $scope.itemService = manageService.setName('permissionrole');

            $scope.roleId = $state.params.roleId;

            $scope.items = [2];

            powerCtrl.init = function() {
                //存放父路由
                $scope.route();

                //获取所有权限
                manageService.getPowerByRoleId($scope.roleId).then(function(e) {
                    var permissionArray = [];
                    $scope.ids = e.data.data.permissionsids;


                    //循环将格式设定到符合我们的样子 {"权限管理" :[{1:"新增"},{2:"修改"},{3:"删除"}]}
                    angular.forEach(e.data.data.permissionsList, function(val, i) {
                        //截取前缀
                        var str_key = val.permissionDisplayName.substring(0, val.permissionDisplayName.lastIndexOf("_"));
                        //判断数组是否存在并初始化
                        if (typeof(permissionArray[str_key]) == "undefined") {
                            permissionArray[str_key] = [{
                                name: val.permissionName,
                                check: true,
                                options: []
                            }];
                        }
                        var ckstatus = true;
                        if ($scope.ids.indexOf(val.permissionId) == -1) {
                            ckstatus = false;
                            permissionArray[str_key][0].check = false;
                        }

                        permissionArray[str_key][0].options.push({
                            permissionId: val.permissionId,
                            ckstatus: ckstatus,
                            permissionControllerName: val.permissionControllerName
                        });

                    });
                    $scope.items = [];
                    for (var p in permissionArray) {
                        var item = {
                            name: p,
                            obj: permissionArray[p]
                        };
                        $scope.items.push({
                            name: p,
                            obj: permissionArray[p]
                        });
                    }
                }, function(error) {
                    console.log("错误返回数据", error)
                });
            }

            //修改
            powerCtrl.save = function() {

                $scope.submitStatus = true;

                manageService.savePower($scope.roleId, $scope.ids).then(function(e) {
                    alert("权限设置成功");
                    $scope.itemCtrl.back();
                    $scope.submitStatus = false;
                }, function(error) {
                    alert("权限设置失败");
                    $scope.submitStatus = false;
                });
            }

            powerCtrl.toggleSelection = function(permission) {
                var idx = $scope.ids.indexOf(permission.permissionId);

                if (idx > -1) {
                    $scope.ids.splice(idx, 1);
                } else {
                    $scope.ids.push(permission.permissionId);
                }
            }

            //初始化数据
            powerCtrl.init();

        }
    ]);

    //全选  将对象子集选中 病把格式格式化
    angularAMD.directive("ckallBox", function() {
        return {
            restrict: 'A',
            // 作为元素属性
            require: '?ngModel',
            // 获取ngModelController
            link: function(scope, element, attrs, ngModel) {
                element.on('click', function() {
                    scope.$apply(ckbox);
                });

                var ckbox = function() {
                    if (attrs.$$element[0].checked) {
                        angular.forEach(scope.item.obj[0].options, function(e, vl) {
                            if (!scope.item.obj[0].options[vl].ckstatus) {
                                scope.item.obj[0].options[vl].ckstatus = true;
                                scope.$parent.ids.push(e.permissionId);
                            }
                        });
                    } else {
                        angular.forEach(scope.item.obj[0].options, function(e, vl) {

                            var index = scope.$parent.ids.indexOf(e.permissionId);

                            scope.$parent.ids.splice(index, 1);
                            scope.item.obj[0].options[vl].ckstatus = false;
                        });
                    }
                }
            }
        }
    });

});
