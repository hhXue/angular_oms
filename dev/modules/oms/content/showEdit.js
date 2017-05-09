define([
    'angularAMD',
    'modules/oms/content/service',
], function(angularAMD) {
    'use strict';

    angularAMD.controller('ShowEditCtrl', function($scope, contentService, StarsUtils) {
        var showEditCtrl = $scope.showEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        var vod = $scope.vod = $scope.ngDialogData.item;
        var id = $scope.id = $scope.ngDialogData.id;

        //全部上下线
        showEditCtrl.editAllline = function(index) {
            console.log("$scope.items", $scope.items);
            $scope.ids = [];
            $scope.status = [];

            for (var i in $scope.items) {

                $scope.ids.push($scope.items[i].id);
                $scope.status.push($scope.items[i].urlStatus);

            }
            console.log("$scope.ids", $scope.ids.toString());
            console.log("$scope.status", $scope.status)
            if (index == 1) online();
            if (index == 0) offline();
        };

        function online() {

            var ids = $scope.ids.toString();
            if ($scope.status)

                contentService.saveVideosOn(ids).then(function() {
                getList();
                StarsUtils.alert('上线成功');

            }, function() {
                StarsUtils.alert('上线失败');
            })
        }

        function offline() {

                var ids = $scope.ids.toString();
                contentService.saveVideosOff(ids).then(function() {

                    getList();
                    StarsUtils.alert('下线成功');

                }, function() {
                    StarsUtils.alert('下线失败');
                })
            }

            //is or no download

        showEditCtrl.changeDownload = function(item, states) {

            contentService.saveVideo({
                id: item.id,
                isDownload: states

            }).then(function(e) {

                getList();

            }, function() {
                console.log("error:" + e);
            })
        };
        //is or no urlStatus
        showEditCtrl.changeState = function(item, states) {

            contentService.saveVideo({

                id: item.id,
                urlStatus: states

            }).then(function(e) {

                getList();

            }, function() {
                console.log("error:" + e);
            })
        };
        //is or no vip
        showEditCtrl.changeVip = function(item, states) {
            console.log('item,states',item,states);

            contentService.saveVideo({

                id: item.id,
                vip: states

            }).then(function(e) {

                getList();

            }, function() {
                console.log("error:" + e);
            })
        };
        //delete
        showEditCtrl.deleteShow = function(id) {

                StarsUtils.confirm('确定删除吗？', '删除', '不删除').then(function() {

                    contentService.deleteShow(id).then(function(list) {
                        getList();
                        StarsUtils.alert('删除成功');
                    }, function(reason) {
                        StarsUtils.alert('删除失败:' + reason);

                    });
                })
            }
            //获取子点播列表vodurls
        function getList() {
            contentService.getVideo(id).then(function(resp) {
                console.log('getVideo resp', resp);
                $scope.items = resp.data;

            }, function() {

            })
        }
        getList();

    });

});
