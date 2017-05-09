define([
    'angularAMD',
    'lodash',
    'modules/oms/client/service'
], function(angularAMD, _) {
    'use strict';
    angularAMD.controller('VersionCtrl', ['$scope', 'clientService', 'Session', '$controller', '$state', 'ngDialog',
        function ($scope, clientService, Session, $controller, $state, ngDialog) {
            //permission control fixed to methods
           // var versionCtrl = $scope.versionCtrl = {};
            var submitted = false;
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            //var charge = $scope.charge = $scope.ngDialogData.item;
            $scope.title = $scope.ngDialogData.title;
            var id = $scope.id = $scope.ngDialogData.id;
            //$scope.searchParams.isAll = 1;
            console.log('$scope.title',$scope.title);
            //$scope.searchParams.appRelationType = 6;
            if($scope.title=='版本列表'){
                clientService.showVeision(id)
                    .then(function(resp){
                        $scope.items = resp.data.rows;
                        console.log("items",$scope.items);
                    },function(error){
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    });
            }
            if($scope.title=='模块版本列表'){
                clientService.showTabVeision(id)
                    .then(function(resp){
                        $scope.items = resp.data.rows;
                        console.log("items",$scope.items);
                    },function(error){
                        $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                    });
            }



        }])
});
