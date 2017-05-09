define([
    'angularAMD',
    'modules/oms/client/service',
], function(angularAMD) {
    'use strict';

    angularAMD.controller('TmpapiEditCtrl', function($scope, clientService) {
        var tmpapiEditCtrl = $scope.tmpapiEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        var tmpapi = $scope.tmpapi = $scope.ngDialogData.item;
        var refId = $scope.ngDialogData.item.id;

        $scope.app = $scope.tmpapi;

        if (tmpapi.id == null) {
            $scope.ngDialogData.item = {};
        }
        $scope.apiReturns = [{
            key:"",
            value:""
        }];
        //增加api
        tmpapiEditCtrl.addApi = function(){
            var keyVal = {
                key:"",
                value:""
            };
            $scope.apiReturns.push(keyVal);
        };
        //删除api
        tmpapiEditCtrl.remove = function(index){
            console.log('$scope.apiReturns',$scope.apiReturns);
            $scope.apiReturns.splice(index,1)
        };
        tmpapi.customValue = $scope.apiReturns;
        //新增、编辑时获取版本列表
        clientService.getTmpVersion().then(function(resp){
            $scope.tmpVersion = resp.data.rows;

            if($scope.title!='新增API')
                getLists();

            },function(error){
                console.log('error',error);
            });
        //编辑时获取返回值数据
        if(!angular.isUndefined(refId)){
            clientService.getValue(refId).then(function(e){
                console.log("return's e.data", e.data);
                //if(typeof e.data.customValue=='string'&&$scope.title=='编辑API'){
                    var customV = angular.copy(e.data.customValue);

                    for(var i in customV){

                        $scope.apiReturns.push(customV[i]);
                    }
                    for(var j in $scope.apiReturns){

                        if($scope.apiReturns[j].key==''&&$scope.apiReturns[j].value=='')
                            $scope.apiReturns.splice($scope.apiReturns[j],1);
                    }
                    console.log('$scope.apiReturns',$scope.apiReturns)
                //}

            },function(error){
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
            })
        }

        //编辑时获取版本数据
        function getLists(){
            $scope.versionAppList = [];
            $scope.itemService = clientService.setName('appRelation');
            console.log('tmpapi',tmpapi)
            $scope.itemService.getAppsByVersionId(refId).then(function(resp){
                $scope.versionAppList = resp.data.rows;

                //console.log('versionAppList',$scope.versionAppList,$scope.tmpVersion);
                _.map($scope.tmpVersion, function(item){

                    if(_.find($scope.versionAppList,{'appId': item.appsId})){
                        //console.log('ttt',item.appsId);
                        $scope.toggleCheck(item.appsId);
                    }
                });
                if($scope.tmpVersion.length == $scope.versionAppList.length){
                    $scope.selectAll = true;
                }
                clientService.setName('customApi');
            },function(error){
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
            });
        }
        //保存
        tmpapiEditCtrl.checkCloseDialog = function() {

            $scope.errorMessage = '';
            $scope.submitted = true;

            if (!clientService.isEmptyObject($scope.myform)) {
                console.log("tmpapi",tmpapi,$scope.apiReturns);
                //return;
                //if(typeof $scope.apiReturns == 'object'&&$scope.title=='编辑API'){
                //    var apireturn = angular.copy($scope.apiReturns);
                //    tmpapi.customValue = angular.copy(apireturn);
                //}
                console.log('$scope.apiReturns',tmpapi);

                clientService.saveItem(tmpapi, $scope).then(function (data) {

                    $scope.submitStatus = false;
                    $scope.closeThisDialog(data);

                }, function (error) {
                    $scope.submitStatus = false;
                    $scope.errorMessage = error;
                });
            }
        };
        //版本列表checkbox功能模块
        if (angular.isUndefined(tmpapi.appId)) {
            tmpapi.appId =  [];
        }
        $scope.selectAll = false;
        $scope.toggleCheck = function(id) {
            if (tmpapi.appId.indexOf(id) > -1) {
                console.log(tmpapi.appId.indexOf(id));
                tmpapi.appId.splice(tmpapi.appId.indexOf(id), 1);
            } else {
                tmpapi.appId.push(id);
            }
            console.log('tmpapi.appId', tmpapi.appId);
        };

        $scope.toggleAll = function(){

            if($scope.selectAll){
                console.log("$scope.selectAll",$scope.selectAll);
                tmpapi.appId = [];
                angular.forEach($scope.tmpVersion,function(val){
                    tmpapi.appId.push(val.appsId);

                });
            }else{
                console.log("$scope.selectAll",$scope.selectAll);
                tmpapi.appId = []
            }
        };



    });

});
