define([
    'angularAMD',
    'modules/oms/content/service',
    'Session'
], function(angularAMD){
    'use strict';
    angularAMD.controller('channelEditCtrl', ['$scope', '$rootScope', 'contentService', 'Session', '$controller', '$state', 'ngDialog', 'StarsUtils','$location','APP_CONFIG',
        function($scope, $rootScope, contentService, Session, $controller, $state, ngDialog, StarsUtils,$location, config) {
            //permission control fixed to methods
            console.info('$location',$location.$$absUrl);
            $scope.methods = $state.current.data.methods;

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            var channelEditCtrl = $scope.channelEditCtrl = {};

            $scope.channel = {};

            //初始化信息
            $scope.init = function() {

                $scope.route($location.$$absUrl);

                $scope.videoId = $state.params.videoId;
                console.log('$scope.videoId==',$scope.videoId)
                //Url选项
                $scope.urlOptions = ["流畅", "标清", "高清", "极速高清", "极速标清", "极速流畅", "手工输入"];

                $scope.channelSubmit = false;
                $scope.urlCount = [{
                    id: 1,
                    selectName: "流畅",
                    pUrlId: "",
                    urlId: 0,
                    writeName: "",
                    location: "",
                    sourceId:'',
                    sourceName:'',
                    vip:0
                }];

                $scope.channel = {};

                $scope.urlObj = {
                    urlId: 0,
                    is_showUrl : 1
                };
                //新增初始会员类型
                $scope.channel.vip = 0;

                //计费类型
                contentService.getChargetype().then(function(e) {
                    $scope.chargetypes = [];
                    angular.forEach(e.data, function(obj, i) {
                        $scope.chargetypes.push({
                            id: obj.id,
                            name: obj.title
                        });
                    });

                    $scope.chargetype = $scope.chargetypes[0];

                }, function(error) {
                    console.log("error", error);
                });

                $scope.loading = false;
                //  修改
                if ($scope.videoId != -1) {
                    $scope.loading_list = true;
                    $scope.channel.vip = 0;
                    contentService.editData($scope.videoId).then(function(e) {

                        $scope.loading_list = false;
                        //item是select-image指令用到的对象，channel赋值的同时赋值给item
                        //html页面需要添加属性item="item"
                        //在指令中从item获取ngModel设置的字段，如果有值，则显示
                        $scope.item = angular.copy(e.data);
                        $scope.chargetype = $scope.chargetypes[$scope.item.chargeType];
                        angular.forEach($scope.chargetypes, function(obj, e) {
                            if ($scope.item.chargeType == obj.id) {
                                $scope.chargetype = $scope.chargetypes[e];
                            }
                        });

                        $scope.channel = e.data;
                        console.info('$scope.channel###########',$scope.channel);
                        $scope.channel.name = $scope.channel.videoName;
                        $scope.channel.id = $scope.videoId;
                        if (angular.isDefined($scope.channel.images) && $scope.channel.images.length > 0) {
                            $scope.channel.videoImage = $scope.channel.images[0].imagePath;
                            $scope.channel.videoTvImage = $scope.channel.images[1].imagePath;
                            $scope.channel.videoShareImage = $scope.channel.images[2].imagePath;
                        }
                        if ($scope.channel.videoStatus == 1) {
                            $scope.channel.videoStatus = 2;
                        }

                        $scope.channel.is_showUrl = 1;


                        //复制 放入空间存储 zai ckup方法里用于判断是否更改标签 如果更改返回新的 否 返回-1
                        $scope.channelOld = angular.copy($scope.channel);
                        $scope.tagListData = angular.copy($scope.channel.videoTag);

                        $scope.videoCp = [];
                        $scope.channel.videoCp = [];

                        $scope.videoApp = [];
                        $scope.channel.videoApp = [];

                        $scope.channel.categoryList = angular.copy($scope.channel.rows.categoryList);
                        //$scope.videoCategory = "";
                        //$scope.channel.videoCategory = [];

                        $scope.videoTag = [];
                        $scope.channel.videoTag = [];

                        if ($scope.channelOld.videoUrl.length > 0) {
                            $scope.urlCount = [];
                        }

                        if ($scope.channelOld.urlSource == 1 && $scope.channelOld.videoUrl.length > 0) {

                            $scope.urlObj.title = $scope.channelOld.videoUrl[0].title;
                            $scope.urlObj.location = $scope.channelOld.videoUrl[0].location;
                            $scope.urlObj.urlId = $scope.channelOld.videoUrl[0].urlId;
                        }


                        //videoUrl
                        angular.forEach($scope.channelOld.videoUrl, function(e, i) {
                            var title = "";
                            var write = "";
                            if ($scope.urlOptions.indexOf(e.title) >= 0) {
                                title = e.title;
                            } else {
                                title = "手工输入";
                                write = e.title;
                            }
                            //获取源
                            //$scope.itemService = contentService.setName('liverSource')
                            contentService.showSourceList(e.lsId).then(function(data) {
                                console.info("data*********",data);
                                e.lsName = data.data.lsName;
                                //e.location = data.data.location;
                                var option = {
                                    id: i,
                                    selectName: title,
                                    writeName: write,
                                    pUrlId: e.pUrlId,
                                    urlId: e.urlId,
                                    location: e.location,
                                    source: e.lsId + ' ' + e.lsName,
                                    sourceId: e.lsId,
                                    sourceName: e.lsName,
                                    vip: e.vip
                                };
                                console.info('option===========',option);
                                //前台url 列表显示集合
                                $scope.urlCount.push(option);
                                contentService.setHttpBaseUrl( config.httpBaseUrl );
                            },function(error){
                                console.info("error----------",error);
                                if(error.status == 404){
                                    var option = {
                                        id: i,
                                        selectName: title,
                                        writeName: write,
                                        pUrlId: e.pUrlId,
                                        urlId: e.urlId,
                                        location: e.location,
                                        source: " ",
                                        sourceId: e.lsId,
                                        vip: e.vip

                                    };
                                    //前台url 列表显示集合
                                    $scope.urlCount.push(option);
                                    contentService.setHttpBaseUrl( config.httpBaseUrl );
                                }

                            });
                        });

                        //videoCp
                        angular.forEach($scope.channelOld.videoCp, function(e, i) {
                            //前台展示的name
                            $scope.videoCp.push(e.cpName);
                            //隐藏给后台数据库的id 值
                            $scope.channel.videoCp.push(e.cpId);
                        });

                        //videoApp
                        angular.forEach($scope.channelOld.appRelation, function(e, i) {
                            //前台显示的 app name
                            $scope.videoApp.push(e.appKeyName + e.appsAppOs + e.appsAppVersion);
                            //隐藏给后台数据库的id 值
                            $scope.channel.videoApp.push(e.appId);
                        });


                        //设置频道Epg
                        if (typeof $scope.channelOld.videoEpg != "undefined") {
                            $scope.videoEpg = $scope.channelOld.videoEpg.videoName;
                            $scope.channel.videoEpg = $scope.channelOld.videoEpg.videoId;
                        }
                        //videoCategory
                        if($scope.channel.categoryList.length>0){
                            $scope.channel.videoCategory = angular.copy($scope.channel.categoryList[0].categoryId);
                            $scope.videoCategory = angular.copy($scope.channel.categoryList[0].categoryName);
                        }

                        //if (!angular.isDefined($scope.channel.categoryList)) {
                        //    $scope.channel.categoryList = [];
                        //}
                        //if ($scope.channel.categoryList.length == 0) {
                        //    $scope.channel.videoCategory = [];
                        //} else {
                        //    $scope.channel.videoCategory = angular.copy($scope.channel.categoryList[0].categoryId);
                        //    $scope.videoCategory = angular.copy($scope.channel.categoryList[0].categoryName);
                        //}

                        //videoCategory
                        console.log('$scope.channelOld====',$scope.channelOld,$scope.channel.videoCategory,$scope.channel.videoCategory);
                        if (typeof $scope.channelOld.videoCategory != "undefined" && $scope.channelOld.videoCategory.length > 0) {
                            $scope.videoCategory = $scope.channelOld.videoCategory[0].categoryName;
                            $scope.channel.videoCategory = $scope.channelOld.videoCategory[0].categoryName.categoryId;
                        }

                        //videotag
                        angular.forEach($scope.channelOld.videoTag, function(e, i) {
                            $scope.videoTag.push(e.tagName);
                            $scope.channel.videoTag.push(e.tagId);
                        })



                    }, function(error) {
                        console.log("data is error", error);
                    });


                } else {
                    $scope.channel.urlSource = 0;
                }
            };

            $scope.init();

            //弹出框 选择对应的标签或子项
            channelEditCtrl.changeItem = function(index) {
                var objModel = [{
                    template: 'modules/oms/content/channelOption.html',
                    data: {
                        title: "选择EPG频道",
                        objName: "videoEpg",
                        id: $scope.channel.videoEpg,
                        type: 0
                    },
                    controller: 'changeCtrl'
                }, {
                    template: 'modules/oms/content/channelOption.html',
                    data: {
                        title: "选择CP",
                        objName: "cps",
                        id: $scope.channel.videoCp,
                        type: 1
                    },
                    controller: 'changeCtrl'
                }, {
                    template: 'modules/oms/content/channelOption.html',
                    data: {
                        title: "选择频道分类",
                        objName: "category",
                        id: $scope.channel.categoryList&&$scope.channel.categoryList.length>0 ?[$scope.channel.categoryList[0].categoryId]:'',
                        type: 0
                    },
                    controller: 'changeCtrl'
                }, {
                    template: 'modules/oms/content/channelOption.html',
                    data: {
                        title: "选择频道标签",
                        objName: "tag",
                        id: $scope.channel.videoTag,
                        type: 2
                    },
                    controller: 'changeCtrl'
                }, {
                    template: 'modules/oms/content/channelOption.html',
                    data: {
                        title: "选择频道应用",
                        objName: "apps",
                        id: $scope.channel.videoApp,
                        type: 3
                    },
                    controller: 'changeCtrl'
                }];

                //根据 index 打开不同数据的模态框
                var ngdialog = ngDialog.open(objModel[index]);
                //模态框关闭
                ngdialog.closePromise.then(function(data) {
                    console.log('data=============',data);
                    //如果是点击的   X 或 取消  返回不走下面的函数
                    if (typeof data.value == "undefined" || data.value == "$document" || data.value == "$closeButton" || data.value == 0) {
                        return;
                    }

                    var id = [];
                    var value = [];
                    angular.forEach(data.value, function(i, vl) {
                        id.push(i.id);
                        if (index == 4) {
                            id.push(i.appsId);
                            console.log('video i====',i);
                            //value.push(i.appKeyName + i.name + i.version);
                            value.push(i.appKeyName + i.appsAppOs + i.appsAppVersion);
                        } else {
                            value.push(i.name);
                        }
                    });
                    if (index == 0) {
                        $scope.videoEpg = value[0];
                        $scope.channel.videoEpg = id[0];
                    } else if (index == 1) {
                        $scope.videoCp = value;
                        $scope.channel.videoCp = id;
                    } else if (index == 2) {
                        $scope.videoCategory = value[0];
                        $scope.channel.videoCategory = id[0];
                    } else if (index == 3) {
                        $scope.videoTag = value;
                        $scope.channel.videoTag = id;
                    } else if (index == 4) {
                        $scope.videoApp = value;
                        $scope.channel.videoApp = id;
                    }
                });
            };
            channelEditCtrl.changeVideoType = function(model, index) {

                $scope.urlCount[index].selectName = model;
            };

            //验证Url
            function ckform(value) {
                var str = value;
                var reg = /(http|https|p2p|ftp|rtsp|rtsp|igmp|file|rtspt|rtspu):\/\/[^\/]+/;
                var urlReg = new RegExp(reg);
                var flag = !!str.match(urlReg);
                if (!flag) {
                    return false;
                } else {
                    return true;
                }
            }
            //url 输入框离开时 将提示信息删除
            channelEditCtrl.urlblur = function() {
                $scope.formatError = 0;
            };

            //提交
            channelEditCtrl.channelSave = function() {
                    $scope.channelSubmit = true;

                    //关键字段不能为空
                    if (!contentService.isEmptyObject($scope.myform.$error)) {
                        return;
                    } else {

                        $scope.channel.videoUrl = [];
                        if ($scope.channel.urlSource == 0) {
                            //设置url格式
                            angular.forEach($scope.urlCount, function(e, i) {
                                console.log('e====',e);

                                if (!ckform(e.location)) {
                                    $scope.formatError = 1;
                                    return;
                                }
                                if (e.pUrlId != -2) {
                                    if (typeof e.writeName != "undefined" && e.writeName.length > 0 && e.selectName=='手工输入') {
                                        $scope.channel.videoUrl.push({
                                            "title": e.writeName,
                                            "location": e.location,
                                            "pUrlId": e.pUrlId,
                                            "urlId": e.urlId,
                                            "urlSort": i,
                                            "lsId":e.sourceId,
                                            "vip":e.vip
                                        });
                                    } else {
                                        $scope.channel.videoUrl.push({
                                            "title": e.selectName,
                                            "location": e.location,
                                            "pUrlId": e.pUrlId,
                                            "urlId": e.urlId,
                                            "urlSort": i,
                                            "lsId":e.sourceId,
                                            "vip":e.vip
                                        });
                                    }
                                }
                            })
                        } else {
                            if (typeof $scope.urlObj.title == "undefined") {
                                $scope.urlObj.title = "";
                            }
                            if (typeof $scope.urlObj.location == "undefined") {
                                $scope.urlObj.location = "";
                            }

                            //验证第三方唤醒方式 固定格式
                            // if (!ckform($scope.urlObj.location)) {
                            //     $scope.formatError = 1;
                            //     return;
                            // }

                            $scope.channel.videoUrl.push({
                                "title": $scope.urlObj.title,
                                "location": $scope.urlObj.location,
                                "pUrlId": -2,
                                "urlId": $scope.urlObj.urlId,
                                "urlSort": 0,
                                "lsId":$scope.urlObj.sourceId,
                                "vip":$scope.urlObj.vip
                            });
                        }
                        if ($scope.formatError == 1) {
                            return;
                        }

                        $scope.itemService = contentService.setName('video').setHttpBaseUrl( config.httpBaseUrl );

                        //如果是修改 判定标签是否更改
                        // id不为空 且有值
                        $scope.submitStatus = true;
                        $scope.channel.chargeType = $scope.chargetype.id;
                        if (typeof $scope.channel.videoId != "undefined") {

                            //判断数据 是否新增 还是修改
                            if (channelEditCtrl.ckUp($scope.channelOld, $scope.channel.videoCp,
                                    $scope.channel.videoApp, $scope.channel.videoCategory, $scope.channel.videoTag,
                                    $scope.channel.videoEpg)) {
                                $scope.channel.categoryList = $scope.channel.videoCategory;
                                console.log('$scope.channel++++=========',$scope.channel);
                                //return;
                                contentService.saveItem($scope.channel, $scope).then(function(e) {
                                    $scope.itemCtrl.back();
                                }, function(error) {

                                    $scope.submitStatus = false;
                                    var str = [];
                                    if (error.status == 400) {
                                        angular.forEach(error.data.message, function(e) {
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
                            }
                        } else {
                            $scope.channel.categoryList = $scope.channel.videoCategory;
                            console.log('$scope.channel-----=========',$scope.channel);
                            //return;
                            contentService.saveItem(angular.copy($scope.channel), $scope).then(function(e) {
                                $scope.submitStatus = false;
                                $state.go("site.oms.contents.video");
                            }, function(error) {
                                $scope.submitStatus = false;
                                console.log("data is error:", error);
                            });
                        }
                    }
                };
                //修改 未修改的标签更改值-1 传递到后台
            channelEditCtrl.ckUp = function(oldData, newCp, newApp, newCategory, newTag) {

                    var cp = [];
                    var app = [];
                    var tag = [];
                    var videoCategory = "";
                    //videoCp
                    angular.forEach(oldData.videoCp, function(e, i) {
                            cp.push(e.cpId);
                        });
                        //videoApp
                    angular.forEach(oldData.videoApp, function(e, i) {
                            app.push(e.appId);
                        });
                        //videotag
                    angular.forEach(oldData.videoTag, function(e, i) {
                        tag.push(e.tagId);
                    });

                    if ($scope.channel.videoType != oldData.videoType) {
                        return true;
                    }

                    if (typeof oldData.videoEpg[0] != "undefined" && typeof oldData.videoEpg[0].videoId != "undefined" && oldData.videoEpg[0].videoId == $scope.channel.videoEpg) {
                        $scope.channel.videoEpg = -1;
                    }

                    if (typeof oldData.videoCategory == "undefined" || oldData.videoCategory.length == 0) {
                        videoCategory = -1;
                    } else {
                        videoCategory = oldData.videoCategory[0].categoryId;
                    }

                    if (newCp != -1 && cp.sort().toString() == newCp.sort().toString()) {
                        $scope.channel.videoCp = -1;
                    }

                    if (app.sort().toString() == newApp.sort().toString()) {
                        $scope.channel.videoApp = -1;
                    }

                    if (newTag != -1 && tag.sort().toString() == newTag.sort().toString()) {
                        $scope.channel.videoTag = -1;
                    }

                    return true;
                };

            channelEditCtrl.radioType = function(){
                console.info('$scope.urlCount=====++++',$scope.urlCount);
                $scope.urlCount.map(function(b){
                    if(b.pUrlId == -2){
                        $scope.urlCount = [{
                            id: 1,
                            selectName: "流畅",
                            pUrlId: "",
                            urlId: 0,
                            writeName: "",
                            location: "",
                            source:''
                        }];
                    }

                })
            };
                //添加Url输入框
            channelEditCtrl.addUrl = function() {
                    var urlOption = {
                        id: $scope.urlCount.length,
                        selectName: "流畅",
                        writeName: "",
                        urlId: 0,
                        pUrlId: "",
                        location: "",
                        flag:0,
                        urlObj : 2,
                        source:'',
                        vip:''
                    };
                    $scope.urlCount.push(urlOption);
                };
                //url选取源id 源名称
            channelEditCtrl.chooseMore = function(index){
                var openDia = ngDialog.open({
                    template: 'modules/oms/content/channelOption.html',
                    data: {
                        title: "添加源",
                        objName:"liverSource",
                        type: 4
                    },
                    controller: 'changeCtrl'
                });
                openDia.closePromise.then(function(data){
                    console.info('data.value==',data);
                    if(data.value == 0 || data.value == '$closeButton'){
                        return;
                    }
                    $scope.urlCount[index].source = data.value[0].sourceId + ' ' +data.value[0].sourceName;
                    $scope.urlCount[index].sourceId = data.value[0].sourceId;
                    $scope.urlCount[index].sourceName = data.value[0].sourceName;
                    $scope.urlCount[index].location = data.value[0].location;

                },function(error){

                })
            };
                //url 多输入更换位置
            channelEditCtrl.upState = function(obj, selectName, index) {
                if (index > 0) {
                    var obj = angular.copy($scope.urlCount[index]);
                    obj.selectName = selectName;
                    var obj1 = angular.copy($scope.urlCount[index - 1]);
                    $scope.urlCount[index] = obj1;
                    $scope.urlCount[index - 1] = obj;
                }
            };
            channelEditCtrl.deleteState = function(index) {

                 //前台url 列表显示集合
                $scope.urlCount.splice(index, 1);

                };
                //url 多输入更换位置
            channelEditCtrl.downState = function(obj, selectName, index) {
                if (index < $scope.urlCount.length - 1) {
                    var obj = angular.copy($scope.urlCount[index]);
                    obj.selectName = selectName;
                    var obj1 = angular.copy($scope.urlCount[index + 1]);
                    $scope.urlCount[index] = obj1;
                    $scope.urlCount[index + 1] = obj;
                }
            }

        }
    ]);

});
