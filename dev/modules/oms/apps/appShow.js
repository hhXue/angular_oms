define([
    'angularAMD',
    'modules/oms/apps/service',
    'Session'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('AppShowCtrl', ['$scope','Session','AppsService','$controller',
        function($scope, Session , AppsService, $controller) {
        var appShowCtrl = $scope.appShowCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        //extend from BaseCtrl
        $controller('BaseCtrl', { $scope: $scope });

        $scope.title = $scope.ngDialogData.title;
        $scope.type = $scope.ngDialogData.type;
        $scope.appKeyId = $scope.ngDialogData.appKeyId;
        $scope.fatherName = $scope.ngDialogData.name;

        console.info('$scope.ngDialogData',$scope.ngDialogData);

        var app = $scope.app = $scope.ngDialogData.item;

        //初始化
        appShowCtrl.init = function() {
            // by type get relation 栏目频道
            if($scope.type == 0){
                //获取对应的栏目
                $scope.newPage = 1;
                AppsService.getAppVod($scope.appKeyId, 1,{videoName:''}).then(function(e) {
                    $scope.loading_list = false;
                    $scope.items = e.data.rows;
                    $scope.totalItems = e.data.totalResults;
                });
            }else{
                //获取对应的频道
                $scope.newPage = 1;
                AppsService.getAppVideo($scope.appKeyId, 1,{videoName:''}).then(function(e) {
                    console.info('e.data', e.data);
                    $scope.loading_list = false;
                    $scope.items = e.data.rows;
                    $scope.totalItems = e.data.totalResults;

                });
            }
        };
        appShowCtrl.init();

        if($scope.type == 0 || $scope.type == 1){
            //search
            appShowCtrl.search = function(){
                $scope.getResultsPage(1, $scope.searchParams);
            };

            $scope.pageChanged = function(newPage) {
                $scope.newPage = newPage;
                $scope.getResultsPage(newPage, $scope.searchParams);
            };
            $scope.getResultsPage = function(pageNumber, params) {
                console.info('pageNumber, params open=====',pageNumber, params);
                $scope.currentPage = pageNumber;
                $scope.items = [];
                $scope.loading_list = true;
                if($scope.type === 0){
                    //获取对应的栏目
                    AppsService.getAppVod($scope.appKeyId, pageNumber, params).then(function(e) {
                        $scope.loading_list = false;
                        $scope.totalItems = e.data.totalResults;
                        $scope.items = e.data.rows;
                    });
                }else{
                    //获取对应的频道 / 栏目 对象数组
                    AppsService.getAppVideo($scope.appKeyId, pageNumber, params).then(function(e) {
                        $scope.loading_list = false;
                        $scope.totalItems = e.data.totalResults;
                        $scope.items = e.data.rows;
                    });
                }

            };

        }

    }]);

});
