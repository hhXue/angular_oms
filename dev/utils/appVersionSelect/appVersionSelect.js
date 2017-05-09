define([
	'angularAMD',
    'BaseService',
    'lodash'
], function(angularAMD, BaseService, _) {

    /**
     * @param type String 需要关联的类型
     * {
     * tab: 模块
     * }
     *
     * @params id int 对象的id，如果没有表示新增
     *
     * @params returnValue Collection 关联的版本列表
     *
     */
    angularAMD.directive('appVersionSelect', ['appVersionSelectService', function(appVersionSelectService) {

        console.log('appVersionSelect appVersionSelectService=====', appVersionSelectService);

        return {
            restrict: 'EA',
            replace: true,
            scopt: {
                returnValue: '&',
                type: '=',
                id: '='
            },
            templateUrl: 'utils/appVersionSelect/tpl.html',
            link: function ($scope, element, attrs) {
                var tabEditCtrl = $scope.tabEditCtrl = {};
                var params;
                var app   = $scope.app;
                var id ;
                console.log('$scope.ngDialogData=',$scope.ngDialogData)
                switch ($scope.typeApp){
                    case 'tab':
                        id = $scope.app.id;
                        $scope.app = $scope.ngDialogData.item;
                        params = {
                            refId: $scope.app.id,
                            appRelationType: 22,
                            isAll:1
                        };
                        //版本全选
                        $scope.selectAll = false;
                        $scope.toggleAll = function(){
                            if($scope.selectAll){
                                app.appId = [];
                                angular.forEach($scope.tabVersion,function(val){
                                    app.appId.push(val.appsId);
                                })
                            }else{
                                app.appId = [];
                            }


                            console.log('app.appId',app.appId)

                        };
                        break;
                    case 'show':
                        id = $scope.app.id;
                        params = {
                            refId: $scope.ngDialogData.id,
                            isAll:1
                        };
                        break;
                    case 'video':
                        //$scope.app.appId.length = 0;
                        app = $scope.app = {
                            appId:$scope.idOptions
                        } ;
                        console.log('$scope.app==',$scope.app);
                        break;
                    case 'city':
                        //$scope.app.appId.length = 0;
                        app = $scope.app = {
                            appId:$scope.idOptions
                        } ;
                        console.log('$scope.app==',$scope.app);
                        console.log('city videoid==',$scope.video_id);
                        break;
                }

                //版本部分选择
                if (angular.isUndefined(app.appId)) {
                    app.appId =  [];
                }

                $scope.appVersions = [];
                //获取所有版本数据列表
                appVersionSelectService.getVersionList().then(function(resp){
                    console.log('getVersionList.data111',resp.data);
                    //return;
                    $scope.tabVersion = resp.data.rows;

                    //编辑获取版本数据
                    if(!angular.isUndefined(id)){

                        $scope.versionAppList = [];
                        //获取已经关联的版本数据
                        appVersionSelectService.getTabByVersionId(params).then(function(resp){
                            console.log('app data',resp.data);

                            $scope.versionAppList = resp.data.rows;

                            angular.forEach($scope.versionAppList,function(obj,i){

                                app.appId.push(obj.appId)
                            });


                            //_.map($scope.tabVersion, function(item){
                            //
                            //    if(_.find($scope.versionAppList, {'appId':item.appsId})){
                            //        $scope.toggleVesCheck(item.appsId);
                            //    }
                            //});

                            if($scope.tabVersion.length == app.appId.length){
                                $scope.selectAll = true;
                            }

                        },function(error){
                            console.log('error',error);
                        })
                    }
                },function(error){
                    console.log('error',error);
                });

                $scope.toggleVesCheck = function( item ){

                    if(app.appId.indexOf(item.appsId) > -1){
                        app.appId.splice(app.appId.indexOf(item.appsId), 1);
                        if($scope.typeApp == 'video'){
                            delete $scope.rItem[item.appsId];
                        }

                    }else{
                        app.appId.push(item.appsId);
                        if($scope.typeApp == 'video'){
                            $scope.rItem[item.appsId] = item;

                        }
                    }
                    console.log('app appid=========',app.appId,$scope.rItem)


                };

                if($scope.typeApp !== 'city'){
                    //获取所有的应用
                    appVersionSelectService.getApp().then(function(resp){
                        console.log('tab.data',resp.data);

                        $scope.appKeys = resp.data.rows;

                    },function(error){
                        console.log('error',error);
                    });
                }

                if($scope.typeApp == 'city'){
                    //获取所有频道关联的应用
                    appVersionSelectService.videoApp($scope.video_id).then(function(resp){
                        console.log('video.data',resp.data);

                        $scope.appKeys = resp.data;

                    },function(error){
                        console.log('error',error);
                    });
                }


                //监听应用长度
                $scope.$watch('appKeys',function(){
                    if($scope.appKeys && $scope.appKeys.length > 6){
                        $scope.len = 0;
                        $('.appKeyIndex > a:gt(5)').css('display','none');
                    }
                });


                //点击更改 显示 隐藏按钮
                $scope.changeShow = function(status){
                    $scope.len = status;
                    if($scope.len==0){
                        $('.appKeyIndex > a:gt(5)').css('display','none');
                    }else{
                        $('.appKeyIndex > a:gt(5)').css('display','inline');
                    }

                };

                //点击获取同一应用下的版本
                var indexList = [],versionList = [];

                tabEditCtrl.clickGetApp_Ver = function(params,index,event){
                    console.log('params,index,event=',params,index,event)

                    appVersionSelectService.getVersionList(params).then(function(resp){
                        console.log('app getVersionList.data',resp.data, this);
                        versionList = [];

                        if(indexList.indexOf(index) > -1){
                            event.target.setAttribute('style',"");
                            indexList.splice(indexList.indexOf(index),1);
                            versionList = resp.data.rows;
                            _.forEach(versionList,function(a){
                                _.forEach(angular.copy($scope.appVersions),function(b,i){
                                    if( a.appsId== b.appsId){
                                        $scope.appVersions.splice(i,1);
                                    }
                                })
                            })
                        }else{
                            indexList.push(index);
                            event.target.setAttribute('style',"background-color: #EEAD0E");
                            versionList = resp.data.rows;
                            $scope.appVersions = $scope.appVersions.concat(versionList);
                        }
                        //versionList = [];
                        console.log('difference===',$scope.appVersions,versionList,indexList)


                    },function(error){
                        console.log('error',error);
                    });

                };


            }
        };
    }]);

    angularAMD.service('appVersionSelectService', ['APP_CONFIG', '$http', '$q', function(config, $http, $q, $scope) {
        var mapping = {
            "client": {
                "id": "videoId",
                "name": "videoName"
            },
            "tablet": {
                "id": "tabletId",
                "modelId": "modelId",
                "tabName": "tabletName",
                "tabApi": "apiName",
                "weight": "tabletSort",
                "tabletStatus": "tabletStatus",
                "tabletLock": "tabletLock",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "userId": "userId",
                "userName": "userName",
                //新增字段
                "tabType": "tabletType",
                "appId": "appId"
            },
            "target": {
                "id": "targetId",
                "tabletId": "tabletId",
                "name": "targetName",
                "userName": "userName",
                "appId": "appId",
                "data": "data",
                "delModelId": "delModelId",
                "userId": "userId",
                "status": "status",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "video": {
                "id": "videoId",
                "name": "videoName",
                "videoType": "videoType",
                "imgUrl": "videoImage",
                //"status": "videoStatus",
                "intro": "intro",
                "recomm": "recomm",

               //TEST
                "description": "description",
                "videoDuration": "videoDuration",
                "videoStatus": "videoStatus",
                "area": "area",
                "urlSource": "urlSource",
                "videoSize": "videoSize",
                "firstChar": "firstChar",
                "videoOfflinetime": "videoOfflinetime",
                "videoOnlinetime": "videoOnlinetime",
                "score": "score",
                "videoRecord": "videoRecord",
                "videoEpg": "videoEpg",
                "images": "images",
                "videoUrl": "videoUrl",
                "userId": "userId",
                "videoCp": "videoCp",
                "videoCategory": "videoCategory",
                "videoTag": "videoTag",
                "videoApp": "appRelation",
                "createdAt": "createdAt",
                "chargeType": "chargeType",
                "chargeTypeName":"chargeTypeName",
                "updatedAt": "updatedAt",
                "videoImage": "videoImage",
                "videoShareImage": "videoShareImage",
                "videoTvImage": "videoTvImage",

                "vip":"vip",
                "relationEpg":'relationEpg',
                "areaId":"areaId"
            },
            "apps": {
                "id": "appsId",
                "version": "appsAppVersion",
                "name": "appsAppOs",
                "appKeyName":"appKeyName"
            },
            "appRelation": {
                "appRelationId": "appRelationId",
                "refId": "refId",
                "id": "appId",
                "userId": "userId",
                "type": "type",
                "targetId": "targetId",
                "version": "appsAppVersion",
                "name": "appsAppOs",
                "noAppId": "noAppId",
                "appKeyName":"appKeyName"
            },
            "radio": {
                "id": "id",
                "videoId": "videoId",
                "videoName": "videoName",
                "sort": "sort",
                "status": "status",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt"
            },
            "customApi": {
                "id": "customApiId",
                "name": "customName",
                "apiName": "customApiName",
                "status": "customStatus",
                "createdAt": "createdAt",
                "updatedAt": "updatedAt",
                "userId": "userId",
                "userName": "userName",
                "appId": "appId",
                "customValue": "customValue"
            }
        };

        var appVersionSelectService = new BaseService(config, $http, $q, mapping);

        //tmp api
        appVersionSelectService.getVersionList = function(params) {
            var that = appVersionSelectService;
            var method = '';
            var url = '';

            method = 'GET';
            url = that.httpBaseUrl + '/apps/index/?isAll=1';

            return that.$http({
                url: url,
                params:params,
                method: method,
                withCredentials: true

            });
        };

        //获取频道关联应用
        appVersionSelectService.videoApp = function(id) {
            var that = appVersionSelectService;
            var method = '';
            var url = '';

            method = 'GET';
            url = that.httpBaseUrl + '/video/videoappkey/'+id;

            return that.$http({
                url: url,
                method: method,
                withCredentials: true

            });
        };

        appVersionSelectService.getApp = function(){
            var that = this;
            var d = $q.defer();
            $http({
                url:that.httpBaseUrl + '/appKey/index?isAll=1',
                method:'GET',
                headers:{
                    'Authorization': 'Basic fdfwoeigjiewoe',
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                withCredentials: true
            }).then(function(resp) {
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        //根据tab id获取应用
        appVersionSelectService.getTabByVersionId = function(params) {
            var that = this;
            var method = 'GET';
            var url = '';
            var d = that.$q.defer();

            url = that.httpBaseUrl + '/appRelation/index';


            that.$http({
                url: url,
                method: method,
                params: params,
                withCredentials: true
            }).then(function(resp) {
                //resp.data.rows = that.changeToLocalColumns(resp.data.rows);
                d.resolve(resp);
            }, function(error) {
                d.reject(error);
            });
            return d.promise;
        };

        return appVersionSelectService;
    }]);

    //纪念xue niu 版本 获取应用 及旗下的版本
    /*
    angularAMD.directive('appver', function() {
        return {
            restrict:'EA',
            replace:true,
            scopt:{
                tabEditCtrl:'&'
            },
            template:'<div>'+
                    '<a href="javascript:;" class="btn btn-default col-md-12 backgr"  ' +
                        'ng-click="tabEditCtrl.getAppVersion({appsAppId:appKey.appKeyId},$index,$event)">' +
                         '{{ appKey.appKeyName }}' +
                    '</a>'+
                    '<a ng-if>aaa</a>'+
                    '</div>',


            link:function(scope, element, attrs){
                scope.tabEditCtrl.getAppVersion = function(params,index,event){
                    $('.backgr:eq('+index+')').css("backgroundColor",'#5CACEE');

                }
                //if(scope.appKeys.length > 6){
                //    scope.isBig = 0
                //}
                //scope.$watch(function(){
                //    if(scope.appKeys){
                //        console.log('stop====')
                //    }
                //})
            }

        };

    });

    angularAMD.directive('isBig',function(){
        return {
            restrict:'EA',
            replace:true,
            //scopt:{
            //    appKeys:'&'
            //},
            template:'<div class="col-md-12 text-right">'+
                        '<a href="javascript:;" ng-if="isShow==0" ><span style="font-size:12px;">&and; </span>隐藏</a>'+
                        '<a href="javascript:;" ng-if="isShow==1" ><span style="font-size:12px;">&or; </span>展开</a>'+
                        '</div>',


            link:function(scope, element, attrs){
                element.bind("click", function() {
                  scope.$apply(toggle);
                });

                if(scope.appKeys){
                    function toggle(){
                        if(scope.isShow == 0){
                            $('.verBox  a:gt(5)').css('display','none');
                            scope.isShow = 1;
                        }else{
                            $('.verBox  a:gt(5)').css('display','inline');
                            scope.isShow = 0;
                        }
                    }

                }


            }

        };
    })*/
});