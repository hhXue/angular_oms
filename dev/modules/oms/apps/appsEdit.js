define([
    'angularAMD',
    'modules/oms/apps/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('AppsEditCtrl', function($scope, AppsService, $stateParams) {
        var appsEditCtrl = $scope.appsEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';

        $scope.title = $scope.ngDialogData.title;
        var app = $scope.app = $scope.ngDialogData.item;
        $scope.appALists = [];
        $scope.appILists = [];
        console.log('$scope.ngDialogData.item',$scope.ngDialogData);


        $scope.phoneStatus = [{
            name: "IOS"
        }, {
            name: "Android"
        }];

        //获取当前应用下所有版本
        AppsService.getApp_version( {appsAppId:$scope.ngDialogData.appsAppId,isAll:1}).then(function(resp){

            var list = resp.data.rows;
            list.map(function( li ){

                if( li.appsAppOs == $scope.phoneStatus[1].name){
                    $scope.appALists.push(li);
                }else{
                    $scope.appILists.push(li);
                }
            })
        });

        if (typeof $scope.app == "undefined" || $scope.app.id == null) {
            $scope.app = {};
            $scope.app.appsAppOs = $scope.phoneStatus[0];
            $scope.appLists = $scope.appILists
        } else {

            if ($scope.app.appsAppOs == "IOS") {
                $scope.app.appsAppOs = $scope.phoneStatus[0];

            } else {
                $scope.app.appsAppOs = $scope.phoneStatus[1];

            }
        }

        $scope.app.appsAppId = $scope.ngDialogData.appsAppId;

        //获取对应操作系统下 关联的同步版本
        appsEditCtrl.changeAppOs = function(appOs){
            if( appOs == $scope.phoneStatus[0]){
                $scope.appLists = $scope.appILists
            }else{
                $scope.appLists = $scope.appALists
            }

        };
        //save
        appsEditCtrl.checkCloseDialog = function() {
            $scope.errorMessage = '';
            submitted = true;

            var saveApp = angular.copy($scope.app);
            if(saveApp.cloneAId){
                saveApp.cloneAId = saveApp.cloneAId.id;
            }
            saveApp.appsAppOs = $scope.app.appsAppOs.name;
            console.log('saveApp===',saveApp)

            AppsService.saveItem(saveApp, $scope).then(function(data) {
                $scope.submitStatus = false;
                $scope.closeThisDialog(data);
            }, function(error) {
                $scope.submitStatus = false;
                $scope.errorMessage = error;
            });
        };



    });

});
