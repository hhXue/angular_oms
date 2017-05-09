define([
    'angularAMD',
    'modules/oms/content/epgService',
    'Session'
], function(angularAMD){
    'use strict';
    angularAMD.controller('EpgCtrl', ['$scope', 'EpgService', 'Session', '$controller','$stateParams', 'APP_CONFIG','$state',
        function($scope, EpgService, Session, $controller, $stateParams, config,$state){
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/content/epgEdit.html',
                    data: {title:"编辑EPG" },
                    controller:'EpgEditCtrl'
                },
                create: {
                    template: 'modules/oms/content/epgEdit.html',
                    data: {title:"新增EPG",is_create:true,item:{} },
                    controller:'EpgEditCtrl'
                }
            };
            console.log("$stateParams",$stateParams);
            //extend from BaseCtrl
            $controller('BaseCtrl', { $scope: $scope });
            //set item service
            $scope.itemService = EpgService.setName('video').setHttpBaseUrl(config.epgBaseUrl);
            //get list page
            $scope.methods = $state.current.data.methods;
            $scope.$state = $state;
            if (typeof $scope.methods.index.name != 'undefined') {

                $scope.getResultsPage($scope.currentPage);
            }


            //$scope.typeSource = ["手工上传","tvsou"];
            //typeSource
            $scope.typeSource = {
                1:'tvsou',
                2:'手工上传',
                3:'CIBN'
            };
        }
    ]);

});
