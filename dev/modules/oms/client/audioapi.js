define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD, BaseCtrl) {
    'use strict';

    angularAMD.controller('AudioapiCtrl', ['$scope', 'clientService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, clientService, Session, $controller, $state, ngDialog) {


            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            var audioapiCtrl = $scope.audioapiCtrl ={};
            $scope.typeStatus = {
                0:"不显示",
                1:"显示"
            };

            //切换显示、不显示
            audioapiCtrl.update = function(item,status){
                clientService.updateStatus({
                    id:item.id,
                    status:status,
                    sort:item.sort
                },$scope).then(function(resp){
                    item.status = resp.data.status;
                    $scope.getResultsPage($scope.currentPage);
                    console.log('resp.data.rows',resp.data)
                },function(error){
                    console.log("error",error);
                })
            };
            //排序
            audioapiCtrl.ordersNum = function(){
                var eles = document.getElementsByClassName('sortInput');//angular.element(".sortInput");
                var list = [];
                angular.forEach(eles,function(ele,i){
                    list.push({
                        radioId:ele.getAttribute("data-id"),
                        sort:ele.value
                    })

                });
                $scope.itemService.saveOrder(list,$scope).then(function(resp){
                    $scope.getResultsPage($scope.currentPage); //?
                    console.log("resp.data.rows",resp.data.rows);//?
                    //$scope.resp.data.rows;
                },function(error){
                    $scope.errorMessage = code + error.data.code + error.data.message;
                })
            }


            //用来判断是否拥有跳转权限
            //$state.get('site.oms.cps.cpvideo')
            //有权限返回state对象，没有返回null
            //$scope.$state = $state;

            //set data config
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });
            //set item service
            $scope.itemService = clientService.setName('radio');
            //$scope.searchParams.isAll = 1;
            //get list page

           if (typeof $scope.methods.index.name != 'undefined') {

                $scope.getResultsPage($scope.currentPage,$scope.searchParams);
           }

        }
    ]);

});
