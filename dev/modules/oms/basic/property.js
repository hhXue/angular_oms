define([
    'angularAMD',
    'modules/oms/basic/service',
    'Session'
    ], function(angularAMD, BaseCtrl){
        'use strict';

        angularAMD.controller('PropertyCtrl', ['$scope', 'BasicsService', 'Session', '$controller', '$state', 'ngDialog',
            function($scope, BasicsService, Session, $controller, $state, ngDialog) {
                //permission control fixed to methods
                $scope.methods = $state.current.data.methods;

                $scope.dataConfig = {
                    edit: {
                        template: 'modules/oms/basic/propertyEdit.html',
                        data: {title:"编辑属性"},
                        controller:'PropertyEditCtrl'
                    },
                    create: {
                        template: 'modules/oms/basic/propertyEdit.html',
                        data: {title:"添加属性",item:{ userId:Session.id } },
                        controller:'PropertyEditCtrl'
                    }
                };

                //extend from BaseCtrl
                $controller('BaseCtrl', { $scope: $scope });

                //set item service
                $scope.itemService = BasicsService.setName('property');


                //get list page

                if(typeof $scope.methods.index.name != 'undefined' ){

                    $scope.getResultsPage($scope.currentPage);
                }



                // console.log('$scope.items',$scope.items);
            }
    ]);
});
