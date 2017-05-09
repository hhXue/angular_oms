define([
    'angularAMD',
    'jquery',
    'modules/oms/content/service'
], function(angularAMD, $) {
    'use strict';

    angularAMD.controller('EpgEditCtrl', function($scope, EpgService) {
        var epgEditCtrl = $scope.epgEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.channelList = [];
        $scope.title = $scope.ngDialogData.title;
        var is_create = $scope.ngDialogData.is_create;
        var epg = $scope.epg = $scope.ngDialogData.item;
        var id = $scope.epg.thirdId;
        var fromSrc = $scope.epg.epgSource;
        //epg.thirdId = 0;

        if (epg.id == null) {
            $scope.ngDialogData.item = {};
        }

        epgEditCtrl.checkCloseDialog = function() {

            $scope.errorMessage = '';
            $scope.submitted = true;

            if (!EpgService.isEmptyObject($scope.myform)) {

                //$scope.submitStatus = true;
                EpgService.saveEpg(epg, $scope.uploadfile,$scope).then(function(data) {
                    $scope.closeThisDialog(data);
                }, function(error) {
                    $scope.submitStatus = false;
                    $scope.errorMessage = error;
                });
            }
            console.info('uploadfile222', $scope.uploadfile);

        };
        //choose setEpgSource
        if (is_create) {
            epg.epgSource = 2;
        }
        //search tvsou
        var tempName = '';
        epgEditCtrl.refreshChannels = function(name) {

            console.log('EPG',epg);
            if(!angular.isUndefined(id)){

                EpgService.getChoiceName(id).then(function(resp){

                    tempName = resp.data.thirdName;
                    if(epg.epgSource == resp.data.fromSrc&&name == ''){
                        name = tempName;
                    }else{
                        $scope.epg.thirdId =  ''
                    }
                    EpgService.setName('thirdVideo').getChannelList(name, epg.epgSource).then(function(resp) {
                        $scope.channelList = resp.data.rows;
                        angular.forEach($scope.channelList, function(obj, e) {

                            //判断默认选中的值所在数组内的索引
                            if (obj.id == id&&obj.fromSrc == fromSrc) {
                                $scope.epg.thirdId = $scope.channelList[e].id;
                                console.log("obj,$scope.epg",obj,$scope.epg)
                            }else{
                                if(obj.fromSrc !== fromSrc){
                                    $scope.epg.thirdId =  '';
                                }
                            }

                        });

                    }, function(error) {
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    });
                },function(){});

            }
            else{
                EpgService.setName('thirdVideo').getChannelList(name, epg.epgSource).then(function(resp) {
                    $scope.channelList = resp.data.rows;
                }, function(error) {
                    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                });
            }

        };
        $scope.selectedRanges = [];
    });
});
