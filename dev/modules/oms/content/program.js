define([
    'angularAMD',
    'modules/oms/content/epgService',
    'Session'
], function(angularAMD){
    'use strict';
    angularAMD.controller('ProgramCtrl', ['$scope', 'EpgService', 'Session', '$controller', 'APP_CONFIG', '$stateParams','$state',
        function($scope, EpgService, Session, $controller, config, $stateParams,$state){
            console.log("$stateParams",$stateParams);
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/content/programEdit.html',
                    data: {title:"编辑节目"},
                    controller:'ProgramEditCtrl'
                },
                create: {
                    template: 'modules/oms/content/programEdit.html',
                    data: {title:"新增节目单",item:{} ,isCreate:true},
                    controller:'ProgramEditCtrl'
                }
            };

            //extend from BaseCtrl
            $controller('BaseCtrl', { $scope: $scope });

            //set item service
            $scope.itemService = EpgService.setName('epg').setHttpBaseUrl(config.epgBaseUrl);

            $scope.searchParams.videoId = $stateParams.videoId;
            console.log('$scope.searchParams',$scope.searchParams)
            //get list page
            $scope.methods = $state.current.data.methods;
            if(typeof $scope.methods.index.name != 'undefined' ){

                $scope.getResultsPage($scope.currentPage, $scope.searchParams);

            }

            //toggle select all the checkboxes
            $scope.ids = [];
            $scope.selectAll = false;

            //$scope.startTime = new Date();

            $scope.itemCtrl.search = function (){

                //  $scope.searchParams.time == 2015：05：02  view层
                $scope.searchParams.startTime = angular.copy($scope.searchParams.time);
                //  $scope.searchParams.startTime == 1492365400000  model层

                $scope.searchParams.startTime =  Math.floor(Date.parse( $scope.searchParams.startTime)/1000);

                $scope.getResultsPage(1, $scope.searchParams);

            };

            $scope.route();
        }
    ]);

});
