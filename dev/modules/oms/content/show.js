define([
    'angularAMD',
    'modules/oms/content/service',
    'Session'
], function(angularAMD) {
    'use strict';
    angularAMD.controller('ShowCtrl', ['$scope', 'contentService', 'Session', '$controller', '$stateParams', 'APP_CONFIG', 'ngDialog', '$state',
        function($scope, contentService, Session, $controller, $stateParams, config, ngDialog, $state) {

            console.log("$stateParams", $stateParams);
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });
            $scope.dataConfig = {
                edit:{
                    template:'modules/oms/content/vodEdit.html',
                    data:{
                        title:'编辑栏目'
                    },
                    controller:'VodEditCtrl'
                },
                area: {
                    template: 'modules/oms/content/channelOption.html',
                    data: {
                        title: "所属地域",
                        objName:'area',
                        type: 5
                    },
                    controller: 'changeCtrl'
                }
            };
            //set item service
            $scope.itemService = contentService.setName('vod');

            //get list page
            $scope.methods = $state.current.data.methods;
            $scope.$state = $state;
            if (typeof $scope.methods.index.name != 'undefined') {
                $scope.getResultsPage($scope.currentPage);
            }
            //获取地域数据
            contentService.getAllArea().then(function(resp){
                console.log('resp area===',resp)
                $scope.areaList = resp.data.rows;
            },function(){

            });

            //--config state
            var objModel = [{
                template: 'modules/oms/content/showOption.html',
                data: {
                    title: "选择标签",
                    objName: "tag",
                    name: "videoTag",
                    type: 2
                },
                controller: "ShowOptionCtrl"
            }, {
                template: 'modules/oms/content/showOption.html',
                data: {
                    title: "选择应用",
                    objName: "apps",
                    name: "appRelation",
                    //id:$scope.show.showApplication,
                    type: 0
                },
                controller: "ShowOptionCtrl"
            }, {
                template: 'modules/oms/content/showOption.html',
                data: {
                    title: "计费类型",
                    objName: "vod"
                },
                controller: "ShowOptionCtrl"
            },{
                template:'modules/oms/content/showOption.html',
                    data:{
                    title:'所属地域',
                    objName: "area"
                },
                controller:'ShowOptionCtrl'
            }];


            //get list page
            var showCtrl = $scope.showCtrl = {};
            $scope.typeSrc = {
                1: "自制",
                2: "第三方"
            };
            $scope.typeState = {
                1: "上线",
                2: "下线"
            };
            //is or no online
            showCtrl.update = function(item, states) {
                contentService.saveItem({
                    id: item.id,
                    videoStatus: states
                },$scope).then(function(e) {
                    $scope.submitStatus = false;
                    item.videoStatus = e.data.videoStatus;
                    //$scope.getResultsPage($scope.currentPage);
                }, function(e) {
                    $scope.submitStatus = false;
                    console.log("error:" + e);
                })
            };
            //is or no download
            showCtrl.isDown = function(item, states) {
                contentService.saveItem({
                    id: item.id,
                    isDownload: states
                },$scope).then(function(e) {
                    $scope.submitStatus = false;
                    item.isDownload = e.data.isDownload
                }, function(e) {
                    $scope.submitStatus = false;
                    console.log("error:" + e);
                })
            };
            //配置标签，设置应用，设置计费
            showCtrl.changeItem = function(index, id) {
                objModel[index].data.isAll = 1;
                console.log("index", index);
                if (angular.isDefined(id)) {
                    objModel[index].data.id = id;
                }

                console.log("父类窗口",$scope);
                var ngdialog = ngDialog.open(objModel[index]);
               // if(index==2){
                    ngdialog.closePromise.then(function () {
                        contentService.setName('vod');
                        $scope.getResultsPage($scope.currentPage);
                    });
               // }

                console.log("ngdialog", ngdialog);
            };
            //获得计费表
            contentService.getChargetype().then(function(e){
                $scope.chargeTypes = [];
                angular.forEach(e.data,function(value,key){
                    $scope.chargeTypes.push({
                        id:value,
                        name:value
                    })
                });
            },function(error){
                console.log("error", error);
            });
            //获得vodurls表
            showCtrl.getVideo = function(id) {
                var ngdialog = ngDialog.open({
                    template: 'modules/oms/content/showEdit.html',
                    data: {
                        title: "视频列表",
                        id: id
                    },
                    controller: 'ShowEditCtrl'
                });
                ngdialog.closePromise.then(function (data) {
                    console.log(data.id + ' has been dismissed.');
                    $scope.getResultsPage($scope.currentPage);
                });

            };
            //播放视频 预览
            showCtrl.showVideo = function(id) {
                console.log('showVideo id', id);
                //var urlId = $scope.ngDialogData.urlId;
                contentService.getVideo(id).then(function(resp) {

                    console.log('showVideo resp', resp);
                    $scope.urlId = resp.data[0].id;
                    console.log("$scope.urlId", $scope.urlId);

                    var ngdialog = ngDialog.open({

                        template: 'modules/oms/content/showVideo.html',

                        data: {
                            title: "视频",
                            id: id,
                            urlId: $scope.urlId
                        },

                        controller: 'ShowVideoCtrl'
                    });
                }, function(error) {

                    $scope.urlId = 0;
                    alert('无播放数据！');

                });

            };
            console.log("ngDialog", ngDialog.data);

            //search
            $scope.itemCtrl.search = function() {
                $scope.itemService = contentService.setName('vod');
                $scope.getResultsPage(1, $scope.searchParams);
            }

        }
    ]);

});
