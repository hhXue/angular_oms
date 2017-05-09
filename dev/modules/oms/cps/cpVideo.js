define([
    'angularAMD',
    'modules/oms/cps/service',
    'Session'
], function(angularAMD) {
    'use strict';
    angularAMD.controller('CpsVideoCtrl', ['$scope', 'CpsService', 'Session', '$controller', '$state', 'ngDialog','$stateParams',
        function($scope, CpsService, Session, $controller, $state, ngDialog,$stateParams) {

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //set data config
            $scope.dataConfig = {
                create: {
                    template: 'modules/oms/cps/cpVideoEdit.html',
                    data: {
                        title: "新增CP频道",
                        item: {}
                    },
                    controller: 'CpsVideoEditCtrl'
                }
            };
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });
            //set item service
            $scope.itemService = CpsService.setName('cpVideo');
            console.log("$stateParams",$stateParams);
            $scope.searchParams.cpId = $stateParams.cpId;
            //存路由
            $scope.route();

            //get list page

            if (typeof $scope.methods.index.name != 'undefined') {

                $scope.getResultsPage($scope.currentPage,$scope.searchParams);
            }
            //order
            $scope.itemCtrl.ordersNum = function(){
                var list = [];
                var eles = document.getElementsByClassName("sortInput");//angular.element(".sortInput")

                angular.forEach(eles,function(ele){

                    list.push({

                        "cpVideoId":ele.getAttribute("data-id"),
                        "cpVideoSort":ele.value

                    })
                });

                $scope.itemService.saveOrder("cpVideoSort",list).then(function(){
                    $scope.getResultsPage($scope.currentPage,$scope.searchParams);
                })
            };

            //$scope.deleteAll = function() {
            //    console.log($scope.ids);
            //    $scope.itemCtrl.deleteItem($scope.ids);
            //}
        }
    ]);

});
