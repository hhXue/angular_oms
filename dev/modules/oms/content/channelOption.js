define([
    'angularAMD',
    'modules/oms/content/service',
    'Session'
], function(angularAMD, BaseCtrl) {
    'use strict';
    angularAMD.controller('changeCtrl', ['$scope', 'contentService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, contentService, Session, $controller, $state, ngDialog) {
            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.idOptions = $scope.ngDialogData.id;
            $scope.relateId = $scope.ngDialogData.videoId;
            $scope.areaType = $scope.ngDialogData.areaRelationType;
            $scope.title = $scope.ngDialogData.title;
            $scope.type = $scope.ngDialogData.type;
            console.info('$scope.ngDialogData=======',$scope.ngDialogData);
            $scope.rItem = [];
            $scope.typeApp = 'video';

            // //单选
            $scope.ckOption = function(obj) {
                console.log('obj-====',obj,$scope.items);
                //if(obj.categoryType){
                    $scope.rItem[0] = obj;
                    angular.forEach($scope.items,function(data){
                        if(data.id == obj.id){
                            data.check = true;
                        }else{
                            data.check = false;
                        }
                    });
                //}


                };
                //多选
            $scope.ckMore = function(obj, ckbox) {
                ckbox = ckbox.target.checked;
                if($scope.type!==5){
                    if (ckbox) {
                        $scope.rItem[obj.id] = obj;
                        //$scope.idOptions.push(obj.id);
                        console.log('rItem++++++',$scope.rItem)
                    } else {
                        delete $scope.rItem[obj.id];
                        //$scope.idOptions.splice($scope.idOptions.indexOf(obj.id),1);
                        console.info('rItem------',$scope.rItem,$scope.idOptions);

                    }
                }
                else{
                    if (ckbox) {
                        $scope.rItem[obj.areaId] = obj;
                        console.log('rItem++++++',$scope.rItem)
                    } else {

                        $scope.rItem.splice($scope.rItem.indexOf(obj), 1);
                        console.info('rItem------',$scope.rItem);

                    }
                }

            };

            //$scope.option = $scope.idOptions;

            $scope.itemService = contentService.setName($scope.ngDialogData.objName);

            if($scope.ngDialogData.objName == 'apps'){
                $scope.searchParams.isAll = 1;
                //$scope.items = [];
                //contentService.getVersionList($scope.searchParams).then(function(resp){
                //    $scope.items = resp.data.rows;
                //});

            }


            if ($scope.ngDialogData.objName == "videoEpg" || $scope.ngDialogData.objName == 'liverSource' || $scope.ngDialogData.objName == 'area') {
                $scope.getResultsPage = function(pageNumber, params, callback) {
                    $scope.currentPage = pageNumber;
                    $scope.items = [];
                    $scope.loading_list = true;

                    if($scope.ngDialogData.objName == "videoEpg"){
                        contentService.getEpgItem(pageNumber, params).then(function(data) {
                            $scope.loading_list = false;
                            $scope.items = data.data.rows;
                            $scope.totalItems = data.data.totalResults;
                        });
                    }
                    if($scope.ngDialogData.objName == 'liverSource'){
                        contentService.getSourceList(pageNumber, params).then(function(data) {
                            console.info("data------",data)
                            $scope.loading_list = false;
                            $scope.items = data.data.rows;
                            $scope.totalItems = data.data.totalResults;
                        });
                    }
                    if($scope.ngDialogData.objName == 'area'){
                        console.info("area------");
                        contentService.getAllArea().then(function(data) {
                            console.info("data------",data);
                            $scope.loading_list = false;
                            $scope.items = data.data.rows;
                            $scope.totalItems = data.data.totalResults;

                            //get relative area
                            if($scope.relateId){
                                var ids=[];
                                contentService.getVideoArea($scope.relateId,$scope.areaType).then(function(resp){
                                    console.log('video relative area==',resp);

                                    var respRelat = resp.data.rows;
                                    angular.forEach(respRelat,function(o,i){
                                        ids.push(o.id)
                                    });
                                    angular.forEach($scope.items, function(e, v) {

                                        if (ids.indexOf(e.areaId) !== -1) {
                                            $scope.items[v].check = true;
                                            $scope.rItem[e.areaId] = e;
                                        } else {
                                            $scope.items[v].check = false;
                                        }

                                    });
                                    console.log('items==',$scope.items)
                                    //$scope.closeThisDialog(resp);
                                },function(error){
                                    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                                });
                            }
                        });
                    }


                };

                $scope.pageChanged = function(newPage) {
                    $scope.getResultsPage(newPage, $scope.searchParams);
                };
            }

            $scope.getResultsPage($scope.currentPage, $scope.searchParams);
            // 监听
            $scope.$watch('items', function() {
                if(typeof $scope.idOptions == "undefined"){
                    return;
                }

                console.log('$watch $scope.items====',$scope.items);
                angular.forEach($scope.items, function(e, v) {
                    if($scope.ngDialogData.objName == 'apps'){
                        if (typeof(e.appsId) != "undefined" && $scope.idOptions.length > 0 && $scope.idOptions.indexOf(e.appsId) >= 0) {
                            $scope.items[v].check = true;
                            $scope.rItem[e.appsId] = e;

                        } else {
                            $scope.items[v].check = false;
                        }
                    }else{
                        console.log('$scope.idOptions====',$scope.idOptions,e,v);
                        if (typeof(e.id) != "undefined" && $scope.idOptions.length > 0 && $scope.idOptions.indexOf(e.id) >= 0) {
                            $scope.items[v].check = true;

                            $scope.rItem[e.id] = e;


                        } else {
                            $scope.items[v].check = false;
                        }
                    }

                    console.log('$watch $scope.rItem====',$scope.rItem)

                })

            });
            $scope.checkCloseDialog = function(rItem){
                console.log('save rItem',rItem);
                var areaIds = [];
                angular.forEach(rItem,function(a,i){
                    if(a.areaId){
                        areaIds.push(a.areaId)
                    }
                });
                var data = {
                    areaRelationType:$scope.areaType,
                    refId:$scope.relateId,
                    areaIds:areaIds
                };
                console.log('data====',data);
                //return;
                contentService.saveVideoArea(data).then(function(resp){
                    $scope.closeThisDialog(resp);
                    console.log('$scope.areaType====',$scope.areaType);
                    if($scope.areaType==1){
                        contentService.setName('video').getList()
                    }else if($scope.areaType==0){
                        contentService.setName('vod').getList()
                    }


                },function(error){
                    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                });
            }
        }
    ]);

});
