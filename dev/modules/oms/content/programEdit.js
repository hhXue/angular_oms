define([
    'angularAMD',
    'modules/oms/content/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('ProgramEditCtrl', function($scope, EpgService, $stateParams) {

        var programEditCtrl = $scope.programEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        var program = $scope.program = $scope.ngDialogData.item;
        program.videoId = $stateParams.videoId;
        var isCreate = $scope.ngDialogData.isCreate;

        console.log("$scope.program.startTime",$scope.program.startTime,parseInt($scope.program.startTime) * 1000);
        if (isCreate) {
            $scope.program.startTime = new Date();
        } else {
            $scope.program.startTime = new Date(parseInt($scope.program.startTime) * 1000);
        }
        console.log("$scope.program.startTime22222",$scope.program.startTime);
        programEditCtrl.checkCloseDialog = function() {
            $scope.errorMessage = '';
            $scope.submitted = true;
            //console.info('starTime',program.starTime);
            console.log("program.startTime", $scope.program.startTime);

            var data = angular.copy(program);
            data.startTime = Math.floor(Date.parse(program.startTime) / 1000);


            //data.startTime = parseInt($scope.program.startTime) / 1000;
            console.log("data.startTime,isCreate",data.startTime);


            EpgService.saveItem(data,$scope).then(function(data) {
                console.log("data", data);
                if(isCreate == true){
                    $scope.ngDialogData.item.programName = '';
                }

                $scope.closeThisDialog(data);
                $scope.submitStatus = false;
            }, function(error) {
                console.info('checkCloseDialog failed', error);
                $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                $scope.submitStatus = false;
            });

        };
    });

});
