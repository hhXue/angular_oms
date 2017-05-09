define([
    'angularAMD',
    'Session'
], function(angularAMD, BaseCtrl) {
    'use strict';
    angularAMD.controller('changeTimeCtrl', ['$scope', 'clientService', 'Session', '$controller', '$state', 'ngDialog',
        function($scope, clientService, Session, $controller, $state, ngDialog) {
            //permission control fixed to methods
            $scope.methods = $state.current.data.methods;
            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.title = $scope.ngDialogData.title;
            $scope.modelId = $scope.ngDialogData.id;
            $scope.index = $scope.ngDialogData.index;
            $scope.flag = $scope.ngDialogData.flag;
            $scope.module = $scope.ngDialogData.module;

            $scope.vods = [];

            console.info('$scope.ngDialogData',$scope.ngDialogData,$scope.flag);
            angular.forEach($scope.ngDialogData.dataTime,function(obj,i){
                if(obj.modelId==$scope.modelId && $scope.ngDialogData.dataTime.indexOf($scope.module) == i && typeof $scope.flag == 'undefined'){
                    if(obj.data.attr[$scope.index].times == false || typeof obj.data.attr[$scope.index].times=='undefined'){
                        $scope.vods = [{
                            dates:'',
                            startTime:'',
                            endTime:''}];
                    }
                    angular.forEach(obj.data.attr[$scope.index].times,function(data){
                        //显示定时
                        console.info('data ====', data);
                        var test = {};
                        test.endTime = data.end*1000;
                        test.startTime = data.start*1000;
                        test.dates = data.start*1000;
                        $scope.vods.push(test);
                        console.info('$scope.vods==',$scope.vods)


                    });
                }
                var blockList = [];
                if(obj.modelId==$scope.modelId && $scope.ngDialogData.dataTime.indexOf($scope.module) == i && $scope.flag === 0){
                    console.info('obj.data.block[$scope.index].time+++',obj.data,$scope.index);
                    for(var i in obj.data.block){
                        for(var b in obj.data.block[i].time){
                            console.info('time b',b,obj.data.block[i].time[b]);
                        }
                        blockList.push(obj.data.block[i]);
                    }
                    obj.data.block = blockList;
                    if(obj.data.block[$scope.index].time == false || typeof obj.data.block[$scope.index].time=='undefined'){
                        $scope.vods = [{
                            dates:'',
                            startTime:'',
                            endTime:''}];
                    }
                    angular.forEach(obj.data.block[$scope.index].time,function(data){
                        //显示屏蔽定时
                        console.info('data ====', data);
                        var test = {};
                        test.endTime = data.end*1000;
                        test.startTime = data.start*1000;
                        test.dates = data.start*1000;
                        $scope.vods.push(test);
                        console.info('$scope.vods==',$scope.vods)


                    });
                }
            });


            var changeCtrl = $scope.changeCtrl = {};
            Date.prototype.Format = function (fmt) { //author: meizz

                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds() //秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));

                return fmt;
            };
            changeCtrl.checkCloseDialog = function(item){

                $scope.submitted = true;
                angular.forEach(item,function(obj,j){
                    if(isNaN(obj.dates) || isNaN(obj.endTime) || isNaN(obj.startTime) || obj.dates=='' || obj.endTime=='' || obj.startTime==''){
                        item.splice(j,1);
                    }
                    // var dates = (new Date(obj.dates)).Format('yyyy-MM-dd');
                    // var endTime = (new Date(obj.endTime)).Format('hh:mm');
                    // var startTime = (new Date(obj.startTime)).Format('hh:mm');


                    var d = new Date();
                    var ds = new Date(obj.dates);
                    var sd = new Date(obj.startTime);
                    var ed = new Date(obj.endTime);

                    // var td = new Date();
                    // td.setUTCFullYear(d.getUTCFullYear());
                    // td.setUTCMonth(d.getUTCMonth());
                    console.log('set d ds --', d, ds, ds.getUTCDate() , ed.getUTCHours(),sd.getUTCHours(),sd.getUTCHours() < 24&&17 < sd.getUTCHours());
                    d.setUTCFullYear(ds.getFullYear());
                    //d.setDate( (new Date(obj.dates)).Format('dd') );
                    d.setUTCMonth( ds.getUTCMonth() );
                    if( sd.getUTCHours() < 24&&17 <= sd.getUTCHours()){
                        d.setUTCDate( parseInt((new Date(obj.dates)).Format('dd')) -1);
                    }else{
                        d.setUTCDate( parseInt((new Date(obj.dates)).Format('dd')) );
                    }

                    d.setUTCHours(ed.getUTCHours());
                    d.setUTCMinutes(ed.getUTCMinutes());
                    var npmD;
                    if( sd.getUTCHours() < 24&&17 <= sd.getUTCHours()&&ed.getUTCHours() <= 16&&0 <= ed.getUTCHours()){
                        npmD = angular.copy(d);
                        npmD.setDate(npmD.getDate()+1);
                    }else{
                        d.setUTCMonth( ds.getMonth() );
                        npmD = angular.copy(d);
                    }
                    obj.end = Date.parse(npmD)/1000;

                    d.setUTCHours(sd.getUTCHours());
                    d.setUTCMinutes(sd.getUTCMinutes());
                    console.log('set d  ==', d,d.getDate() ,d.getMonth(),(new Date(obj.dates)).Format('dd'));
                    obj.start = Date.parse(angular.copy(d))/1000;


                    // obj.end = Date.parse( new Date(dates +' '+ endTime) )/1000;//,(obj.start).getTime()/1000).toString().slice(0,starLength-endLength) + ((obj.end).getTime()/1000).toString()
                    // obj.start = Date.parse( new Date(dates +' '+ startTime) )/1000;

                    // obj.start = Date.parse(obj.startTime)/1000;
                    // obj.end = Date.parse(obj.endTime)/1000;

                    delete obj.dates;
                    delete obj.endTime;
                    delete obj.startTime;
                    obj.id = $scope.modelId;

                });
                console.log('setTime checkCloseDialog==', item);
                $scope.closeThisDialog(item)

            };
            changeCtrl.addTime = function(){
                var addVod = {
                    dates:'',
                    startTime:'',
                    endTime:''
                };
                if($scope.vods.length<10){
                    $scope.vods.push(addVod);
                }

            };
            changeCtrl.deleteTime = function(index){
                $scope.vods.splice(index,1);
            }

        }
    ]);

});