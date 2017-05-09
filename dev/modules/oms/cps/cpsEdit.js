define([
   'angularAMD',
   'modules/oms/cps/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('CpsEditCtrl', function($scope, CpsService) {
        var cpsEditCtrl = $scope.cpsEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        var cp = $scope.cp = $scope.ngDialogData.item;

        if (cp.id == null) {
            $scope.ngDialogData.item = {};
        }
        //get all area
        //CpsService.getAllArea().then(function(resp){
        //    console.log('resp===',resp);
        //}, function(error) {
        //    $scope.submitStatus = false;
        //    console.info('checkCloseDialog failed', error);
        //    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
        //});
        ////area all select
        //$scope.toggleAll = function(){
        //    console.log('$scope.selectAll',$scope.selectAll);
        //    if($scope.selectAll){
        //        cp.ids = [];
        //        angular.forEach($scope.areaCp,function(val){
        //            cp.ids.push(val.id);
        //        })
        //    }else{
        //        cp.ids = [];
        //    }
        //    console.log('cp.Id',cp.ids)
        //
        //};
        ////area single select
        //$scope.toggleAreaCheck = function(id){
        //    if(cp.ids.indexOf(id)>-1){
        //        cp.ids.splice(cp.ids.indexOf(id),1);
        //        console.log('cp.ids',cp.ids)
        //
        //    }else{
        //        cp.ids.push(id);
        //        console.log('cp.ids',cp.ids)
        //    }
        //    //console.log('cp.ids',cp.ids)
        //
        //};

        cpsEditCtrl.checkCloseDialog = function() {
            $scope.errorMessage = '';
            $scope.submitted = true;
            if (!CpsService.isEmptyObject($scope.myform)) {
                CpsService.saveItem(cp,$scope).then(function(data) {
                    $scope.closeThisDialog(data);
                    $scope.submitStatus = false;
                }, function(error) {
                    $scope.submitStatus = false;
                    console.info('checkCloseDialog failed', error);
                    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                });
            }
        };
    });

});
