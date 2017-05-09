define([
    'angularAMD'
], function(angularAMD) {
    'use strict';


    angularAMD.controller('BaseCtrl', ['$scope', '$state', 'ngDialog', 'usSpinnerService', 'StarsUtils', 'Session',
        function($scope, $state, ngDialog, usSpinnerService, StarsUtils, Session) {

            $scope.itemService = {};


            $scope.totalItems = 0;
            $scope.itemsPerPage = 20; // this should match however many results your API puts on one page
            $scope.currentPage = 1;
            $scope.pagination = {
                current: $scope.currentPage
            };


            $scope.loading_list = false;
            $scope.processing_delete = false;
            $scope.search_error = false;
            $scope.search_error_msg = '';
            $scope.searchParams = {};

            $scope.itemCtrl = {
                createItem: createItem,
                editItem: editItem,
                deleteItem: deleteItem,
                search: search,
                back: back,
                belongArea:belongArea
            };

            //toggle select all the checkboxes
            $scope.ids = [];
            $scope.selectAll = false;
            $scope.toggleAll = function() {
                if ($scope.selectAll) {
                    angular.forEach($scope.items, function(item) {
                        if ($scope.ids.indexOf(item.id) < 0) {
                            $scope.ids.push(item.id);
                        }
                    });
                } else {
                    $scope.ids = [];
                }

            };

            $scope.toggleSelection = function(id) {
                var idx = $scope.ids.indexOf(id);

                if (idx > -1) {
                    $scope.ids.splice(idx, 1);
                } else {
                    $scope.ids.push(id);
                }
            };

            $scope.deleteAll = function() {

                StarsUtils.confirm('确定删除数据', "确定", "取消").then(function() {
                    if (!$scope.selectAll && $scope.ids.length == 0) {
                        StarsUtils.alert('无删除数据');
                        return;
                    }
                    $scope.itemCtrl.deleteItem($scope.ids);
                    $scope.ids = [];
                });
            };

            //路由当前子页面刷新
            $scope.route = function() {
                    var array = [];
                    for (var key in $state.params) {
                        var obj = {};
                        obj[key] = $state.params[key];
                        array.push(obj);
                    }

                    var sessionCookie = JSON.parse(sessionStorage.getItem('currentUser'));
                console.info('sessionCookie',sessionCookie);

                    sessionCookie.lastParams = array;

                    var str = JSON.stringify(sessionCookie);
                    sessionStorage.setItem('currentUser', str);
                   // if(location.href.indexOf('createMsg') > -1){
                   //     sessionCookie.lastParams = [];
                   //     var str2 = JSON.stringify(sessionCookie);
                   //     sessionStorage.setItem('currentUser', str2);
                   //  }
                //if($state.params.videoId){
                    console.info('angular $rout',location,location.href.indexOf('createMsg'),location.origin + location.pathname + location.hash,location.hash.indexOf(2));
                    //location.href = (location.origin + location.pathname + location.hash  ).toString();
                    //location.href = 'http://localhost:63342/oms_web/dev/index.html#/oms/client/clientCtrl/45/1';

                //}
                };

                //后腿
            function back() {
                var session = JSON.parse(sessionStorage.getItem('currentUser'));

                $state.go(session.backUrl );

            }
            //获取地域
            function belongArea(id,type,name){
                var ngdialog = ngDialog.open($scope.dataConfig.area);
                $scope.dataConfig.area.data.videoId = id;
                $scope.dataConfig.area.data.areaRelationType = type;

                ngdialog.closePromise.then(function(data) {
                    console.log('data', data);
                    $scope.itemService.setName(name);
                    if (data.value != 0 && data.value != '$closeButton')
                        $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                });
            }

            $scope.getResultsPage = function(pageNumber, params, callback) {
                $scope.currentPage = pageNumber;
                $scope.items = [];
                $scope.loading_list = true;

                $scope.itemService.getList(pageNumber, params).then(function(data) {
                    $scope.loading_list = false;
                    $scope.items = data.data.rows;
                    $scope.totalItems = data.data.totalResults;

                    //console.table($scope.items);


                    if (typeof params != "undefined" && params.isAll == 1) {} else {
                        $scope.itemsPerPage = data.data.pageSize;
                    }
                    if (angular.isDefined(callback)) {
                        callback();
                    }
                }, function(error) {

                    if (error.data.code == 401) {
                        StarsUtils.confirm('请重新登陆', '确定', '关闭').then(function() {

                            Session.destroy();
                            $scope.setCurrentUser(null);
                            sessionStorage.setItem('changeIndex', null);
                            sessionStorage.setItem('currentUser', "1");
                            window.location.reload();
                        }, function() {
                            Session.destroy();
                            $scope.setCurrentUser(null);
                            sessionStorage.setItem('changeIndex', null);
                            sessionStorage.setItem('currentUser', "1");
                            window.location.reload();
                        });
                    }

                    $scope.loading_list = false;

                    $scope.search_error_msg = 'code ' + error.data.code + ':' + error.data.message;

                    if (typeof error.data.code == undefined || typeof error.data.message) {
                        $scope.search_error_msg = "服务端响应超时";
                    }

                    $scope.search_error = true;
                });
            };

            $scope.pageChanged = function(newPage) {
                this.getResultsPage(newPage, this.searchParams);
                console.log('newPage',newPage);
            };

            function createItem() {

                var ngdialog = ngDialog.open($scope.dataConfig.create);

                ngdialog.closePromise.then(function(data) {
                    console.log('data', data);
                    if (data.value != 0 && data.value != '$closeButton')
                        $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                });

            }

            function deleteItem(id, e) {

                StarsUtils.confirm('确定删除吗？', '删除', '不删除').then(function() {
                    $scope.selectAll = false;
                    if (angular.isDefined(e)) {
                        $scope.processing_delete = true;
                        var target = e.currentTarget || e.target;
                        angular.element(target).css('display', 'none').next().css('display', 'inline-block');
                        usSpinnerService.spin('spinner_' + id);
                    }

                    if (typeof id == "undefined") {
                        id = $scope.ids;
                    }

                    $scope.itemService.deleteItem(id).then(function(list) {
                        $scope.ids = [];

                        StarsUtils.alert("删除数据成功");

                        $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                    }, function(reason) {

                        var str = [];

                        if (reason.data.code == 401) {
                            StarsUtils.confirm('请重新登陆', '确定', '关闭').then(function() {

                                Session.destroy();
                                $scope.setCurrentUser(null);
                                sessionStorage.setItem('changeIndex', null);
                                sessionStorage.setItem('currentUser', "1");
                                window.location.reload();
                            }, function() {
                                Session.destroy();
                                $scope.setCurrentUser(null);
                                sessionStorage.setItem('changeIndex', null);
                                sessionStorage.setItem('currentUser', "1");
                                window.location.reload();
                            });
                        } else if (reason.status == 400) {
                            angular.forEach(reason.data.message, function(e) {
                                str.push(e);
                            });
                        } else {
                            str.push(reason.data.message);
                        }


                        if (str.length == 0 && reason.status == 500) {
                            str[0] = "后台数据错误";
                        } else if (typeof str[0] == "undefined") {
                            str[0] = "后台数据错误";
                        }

                        StarsUtils.confirm('删除失败:' + str).then(function(){
                            $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                        },function(){

                            }

                        );


                        if (angular.isDefined(e)) {
                            $scope.selectAll = false;
                            $scope.processing_delete = true;
                            var target = e.currentTarget || e.target;
                            angular.element(target).css('display', 'inline-block').next().css('display', 'none');
                            usSpinnerService.stop('spinner_' + id);
                        }
                    });
                })
            }

            function editItem(item) {
                $scope.dataConfig.edit.data.item = angular.copy(item);
                console.info('$scope.dataConfig.edit.item', $scope.dataConfig.edit.data, $scope.dataConfig.edit.data.item, item);
                var ngdialog = ngDialog.open($scope.dataConfig.edit);
                //var ngdialog = ngDialog.open(item);
                ngdialog.closePromise.then(function(data) {
                    if (data)
                        $scope.getResultsPage($scope.currentPage, $scope.searchParams);
                });
            }

            function search() {
                $scope.getResultsPage(1, $scope.searchParams);
            }

        }
    ]);



});