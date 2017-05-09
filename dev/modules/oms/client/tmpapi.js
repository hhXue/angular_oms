define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD) {
    'use strict';
    angularAMD.controller('TmpapiCtrl', ['$scope', 'clientService', 'Session', '$controller', '$state', '$stateParams', 'ngDialog', 'StarsUtils',
        function($scope, clientService, Session, $controller, $state, $stateParams, ngDialog , StarsUtils) {

            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //set data config
            $scope.dataConfig = {
                edit: {
                    template: 'modules/oms/client/tmpapiEdit.html',
                    data: {
                        title: "编辑API"
                    },
                    controller: 'TmpapiEditCtrl'
                },
                create: {
                    template: 'modules/oms/client/tmpapiEdit.html',
                    data: {
                        title: "新增API",
                        item: {}
                    },
                    controller: 'TmpapiEditCtrl'
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
            console.log("$stateParams222", $stateParams);
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });
            //set item service
            $scope.itemService = clientService.setName('customApi');

            var tmpapiCtrl = $scope.tmpapiCtrl = {};
            $scope.Vals = [{
                val: 1,
                name: "上线"
            }, {
                val: 0,
                name: "下线"
            }];
            //versionList
            tmpapiCtrl.versionList = function(id){
                var ngDiolog = ngDialog.open({
                    template: 'modules/oms/client/versionList.html',
                    data: {
                        title: "版本列表",
                        id:id
                    },
                    controller: "VersionCtrl"
                });
                console.log("ngDiolog",ngDiolog);

            };


            //获取地域数据
            clientService.getAllArea().then(function(resp){
                console.log('resp area===',resp)
                $scope.areaList = resp.data.rows;
            },function(){

            });

            //select relative area
            tmpapiCtrl.belongArea = function(id,event){
                clientService.getAllArea().then(function(data){},function(error){})
            };

            tmpapiCtrl.update = function(item, status) {
                clientService.saveTmp({
                    id:item.id,
                    status:status
                },$scope).then(function(resp){
                    console.log('resp.data.status;',resp.data.status)
                    $scope.status = resp.data.status;
                    $scope.getResultsPage($scope.currentPage)
                }

                    , function(error) {

                        var str = [];
                        if (error.status == 400) {
                            angular.forEach(error.data.message, function(e) {
                                console.log(e);
                                str.push(e);
                            });
                        } else {
                            str.push(error.data.message);
                            if (error.data.error) {
                                str.push(error.data.error.message);
                            }
                        }
                        var errorStr = 'code ' + error.status + ':' + str;

                        StarsUtils.confirm(errorStr).then(function() {});


                    });
                }
                //get list page
            if(typeof $scope.methods.index.name != 'undefined' ) {
                $scope.getResultsPage($scope.currentPage, $scope.searchParams);
            }

            //search
            $scope.itemCtrl.search = function() {
                console.info('$scope.searchParams==',$scope.searchParams);
                $scope.itemService = clientService.setName('customApi');
                $scope.getResultsPage(1, $scope.searchParams);
            }

        }

    ]);

});
