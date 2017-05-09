define([
    'angularAMD',
    'lodash',
    'modules/oms/content/service'
], function(angularAMD, _) {
    'use strict';
    angularAMD.controller('ShowOptionCtrl', ['$scope', 'contentService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, contentService, Session, $controller, $state, ngDialog) {
            //permission control fixed to methods
            var showOptionCtrl = $scope.showOptionCtrl ={};
            var submitted = false;
            $scope.methods = $state.current.data.methods;

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });
            console.log('$scope.show==',$scope.ngDialogData,$scope.app);
            var charge = $scope.charge = {};
            $scope.title = $scope.ngDialogData.title;
            var videoid = $scope.ngDialogData.id;
            var refId = $scope.ngDialogData.id;
            var vod = $scope.vod = {id: videoid};
            $scope.app = {id: refId};
            $scope.typeApp = 'show';

            $scope.searchParams.type = $scope.ngDialogData.type;
            $scope.searchParams.isAll = 1;
            //$scope.searchParams.id = $scope.ngDialogData.id;

            if(angular.isUndefined($scope.vod.tagId)){
                $scope.vod.tagId = [];
            }

            if(angular.isUndefined($scope.app.appId)){
                $scope.app.appId = [];
            }

            //多选 tag app
            $scope.ckMoreTag = function(id){
                if($scope.vod.tagId.indexOf( id )>-1){

                    $scope.vod.tagId.splice($scope.vod.tagId.indexOf(id),1);
                }else{
                    $scope.vod.tagId.push(id);
                }
            };

            $scope.ckMoreApp = function(id){
                if($scope.app.appId.indexOf(id) > -1){

                    $scope.app.appId.splice($scope.app.appId.indexOf(id),1);
                }

                else{
                    $scope.app.appId.push(id);
                }
            }



            //保存数据
            showOptionCtrl.checkCloseDialog = function(){
                $scope.errorMessage = '';

                $scope.submitted = true;
                //tag
                if($scope.title == '选择标签'){
                    contentService.saveTag(vod).then(function(data){
                        $scope.closeThisDialog(data);
                        console.log('data',data);

                    },function(error){
                        // error handle
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;

                    });
                }

                //app
                if($scope.title == '选择应用'){
                    contentService.saveApp($scope.app).then(function(data){
                        $scope.closeThisDialog(data);
                    },function(error){
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    })
                }
                //chargeType
                if($scope.title == '计费类型'){

                    $scope.submitStatus = true;
                    //return;
                    $scope.itemService = contentService.setName('vod');
                    $scope.charge.chargeType = charge.chargeType.id;
                    $scope.charge.id = $scope.ngDialogData.id;
                    //return;
                    contentService.saveItem($scope.charge,$scope).then(function(resp){

                        $scope.closeThisDialog(resp);
                       // getList();
                        $scope.submitStatus = false;

                    },function(error){
                        $scope.submitStatus = false;
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    })

                }

            }
            //计费数据
            contentService.getChargetype().then(function(e){
                $scope.chargelList = [];
                angular.forEach(e.data,function(e){
                    //console.log('e', e);
                    $scope.chargelList.push({
                        id:e.id,
                        name:e.title
                    });
                });
                contentService.showVideoCharge(refId).then(function(resp){

                    for(var i in $scope.chargelList){

                        if($scope.chargelList[i].id == resp.data.chargeType){
                            charge.chargeType = $scope.chargelList[i];
                        }
                    }

                },function(error){
                    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                })

            },function(error){
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
            });

            //get item list
            function getList(){

                console.log("作用于",$scope,$scope.ngDialogData.objName);

                $scope.itemService = contentService.setName($scope.ngDialogData.objName);

                $scope.getResultsPage($scope.currentPage, $scope.searchParams, setTagList);
            }

           getList();

            function setTagList(){
                $scope.videoTagList = [];
                $scope.videoAppList = [];
                if($scope.title == '选择标签'){
                    $scope.itemService = contentService.setName('videoTag');
                    $scope.itemService.getTagsByVideoId(videoid).then(function(resp){

                        $scope.videoTagList = resp.data.rows;

                        console.log('videoTagList',$scope.videoTagList,$scope.items);
                        _.map($scope.items, function(item){

                            if(_.find($scope.videoTagList,{'tagId': item.id})){
                                console.log('ttt',item.id);
                                $scope.ckMoreTag(item.id);
                            }
                        })
                    },function(error){
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    });
                }
                if($scope.title=='选择应用'){
                    $scope.itemService = contentService.setName('appRelation');
                    $scope.itemService.getAppsByVideoId(refId).then(function(resp){

                        $scope.videoAppList = resp.data.rows;
                        console.info('$scope.videoAppList',$scope.videoAppList)

                        console.log('videoAppList',$scope.videoAppList,$scope.items);
                        _.map($scope.items, function(item){

                            if(_.find($scope.videoAppList,{'appId': item.id})){
                                console.log('ttt',item.id);
                                $scope.ckMoreApp(item.id);
                            }
                        })
                    },function(error){
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    });
                }
                //if($scope.title=='所属地域') {
                //    $scope.itemService = contentService.setName('area').setHttpBaseUrl(config.areaUrl);
                //        contentService.getAreaList().then(function(e){
                //            console.log('areaList resp', resp);
                //            $scope.areaLists = resp.data.rows;
                //        }, function(error) {
                //            console.log('error', error);
                //        })
                //}
            }
        }
    ]);

});
