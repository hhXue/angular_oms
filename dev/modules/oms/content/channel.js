define([
    'angularAMD',
    'modules/oms/content/service',
    'Session'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('channelCtrl', ['$scope', 'contentService', 'Session', '$controller', '$state', 'ngDialog', 'StarsUtils',
        function($scope, contentService, Session, $controller, $state, ngDialog, StarsUtils ) {

            //permission control fixed to methods
            console.info('$state',$state);
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.itemService = contentService.setName('video');

            var channelCtrl = $scope.channelCtrl = {};

            $scope.init = function() {



                $scope.dataConfig = {
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

                $scope.statusVal = [{
                    name: '未完善',
                    val: "0"
                }, {
                    name: '上线',
                    val: "1"
                }, {
                    name: '下线',
                    val: "2"
                }];

                if (typeof $scope.methods.index.name != 'undefined') {
                    $scope.getResultsPage($scope.currentPage);
                }
                console.log("对象", $scope);

                //获取地域数据
                contentService.getAllArea().then(function(resp){
                    console.log('resp area===',resp);
                    $scope.areaList = resp.data.rows;
                },function(){

                });


            };

            channelCtrl.update = function(item, status) {
                contentService.upVideoStatus({
                    id: item.id,
                    videoStatus: status
                }).then(function(e) {
                    item.videoStatus = e.data.videoStatus;
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
            //select online
            channelCtrl.selectline = function(status){
                console.info('ids',$scope.ids);
                contentService.upSelectVideoStatus({
                    id:$scope.ids,
                    videoStatus:status
                }).then(function(e) {

                    angular.forEach($scope.items,function(obj){
                        if($scope.ids.indexOf(obj.id) > -1){
                            obj.videoStatus = e.data.videoStatus
                        }
                    })
                    $scope.ids = [];
                    $scope.getResultsPage($scope.currentPage);
                }, function(error) {
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
            };

            //select relative area
            channelCtrl.belongArea = function(id,type,event){
                contentService.getAllArea().then(function(data){},function(error){})
            };


            $scope.init();

            //search
            $scope.itemCtrl.search = function() {
                $scope.itemService = contentService.setName('video');
                $scope.getResultsPage(1, $scope.searchParams);
            }

        }
    ]);

});
