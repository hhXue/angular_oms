define([
    'angularAMD',
    'modules/oms/cps/service',
    'Session'
], function(angularAMD, BaseCtrl) {
    'use strict';
    angularAMD.controller('CpsCtrl', ['$scope', 'CpsService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, CpsService, Session, $controller, $state, ngDialog) {


            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;


            //用来判断是否拥有跳转权限
            //$state.get('site.oms.cps.cpvideo')
            //有权限返回state对象，没有返回null
            $scope.$state = $state;
            console.info('$state.',$state.get('site.oms.cps.cpvideo'));

            //set data config
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/cps/cpsEdit.html',
                    data: {
                        title: "编辑CP"
                    },
                    controller: 'CpsEditCtrl'
                },
                create: {
                    template: 'modules/oms/cps/cpsEdit.html',
                    data: {
                        title: "新增CP",
                        item: {}
                    },
                    controller: 'CpsEditCtrl'
                },
                area: {
                template: 'modules/oms/content/channelOption.html',
                    data: {
                    title: "所属地域",
                        objName:'area',
                        type: 5
                },
                controller: 'changeCtrl'
            }
            };
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });
            $scope.searchParams.isAll = 1;

            //获取地域数据

            CpsService.getAllArea().then(function(resp){
                console.log('resp area===',resp)
                $scope.areaList = resp.data.rows;
            },function(){

            });

            //get list page

           if (typeof $scope.methods.index.name != 'undefined') {
               //set item service
               $scope.itemService = CpsService.setName('cps');
                $scope.getResultsPage($scope.currentPage,$scope.searchParams);
           }

            $scope.itemCtrl.ordersNum = function(){
                var els = document.getElementsByClassName('sortInput');//angular.element('.sortInput');
                var list = [];
                console.info('els',els);

                angular.forEach(els,function(el,idx){
                    list.push({
                        'cpId': el.getAttribute('data-id'),
                        'sortNum': el.value
                    });
                });
                console.info("list",list);

                $scope.itemService.saveOrder('cpSort',list).then(function(data){
                    $scope.getResultsPage($scope.currentPage);
                },function(error){
                    $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
                });
            }
        }
    ]);

});
