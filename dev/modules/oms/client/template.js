define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD) {
    'use strict';

    //模块控制器 》里面的方法
    angularAMD.controller('templateCtrl', ['$scope', 'clientService', '$controller', '$state', 'ngDialog',
        function($scope, clientService, $controller, $state, ngDialog) {
            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.clientId = $scope.ngDialogData.id;
            $scope.titleName = $scope.ngDialogData.name;
            $scope.nameIndex = $scope.ngDialogData.nameIndex;
            $scope.tabletId = $scope.ngDialogData.tabletId;

            var versionCtrl = $scope.versionCtrl = {};
            $scope.modelDemo = {
                appKey: "WnJY48akhyvc",
                appOs: "",
                appVer: ""
            };
            $scope.fromAppCk = [];
            $scope.toAppCk = [];
            $scope.toApp = [];
            $scope.fromApp = [];

            //左侧模版选择
            versionCtrl.ckFrom = function(obj, index) {
                if ($scope.fromAppCk.indexOf(obj) < 0) {
                    $scope.fromAppCk.push(obj);
                    $scope.modelDemo.appOs = obj.appsAppOs;
                    $scope.modelDemo.appVer = obj.appsAppVersion;
                } else {
                    $scope.fromAppCk.splice($scope.fromAppCk.indexOf(obj), 1);
                }
            }
            $scope.fromModules = [];
            $scope.init = function() {
                clientService.getClientModels($scope.tabletId).then(function(e) {
                    $scope.model = e.data;
                    angular.forEach($scope.model, function(obj) {
                        if (obj.config) {
                            obj.line = 1;
                            if (obj.id == 5) {
                                obj.line = 2;
                            }
                            if (obj.id == 2) {
                                obj.episode = 1;
                            }
                        }
                        obj.modelId = angular.copy(obj.id);
                        delete obj.id;
                        obj.data = {
                            text: "",
                            ids: [],
                            attr: []
                        };
                    })
                })
                clientService.versionByTarget($scope.clientId).then(function(e) {
                    $scope.fromApp = e.data.data.rows;
                    if ($scope.fromApp.length > 0) {
                        $scope.showByVersion($scope.fromApp[0]);
                    }

                }, function(error) {
                    console.log("error:", error);
                })
            }

            $scope.showByVersion = function(appObj) {

                //获取模版预览
                $scope.getObjByVersion(appObj.appId);
            }

            $scope.getObjByVersion = function(appId) {

                clientService.getModelData($scope.nameIndex, $scope.clientId, appId).then(function(e) {
                        $scope.fromData = angular.copy(e.data);
                        $scope.fromModules = [];
                        angular.forEach($scope.fromData.datas, function(dataObj, i) {
                            if (dataObj.type == 1 || dataObj.type == 2) {

                                $scope.modelTemplate = angular.copy($scope.model[dataObj.type]);
                                if (dataObj.type == 2 && dataObj.config.episode.option == 2) {
                                    $scope.modelTemplate.episode = dataObj.config.episode.option;
                                    $scope.modelTemplate.isNumber = dataObj.config.isNumber.option;
                                }
                                $scope.fromModules.push(angular.copy($scope.modelTemplate));

                                $scope.fromModules[i].data.text = dataObj.headerTitle;
                                $scope.fromModules[i].line = dataObj.config.line.option;
                                angular.forEach(dataObj.data, function(child, a) {
                                    $scope.fromModules[i].data.attr.push({
                                        "imgUrl": child.videoImage,
                                        "videoName": child.videoName
                                    });
                                })
                            } else {
                                $scope.fromModules.push(angular.copy($scope.model[dataObj.type]));
                                $scope.fromModules[i].data.text = dataObj.headerTitle;
                                //热播
                                if ($scope.fromModules[i].modelId == 5) {
                                    $scope.fromModules[i].headerCount = dataObj.headerCount;
                                    $scope.fromModules[i].data.attr.length = parseInt($scope.fromModules[i].headerCount);
                                    angular.forEach(dataObj.data, function(child, a) {
                                        if (a >= parseInt($scope.fromModules[i].data.headerCount)) {
                                            return;
                                        }
                                        $scope.fromModules[i].data.attr[a] = {
                                            "imgUrl": child.videoImage,
                                            "videoName": child.videoName
                                        };
                                    })
                                    return;
                                }
                                angular.forEach(dataObj.data, function(child, a) {
                                    $scope.fromModules[i].data.attr.push({
                                        "imgUrl": child.videoImage,
                                        "videoName": child.videoName
                                    });
                                })
                            }
                        });
                    },
                    function(error) {
                        console.log("error:", error)
                    });
            }
            $scope.init();
        }
    ]);
});
