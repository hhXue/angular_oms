define([
    'angularAMD',
    'modules/oms/basic/service',
    'Session'
], function(angularAMD, BaseCtrl){
    'use strict';

    angularAMD.controller('TagCtrl', ['$scope', 'BasicsService', 'Session', '$controller','$state',

        function($scope, BasicsService, Session, $controller,$state) {
            $scope.methods = $state.current.data.methods;
            $scope.$state = $state;
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/basic/tagEdit.html',
                    data: {title:"编辑标签"},
                    controller:'TagEditCtrl'
                },
                create: {
                    template: 'modules/oms/basic/tagEdit.html',
                    data: {title:"添加标签",item:{} },/*userId:Session.id*/
                    controller:'TagEditCtrl'
                }
            };

            //extend from BaseCtrl
            $controller('BaseCtrl', { $scope: $scope });

            //set item service
            $scope.itemService = BasicsService.setName('tag');

            //get list page

            if(typeof $scope.methods.index.name != 'undefined' ) {
                $scope.getResultsPage($scope.currentPage);
            }

            $scope.tagTypes = {
                1: '频道标签',
                2: '栏目标签',
                3: '节目标签'
            };

            console.log('$scope.items',$scope.items);
        }
    ]);
});
