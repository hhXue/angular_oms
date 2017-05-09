define([
    'angularAMD',
    'modules/oms/apps/service'
], function(angularAMD){
    'use strict';

    angularAMD.controller('AppsForceUpdateCtrl', function($scope, AppsService){
        var appsForceUpdateCtrl = $scope.appsForceUpdateCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        console.log('$scope.ngDialogData',$scope.ngDialogData)
        var app = $scope.app = $scope.ngDialogData.app;
        $scope.showFeedback = [];
        app.marketIds = [];
        $scope.showAll = false;
        $scope.showMarkets = [];
        //$scope.isWatch = false; //是否监控$scope.marketApp

        console.log('app',app);


        app.datas = [];  //保存所有升级信息
        var newValues;



        $scope.roles = [];

        //保存当前应用下的升级信息
        $scope.marketApp = [{
            id:'',
            appMarketId: '',
            appsUpdateStatus:'1',
            appsTargetVersion:'',
            appsAppSource:'',
            appsUpdateMessage:''
        }];


        //get app.appsTargetVersion
        AppsService.getRoleList({appsAppOs:app.appsAppOs,appsAppId:app.appsAppId}).then(function(data){
            $scope.submitStatus = false;
            $scope.roles = data.data.rows;

            getMarketAppElement($scope.roles);



        },function(error){
            $scope.submitStatus = false;
        });

        function getMarketAppElement(roles){
            if(roles.length > 0 && app.appsTargetVersion==''){

                $scope.marketApp[0].appsTargetVersion = angular.copy(roles[0]['appsAppVersion']);

            }else{
                $scope.marketApp[0].appsTargetVersion = angular.copy(app.appsTargetVersion)
            }
        }

        //获取应用列表
        AppsService.getMarketList({isAll:1}).then(function(resp){
            console.log("resp===",resp);
            $scope.marketList = resp.data.rows;
            angular.forEach(app.marketLists,function(obj) {
                $scope.showFeedback.push(obj);
            })
        },function(error){
            console.log('get market error',error);
        });

        //监控$scope.marketApp
        //if($scope.isWatch){
            $scope.$watch('marketApp',function(newValue,oldValue){
                console.log('oldValue==',newValue,oldValue,$scope.marketCurrent)
                newValues = $scope.newValues = newValue[0];
                if($scope.marketCurrent && $scope.showMarkets.indexOf($scope.marketCurrent.marketId) == -1 && newValue[0].appsUpdateStatus !== '1' && $scope.marketCurrent.marketId !=='0'){
                    $scope.showMarkets.push($scope.marketCurrent.marketId);
                }
                if($scope.marketCurrent && $scope.showMarkets.indexOf($scope.marketCurrent.marketId) !== -1 && newValue[0].appsUpdateStatus == '1' && $scope.marketCurrent.marketId !=='0'){
                    $scope.showMarkets.splice($scope.showMarkets.indexOf($scope.marketCurrent.marketId),1);
                }
                if( $scope.marketCurrent){
                    $scope.npmMarketIds = [];
                    angular.forEach(app.datas,function(obj) {
                        $scope.npmMarketIds.push(obj.upgradeMarketId);
                        if($scope.marketCurrent.marketId == obj.upgradeMarketId){
                            app.datas[app.datas.indexOf(obj)] = {
                                "upgradeAppverId": app.id, //版本id
                                "upgradeMarketId": $scope.marketCurrent.marketId, //市场id
                                "upgradeStatus": newValues.appsUpdateStatus, //下载状态 对于新版本的升级控制 1不升级，2检测升级，3弹框升级，4强制升级
                                "upgradeTargetVersion": newValues.appsTargetVersion, //升级的版本号
                                "upgradeAppSource": newValues.appsAppSource, //安装包下载地址
                                "upgradeMessage": newValues.appsUpdateMessage //升级内容
                            };
                        }

                    });

                    if($scope.npmMarketIds.indexOf($scope.marketCurrent.marketId) == -1 && newValue[0].appsUpdateStatus!=='1'){

                        app.datas.push({
                            "upgradeAppverId": app.id, //版本id
                            "upgradeMarketId": $scope.marketCurrent.marketId, //市场id
                            "upgradeStatus": newValues.appsUpdateStatus, //下载状态 对于新版本的升级控制 1不升级，2检测升级，3弹框升级，4强制升级
                            "upgradeTargetVersion": newValues.appsTargetVersion, //升级的版本号
                            "upgradeAppSource": newValues.appsAppSource, //安装包下载地址
                            "upgradeMessage": newValues.appsUpdateMessage //升级内容
                        });
                    }


                    console.log('marketapp===',$scope.marketApp);
                }

            },true);

        //}

        //获取升级管理信息
        AppsService.getUpdateGrades( app.id ).then(function(resp){
            console.log("resp===",resp);
            $scope.updateGrades = resp.data.rows;
            $scope.showMarkets = [];

            angular.forEach($scope.updateGrades,function(obj,i) {
                if(typeof obj.upgradeStatus == 'number'){
                    obj.upgradeStatus = obj.upgradeStatus.toString();
                }
                app.datas.push({
                    "upgradeAppverId": app.id, //版本id
                    "upgradeMarketId": obj.upgradeMarketId, //市场id
                    "upgradeStatus": obj.upgradeStatus, //下载状态 对于新版本的升级控制 1不升级，2检测升级，3弹框升级，4强制升级
                    "upgradeTargetVersion": obj.upgradeTargetVersion, //升级的版本号
                    "upgradeAppSource": obj.upgradeAppSource, //安装包下载地址
                    "upgradeMessage": obj.upgradeMessage //升级内容
                });
                if(obj.upgradeMarketId === '0'){
                    $scope.showAll = true;
                    $('.mars').addClass('btn-warning');
                    //if(obj.upgradeMarketId === '0' ){
                    console.log('obj.upgradeTargetVersion=======',obj.upgradeTargetVersion)
                    $scope.marketApp = [{
                        id:obj.upgradeAppverId,
                        appMarketId: obj.upgradeMarketId,
                        appsUpdateStatus:obj.upgradeStatus,
                        appsTargetVersion:obj.upgradeTargetVersion,
                        appsAppSource:obj.upgradeAppSource,
                        appsUpdateMessage:obj.upgradeMessage
                    }];
                    //}
                }
                console.log('marketApp222==',$scope.marketApp);
                $scope.showMarkets.push(obj.upgradeMarketId);

            });
            console.log('get app datas==',app.datas,$scope.marketApp,$scope.showMarkets);
        },function(error){
            console.log('get market error',error);
        });

        //点击当前应用
        appsForceUpdateCtrl.currentMarket = function(market,index,event){
            //app.marketIds.push( market.marketId );
            //$scope.isWatch = true;
            //点击模块背景显示
            $scope.marketCurrent = market;
            console.log('market index==',market,index,newValues );
            if($('.mar').hasClass('btn-warning')){
                $('.mar').removeClass('btn-warning');
            }
            $scope.marketApp = [{
                id:'',
                appMarketId: '',
                appsUpdateStatus:'1',
                appsTargetVersion:'',
                appsAppSource:'',
                appsUpdateMessage:''
            }];
            getMarketAppElement($scope.roles);
            event.target.className = event.target.className + ' '+'btn-warning';
            //if($scope.showMarkets.indexOf(market.marketId) == -1 && newValues.appsUpdateStatus !== '1' && newValues.appMarketId !=='0'){
            //    $scope.showMarkets.push(market.marketId);
            //}

            console.log('$scope.showMarkets==',$scope.showMarkets);
            angular.forEach(app.datas,function(obj) {
                if(market.marketId == obj.upgradeMarketId){
                    $scope.marketApp = [{
                        id:obj.upgradeAppverId,
                        appMarketId: obj.upgradeMarketId,
                        appsUpdateStatus:obj.upgradeStatus,
                        appsTargetVersion:obj.upgradeTargetVersion,
                        appsAppSource:obj.upgradeAppSource,
                        appsUpdateMessage:obj.upgradeMessage
                    }];
                }
                if('0' == obj.upgradeMarketId){
                    app.datas = [];
                    console.log('datas==',app.datas)
                }
            });


            console.log('$scope.marketApp==',$scope.marketApp ,app.datas)
        };


        appsForceUpdateCtrl.allMarket = function(event){
            //$scope.isWatch = true;
            $scope.showAll == true ? $scope.showAll = false :$scope.showAll = true ;
            $scope.showAll == true ? event.target.className = event.target.className + ' '+'btn-warning' : $('.mars').removeClass('btn-warning');
            if($scope.showAll ){
                $('.mar').removeClass('btn-warning');
            }
            //获取到的“全部”升级信息
            $scope.showMarkets = [];
            angular.forEach($scope.updateGrades,function(obj) {
                $scope.showMarkets.push(obj.upgradeMarketId);
                if('0' == obj.upgradeMarketId){
                    $scope.marketApp = [{
                        id:obj.upgradeAppverId,
                        appMarketId: obj.upgradeMarketId,
                        appsUpdateStatus:obj.upgradeStatus,
                        appsTargetVersion:obj.upgradeTargetVersion,
                        appsAppSource:obj.upgradeAppSource,
                        appsUpdateMessage:obj.upgradeMessage
                    }];
                }
            });
            if($scope.showMarkets.indexOf('0') == -1){
                $scope.marketApp = [{
                    id:app.id,
                    appMarketId: '0',
                    appsUpdateStatus:'1',
                    appsTargetVersion:'',
                    appsAppSource:'',
                    appsUpdateMessage:''
                }];
                getMarketAppElement($scope.roles);
            }

        };

        appsForceUpdateCtrl.checkCloseDialog = function(){
            $scope.errorMessage = '';
            submitted = true;

            console.log('app.id',app.id,$scope.marketApp[0].appsUpdateStatus);

            if($scope.showAll && $scope.marketApp[0].appsUpdateStatus!==1){
                var marketApp = $scope.marketApp[0];
                app.datas = [];
                app.datas = [{
                    "upgradeAppverId": app.id, //版本id
                    "upgradeMarketId": '0', //市场id
                    "upgradeStatus": marketApp.appsUpdateStatus, //下载状态 对于新版本的升级控制 1不升级，2检测升级，3弹框升级，4强制升级
                    "upgradeTargetVersion": marketApp.appsTargetVersion, //升级的版本号
                    "upgradeAppSource": marketApp.appsAppSource, //安装包下载地址
                    "upgradeMessage": marketApp.appsUpdateMessage //升级内容
                }];
            }
            angular.forEach(app.datas,function(data,i){

                if(typeof data.upgradeStatus == 'number'){
                    data.upgradeStatus = data.upgradeStatus.toString();
                }
                console.log('typeof ===',typeof data.upgradeStatus)
            });


            console.log('app.datas',app.datas);
            //return;
            AppsService.saveUpGrades({appverId:app.id,data:app.datas}, $scope).then(function(data){
                $scope.submitStatus = false;
                $scope.closeThisDialog(data);
            },function(error){
                // error handle
                $scope.submitStatus = false;
                console.info('checkCloseDialog failed',error);
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
            });
        };


    });

});
