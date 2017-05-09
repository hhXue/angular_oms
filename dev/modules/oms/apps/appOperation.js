define([
    'angularAMD',
    'modules/oms/apps/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('appOperationCtrl', function($scope, AppsService, $controller) {
        var appOperationCtrl = $scope.appOperationCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';

        $scope.title = $scope.ngDialogData.title;
        $scope.type = $scope.ngDialogData.type;
        var categoryName = $scope.categoryName = $scope.ngDialogData.name;

        //extend from BaseCtrl
        $controller('BaseCtrl', {
            $scope: $scope
        });
        console.log('$scope.ngDialogData',$scope.ngDialogData);

        var app = $scope.app = $scope.ngDialogData.item;


        $scope.ids = [];/*保存最终关联的数据*/
        $scope.is_ids = [];/*存取已关联的数据*/
        $scope.no_ids = [];/*存取未关联的数据*/
        $scope.selectAll_is = false;/*初始化已关联全选框*/
        $scope.selectAll_no = false;/*初始化未关联全选框*/


        appOperationCtrl.init = function(){
            $scope.items = [];
            $scope.ids = [];

            $scope.loading_list = true;

            $scope.searchParams.isAll = 1;

            //获取所有的频道，栏目，模块列表
            AppsService.getVideoList($scope.searchParams, $scope.type).then(function(e) {
                $scope.items = e.data.rows;

                $scope.totalItems = e.data.totalResults;

                //分类获取频道
                if(categoryName && categoryName == 'category'){
                    AppsService.getCategoryRelation($scope.ngDialogData.appId, $scope.type).then(function(e) {
                        $scope.loading_list = false;
                        angular.forEach(e.data.rows, function(obj) {
                            $scope.ids.push(obj.refId);
                        });
                        if($scope.ids.length==0){
                            $scope.isRelative = 0
                        }
                        isRelation($scope.type);
                    });
                }else{
                    //获取版本关联的频道 / 栏目 / 模块
                    AppsService.getRelation($scope.ngDialogData.appId, $scope.type).then(function(e) {
                        $scope.loading_list = false;
                        angular.forEach(e.data.rows, function(obj) {
                            $scope.ids.push(obj.refId);
                        });
                        if($scope.ids.length==0){
                            $scope.isRelative = 0
                        }
                        isRelation($scope.type);
                    });
                }

            });
        };


        //tab切换, isRalative=1已关联；0未关联
        $scope.isRelative = 1;
        appOperationCtrl.changeRelation = function(i){

            $scope.isRelative = i;

        };

        //全选
        appOperationCtrl.toggleAll = function(type,obj) {
            console.log('$scope.items===',type,$scope.selectAll_is,obj,obj.selectAll_is);
            //全选已关联
            if(type == 1){
                if (obj.selectAll_is) {
                    $scope.is_ids = [];
                    if($scope.type==2){ //模块
                        angular.forEach($scope.items, function(obj) {
                            $scope.is_ids.push(obj.tabletId);
                        })
                    }else{   //频道，栏目
                        angular.forEach($scope.items, function(obj) {
                            $scope.is_ids.push(obj.videoId);
                        })
                    }

                } else {
                    $scope.is_ids = [];
                }
                console.log('is_ids===',$scope.is_ids);
            }
            //全选未关联
            else{
                if (obj.selectAll_no) {
                    $scope.no_ids = [];
                    if($scope.type==2) { //模块
                        angular.forEach($scope.items, function(obj) {
                            if($scope.ids.indexOf(obj.tabletId) == -1){
                                $scope.no_ids.push(obj.tabletId);
                            }
                        })
                    }else{         //频道，栏目
                        angular.forEach($scope.items, function(obj) {
                            if($scope.ids.indexOf(obj.videoId) == -1){
                                $scope.no_ids.push(obj.videoId);
                            }

                        })
                    }

                } else {
                    $scope.no_ids = [];
                }
            }

        };

        //单选一个
        appOperationCtrl.toggleSelection = function(vid, type) {
            //单选已关联
            if(type == 1){
                if ($scope.is_ids.indexOf(vid) >= 0) {
                    $scope.is_ids.splice($scope.is_ids.indexOf(vid), 1);
                } else {
                    $scope.is_ids.push(vid);
                }
            }
            //单选未关联
            else if(type == 0){
                if ($scope.no_ids.indexOf(vid) >= 0) {
                    $scope.no_ids.splice($scope.no_ids.indexOf(vid), 1);
                } else {
                    $scope.no_ids.push(vid);
                }
                console.log('$scope.no_ids==',$scope.no_ids);
            }
        };

        //获取对应的频道 / 栏目 /模块 的对象数组
        function isRelation(type){
            $scope.norelativeObj = [];
            $scope.relativeObj = [];

            if(type==0 || type==1){
                angular.forEach($scope.items, function(obj) {
                    console.log('obj test===',$scope.ids);

                    if($scope.ids.indexOf(obj.videoId) == -1){
                        $scope.norelativeObj.push({
                            videoId:obj.videoId,
                            videoName:obj.videoName,
                            videoCategory:obj.videoCategory
                        });
                    }else{
                        $scope.relativeObj.push({
                            videoId:obj.videoId,
                            videoName:obj.videoName,
                            videoCategory:obj.videoCategory
                        });
                    }

                });


            }else{
                angular.forEach($scope.items, function(obj) {

                    if($scope.ids.indexOf(obj.tabletId)==-1){
                        $scope.norelativeObj.push({
                            tabletId:obj.tabletId,
                            tabletName:obj.tabletName,
                            apiName:obj.apiName,
                            tabletType:obj.tabletType
                        })
                    }else{
                        $scope.relativeObj.push({
                            tabletId:obj.tabletId,
                            tabletName:obj.tabletName,
                            apiName:obj.apiName,
                            tabletType:obj.tabletType
                        })
                    }
                });
            }


        }


        //search
        appOperationCtrl.search = function(){
            console.log('$scope.searchParams',$scope.searchParams);
            appOperationCtrl.init();

        };

        //保存函数
        function saveRelation(status){
            if($scope.no_ids.length > 0 && status == 0){
                $scope.ids = $scope.ids.concat($scope.no_ids);
            }
            if($scope.is_ids.length > 0 && status == 1 ){
                for(var i = 0; i < $scope.is_ids.length; i++){
                    $scope.ids.splice($scope.ids.indexOf($scope.is_ids[i]),1);
                }

            }

            var item;
            if ($scope.type == 1 && !categoryName ) {
                item = {
                    appId: $scope.ngDialogData.appId,
                    refId: $scope.ids,
                    isApp: 1
                };
            } else if($scope.type == 1 && categoryName == 'category'){
                item = {
                    categoryId: $scope.ngDialogData.appId,
                    refId: $scope.ids,
                    type:2
                };
            }else if($scope.type == 0){
                item = {
                    appId: $scope.ngDialogData.appId,
                    refId: $scope.ids,
                    appRelationType:  $scope.type
                };
            }else if($scope.type == 2){
                item = {
                    appId: $scope.ngDialogData.appId,
                    refId: $scope.ids,
                    appRelationType:  22
                }
            }

            $scope.submitStatus = true;
            console.log('save item===',item);
            //return;
            AppsService.saveRelation(item).then(function() {

                $scope.closeThisDialog();
                //$scope.getResultsPage(1, $scope.searchParams);
            }, function(error) {
                $scope.submitStatus = false;
                $scope.errorMessage = error;
            });

        }

        //get all area
        AppsService.getAllArea().then(function(resp){
            console.log('resp area===',resp);
            $scope.areaList = resp.data.rows;
        },function(){

        });

        //保存
        appOperationCtrl.checkCloseDialog = function(status) {
            saveRelation(status);
        };

        //初始化
        appOperationCtrl.init();

    });

});
