define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD) {
    'use strict';

    //模块控制器 》里面的方法
    angularAMD.controller('versionCtrl', ['$scope', 'clientService', '$controller', '$state', 'ngDialog',
        function($scope, clientService, $controller, $state, ngDialog) {
            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.type = $state.params.type;
            $scope.clientId = $state.params.clientId;
            $scope.tabletId = $state.params.tabletId;
            $scope.nameIndex = $state.params.nameIndex;

            $scope.toId = null;
            $scope.fromApp = [];
            $scope.leftApp;
            $scope.fromModules;
            $scope.toApp;
            $scope.rightApp;

            $scope.dialogConfig = [{
                template: 'modules/oms/client/versionOption.html',
                data: {
                    title: "选择应用",
                    objName: "appRelation",
                    targetId: $scope.clientId,
                    tabletId: $scope.tabletId,
                    appIds: [],
                    type: 0
                },
                controller: 'versionAppCtrl'
            }, {
                template: 'modules/oms/client/versionOption.html',
                data: {
                    title: "选择模版",
                    objName: "target",
                    targetId: $scope.clientId,
                    tabletId: $scope.tabletId,
                    type: 1
                },
                controller: 'versionAppCtrl'
            }];

            var versionCtrl = $scope.versionCtrl = {};

            $scope.modelDemo = {
                appKey: "WnJY48akhyvc",
                appOs: "",
                appVer: ""
            };

            //获取模型列表
            versionCtrl.getModelList = function() {
                clientService.getClientModels(0).then(function(e) {
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
            }

            //选择版本
            versionCtrl.changeVersion = function() {
                var appIdCount = [];
                var ngdialog = ngDialog.open($scope.dialogConfig[0]);

                ngdialog.closePromise.then(function(data) {
                    if (typeof data.value == "undefined" || data.value == "$document" || data.value == "$closeButton" || data.value == 0) {
                        return;
                    }
                    //$scope.fromApp = [];
                    angular.forEach(data.value, function(obj, i) {
                        var idPush = false;
                        angular.forEach($scope.fromApp, function(app) {
                            if (app.appId == obj.id) {
                                idPush = true;
                            }
                        });
                        if (!idPush) {
                            var newObj = {
                                appId: obj.id,
                                appKeyName:obj.appKeyName,
                                appsAppOs: obj.name,
                                appsAppVersion: obj.version
                            };
                            $scope.fromApp.push(newObj);
                        }
                    })
                });
            };

            //左侧模版选择
            versionCtrl.ckFrom = function(obj, index) {
                if ($scope.fromAppCk.indexOf(obj) < 0) {
                    $scope.fromAppCk.push(obj);
                    $scope.modelDemo.appOs = obj.name;
                    $scope.modelDemo.appVer = obj.version;
                } else {
                    $scope.fromAppCk.splice($scope.fromAppCk.indexOf(obj), 1);
                }
            }

            //右侧模版选择
            versionCtrl.toCk = function(obj, index) {

                    if ($scope.toAppCk.indexOf(obj) < 0) {
                        $scope.toAppCk.push(obj);
                        $scope.modelDemo.appOs = obj.name;
                        $scope.modelDemo.appVer = obj.version;
                    } else {
                        $scope.toAppCk.splice($scope.toAppCk.indexOf(obj), 1);
                    }
                }
                //左侧移右
            versionCtrl.removeByFrom = function() {
                if ($scope.fromApp.length == 0) {
                    $scope.fromModules = [];
                    $scope.leftApp = null;
                    $scope.fromData.fromTitle = angular.copy($scope.fromData.title);
                    return;
                }
                $scope.toApp.push(angular.copy($scope.leftApp));
                $scope.fromApp.splice($scope.fromApp.indexOf($scope.leftApp), 1);

                if ($scope.fromApp.length > 0) {
                    versionCtrl.getLeftModel($scope.fromApp[0]);
                    if ($scope.toApp.length == 1) {
                        $scope.getRightModel($scope.toApp[0]);
                    }
                } else {
                    $scope.fromModules = [];
                    $scope.leftApp = null;
                    $scope.fromData.fromTitle = angular.copy($scope.fromData.title);
                    return;
                }

            };

            //右侧移左
            versionCtrl.removeByTo = function() {
                if ($scope.toApp.length == 0) {
                    $scope.toModules = [];
                    $scope.rightApp = null;
                    $scope.toData.toTitle = angular.copy($scope.toData.title)
                    return;
                }
                $scope.fromApp.push(angular.copy($scope.rightApp));
                $scope.toApp.splice($scope.toApp.indexOf($scope.rightApp), 1);

                if ($scope.toApp.length > 0) {
                    $scope.getRightModel($scope.toApp[0]);
                    if ($scope.fromApp.length == 1) {
                        versionCtrl.getLeftModel($scope.fromApp[0]);
                    }
                } else {
                    $scope.toModules = [];
                    $scope.rightApp = null;
                    $scope.toData.toTitle = angular.copy($scope.toData.title)
                    return;
                }

            };

            //选择右侧模版
            versionCtrl.changeModel = function() {
                var ngdialog = ngDialog.open($scope.dialogConfig[1]);
                ngdialog.closePromise.then(function(data) {
                    if (data.value == "$document" || data.value == "$closeButton" || data.value.length == 0) {
                        return;
                    }
                    $scope.toId = data.value[0].id;
                    $scope.toApp = [];
                    $scope.toModules = new Object();
                    $scope.toData = new Object();
                    //获取右侧支持app集合
                    clientService.versionByTarget(data.value[0].id).then(function(e) {
                        $scope.toApp = e.data.data.rows;
                        if ($scope.toApp.length > 0) {
                            $scope.getRightModel($scope.toApp[0]);
                        } else {
                            $scope.getRightModel();
                        }
                    }, function(error) {
                        console.log("error:", error);
                    })
                });
            }

            versionCtrl.save = function() {
                var firstApp = [];
                angular.forEach($scope.fromApp, function(obj) {
                    firstApp.push(obj.appId);
                })
                var secondApp = [];
                angular.forEach($scope.toApp, function(obj) {
                    secondApp.push(obj.appId);
                })
                if (firstApp.length == 0) {
                    firstApp = -1;
                }
                if (secondApp.length == 0) {
                    secondApp = -1;
                }
                var json = {
                    arr: [{
                        refId: $scope.clientId,
                        appId: firstApp
                    }]
                };
                if ($scope.toId != null) {
                    json.arr.push({
                        refId: $scope.toId,
                        appId: secondApp
                    });
                }
                $scope.submitStatus = true;
                clientService.versionEach(json).then(function(e) {
                    alert("保存成功");
                    $scope.itemCtrl.back();
                }, function(error) {
                    $scope.submitStatus = false;
                    console.log("error:" + error)
                })
            }

            $scope.init = function() {
                $scope.route();

                versionCtrl.getModelList();

                versionCtrl.leftVersion();

                $scope.itemService = clientService.setName('apps');
            };

            versionCtrl.leftVersion = function() {
                clientService.versionByTarget($scope.clientId).then(function(e) {
                    $scope.fromApp = e.data.data.rows;
                    //获取左侧列表
                    if ($scope.fromApp.length > 0) {
                        versionCtrl.getLeftModel($scope.fromApp[0]);
                    } else {
                        versionCtrl.getLeftModel();
                    }
                }, function(error) {
                    console.log("error:", error);
                })
            };

            versionCtrl.getLeftModel = function(appObj) {

                $scope.leftApp = appObj;
                var leftAppId;
                if (typeof appObj == "undefined" || appObj == null) {
                    leftAppId = 0;
                } else {
                    leftAppId = appObj.appId;
                }
                clientService.getModelData($scope.nameIndex, $scope.clientId, leftAppId).then(function(e) {
                        $scope.fromData = angular.copy(e.data);
                        $scope.fromModules = [];
                        angular.forEach($scope.fromData.datas, function(dataObj, i) {

                            if (dataObj.type == 1 || dataObj.type == 2) {

                                $scope.modelTemplate = angular.copy($scope.model[dataObj.type]);
                                if (dataObj.type == 2 && dataObj.config.episode.option == 2) {
                                    $scope.modelTemplate.episode = dataObj.config.episode.option;
                                    $scope.modelTemplate.isNumber = dataObj.config.isNumber.option;
                                }

                                $scope.fromModules.push($scope.modelTemplate);
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
                                    $scope.fromModules[i].data.headerCount = dataObj.headerCount;
                                    $scope.fromModules[i].data.attr.length = parseInt($scope.fromModules[i].data.headerCount);
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

            //获取右侧列表数据
            $scope.getRightModel = function(appObj) {
                $scope.toModules = [];
                $scope.rightApp = appObj;
                var rightAppId;
                if (typeof appObj == "undefined" || appObj == null) {
                    rightAppId = 0;
                } else {
                    rightAppId = appObj.appId;
                }
                clientService.getModelData($scope.nameIndex, $scope.toId, rightAppId).then(function(e) {
                        $scope.toData = angular.copy(e.data);

                        angular.forEach($scope.toData.datas, function(dataObj, i) {
                            if (dataObj.type == 1 || dataObj.type == 2) {

                                $scope.modelTemplate = angular.copy($scope.model[dataObj.type]);
                                if (dataObj.type == 2 && dataObj.config.episode.option == 2) {
                                    $scope.modelTemplate.episode = dataObj.config.episode.option;
                                    $scope.modelTemplate.isNumber = dataObj.config.isNumber.option;
                                }

                                $scope.toModules.push($scope.modelTemplate);
                                $scope.toModules[i].data.text = dataObj.headerTitle;
                                $scope.toModules[i].line = dataObj.config.line.option;
                                angular.forEach(dataObj.data, function(child, a) {
                                    $scope.toModules[i].data.attr.push({
                                        "imgUrl": child.videoImage,
                                        "videoName": child.videoName
                                    });
                                })
                            } else {
                                $scope.toModules.push(angular.copy($scope.model[dataObj.type]));
                                $scope.toModules[i].data.text = dataObj.headerTitle;

                                //热播
                                if ($scope.toModules[i].modelId == 5) {
                                    $scope.toModules[i].data.headerCount = dataObj.headerCount;
                                    $scope.toModules[i].data.attr.length = parseInt($scope.toModules[i].data.headerCount);
                                    angular.forEach(dataObj.data, function(child, a) {
                                        if (a >= parseInt($scope.toModules[i].data.headerCount)) {
                                            return;
                                        }
                                        $scope.toModules[i].data.attr[a] = {
                                            "imgUrl": child.videoImage,
                                            "videoName": child.videoName
                                        };
                                    })
                                    return;
                                }

                                angular.forEach(dataObj.data, function(child, a) {
                                    $scope.toModules[i].data.attr.push({
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
            };

            $scope.init();
        }
    ]);

});
