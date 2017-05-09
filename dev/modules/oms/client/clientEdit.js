define([
    'angularAMD',
    'modules/oms/client/service',
    'Session'
], function(angularAMD) {
    'use strict';

    //模块控制器 》里面的方法
    angularAMD.controller('clientEditCtrl', ['$scope', 'clientService', '$controller', '$state', 'ngDialog','StarsUtils',
        function($scope, clientService, $controller, $state, ngDialog, StarsUtils) {

            //extend from BaseCtrl
            $controller('BaseCtrl', {
                $scope: $scope
            });

            $scope.objModel = [
                {
                //template: 'modules/oms/client/clientOption.html',
                //data: {
                //    title: "添加频道",
                //    objName: "video",
                //    id: "",
                //    type: 0
                //},
                //controller: 'changeCtrl'
            },
            {
				template: 'modules/oms/client/clientOption.html',
				data: {
					title: "添加频道",
					objName: "video",
					id: "",
					type: 0
				},
				controller: 'changeCtrl'
			}, {
				template: 'modules/oms/client/clientOption.html',
				data: {
					title: "栏目列表",
					objName: "video",
					id: "",
					type: 1
				},
				controller: 'changeCtrl'
			}, {
				template: 'modules/oms/client/clientOption.html',
				data: {
					title: "编辑热门搜索",
					objName: "video",
					id: "",
					type: 2
				},
				controller: 'changeCtrl'
			}, {
				template: 'modules/oms/client/clientOption.html',
				data: {
					title: "选择应用",
					objName: "appRelation",
					id: "",
					targetId: $scope.tabletId,
					type: 3
				},
				controller: 'changeCtrl'
			}, {
				template: 'modules/oms/client/clientOption.html',
				data: {
					title: "添加热播",
					objName: "video",
					id: "",
					type: 0
				},
				controller: 'changeCtrl'
			}, {
                    template: 'modules/oms/client/clientOption.html',
                    data: {
                        title: "添加屏蔽频道",
                        objName: "video",
                        id: "",
                        type: 0
                    },
                    controller: 'changeCtrl'
                }];

			//编辑 获取id 查询数据 绑定
			$scope.targetId = $state.params.targetId;
			$scope.tabletId = $state.params.tabletId;

			$scope.showStatus = 1;

			$scope.tabClass = "btn-warning";

			$scope.modules = [];

			$scope.client = {
				tabletId: $scope.tabletId,
				name: "",
				delModelId: [],
				appId: [],
				data: []
			};

			var clientEditCtrl = $scope.clientEditCtrl = {};

			clientEditCtrl.init = function() {

				clientService.getClientModels($scope.tabletId).then(function(e) {

					$scope.model = e.data;
					angular.forEach($scope.model, function(obj) {
						if (obj.config) {

							obj.line = 1;
							if (obj.id == 5) {
								obj.line = 2;
							}
							if (obj.id == 2) {
								obj.episode = 1;
							}
						}
						obj.modelId = angular.copy(obj.id);
						delete obj.id;
						obj.data = {
							text: "",
							ids: [],
							attr: []
						};
					});
					$scope.model2 = angular.copy($scope.model);
					if ($scope.targetId != -1) {
						clientEditCtrl.editInit();
					}
				})
			};

			clientEditCtrl.init();


            //热播屏蔽频道列表
            clientEditCtrl.hideVideo = function(dialogIndex, i){

                console.info('$scope.modules[i].data.block -------',$scope.modules[i].data.block)

                var idArry = [];
                var blockArry = [];
                if(_.isArray($scope.modules[i].data.block)){
                    angular.forEach($scope.modules[i].data.block,function(obj){
                        idArry.push(obj.id);
                    })
                }else{
                    for(var j in $scope.modules[i].data.block ) {
                        idArry.push(parseInt(j));
                    }
                }

                console.log('idArry',idArry);
                if(idArry.length !== 0){
                    angular.forEach($scope.modules[i].data.block,function(blockObj,ind){
                        if(blockObj.videoId){
                            blockArry.push({
                                id:blockObj.videoId,
                                time:blockObj.time,
                                videoName:blockObj.videoName
                            });
                        }else{
                            blockArry.push({
                                id:blockObj.id,
                                time:blockObj.time,
                                videoName:blockObj.videoName
                            });
                        }

                    });
                    $scope.modules[i].data.block = blockArry;
                }


                $scope.objModel[dialogIndex].data.id = idArry;
                    var ngdialog = ngDialog.open($scope.objModel[6]);
                    ngdialog.closePromise.then(function(data){
                        console.info("close data",data,i);
                        if(data.value==0 || data.value=='$closeButton'){
                            return;
                        }

                        angular.forEach(data.value,function(blockObj,ind){
                            console.info('blockObj,idArry',typeof blockObj,blockObj,idArry);

                            if(idArry.indexOf(blockObj.id) == -1 && idArry.length !==0){
                                console.info('blockObj----',blockObj)
                                $scope.modules[i].data.block.push({
                                    id:blockObj.id,
                                    time:false,
                                    videoName:blockObj.name
                                });

                            }else if(idArry.length==0){
                                console.info('blockObj++++',blockObj)
                                blockArry.push({
                                    id:blockObj.id,
                                    time:false,
                                    videoName:blockObj.name
                                });
                                $scope.modules[i].data.block = blockArry
                            }


                        });
                        console.info('$scope.modules[i].data.block',i,$scope.modules[i].data.block,$scope.modules)
                    });

            };

            //存放频道列表
            //$scope.channelList = [];
			//编辑数据初始化
			clientEditCtrl.editInit = function() {
				$scope.client.id = $scope.targetId;

                //$scope.typeShowList = 1;
				clientService.editData($scope.targetId).then(function(data) {
                    console.info('e data.data',data.data);
					var e = data.data;
                    angular.forEach(e.data,function(da){
                        if(da.modelId == 5){
                            for(var m in da.data.block){

                                if(m){
                                    $scope.typeShowList = 1;
                                }else{
                                    $scope.typeShowList = 0;
                                }
                            }
                        }
                    });

					$scope.client = {
						id: e.targetId,
						tabletId: $scope.tabletId,
						name: e.targetName,
						appId: [],
						appNames: [],
						delModelId: [],
						data: []
					};

					angular.forEach(e.appList, function(app, i) {
						$scope.client.appNames.push(app.appKeyName + ' ' +app.appsAppOs +' '+ app.appsAppVersion);
						$scope.client.appId.push(app.appId);
					});

					$scope.apps = {
						appid: angular.copy($scope.client.appId),
						appName: $scope.client.appNames
					};

					//module 绑定、栏目介绍 绑定
                    $scope.dates = [];
					angular.forEach(e.data, function(obj, i) {
						obj.data.attr = [];
						for (var key in obj.data.ids) {
							var channelObj = obj.data.ids[key];
                            //console.info('obj.data.ids',obj.data.ids,obj.data.ids[key].time);
                            //angular.forEach(obj.data.ids[key].time,function(ti){
                            //    ti.end = angular.copy(new Date(parseInt(ti.end)*1000));
                            //    ti.start = angular.copy( new Date(parseInt(ti.start)*1000));
                            //})

							obj.data.attr[obj.data.ids[key].sort] = {
								modelId: key,
								name: obj.data.ids[key].videoName,
								imgUrl: obj.data.ids[key].videoImage,
                                sortVideo:obj.data.ids[key].sort+1,
                                intro:obj.data.ids[key].intro,
                                recomm:obj.data.ids[key].recomm,
                                times:obj.data.ids[key].time
							};
                            //console.info('obj.data.attr============',obj.data.attr);

                            $scope.dates.push({'intro':channelObj.intro,'recomm':channelObj.recomm});

						}

						obj.name = $scope.model[obj.modelId].name;
						$scope.modules.push(obj);
                        //$scope.channelList = angular.copy(obj.data.attr);
						obj.data.ids = [];

                        console.info('module 绑定 obj============',obj,$scope.modules);


					});

				});
			};

			//删除搜索模块下的一个子对象
			clientEditCtrl.rmSearchOption = function(module, index) {

				$scope.modules[$scope.modules.indexOf(module)].data.ids.splice(index, 1);
				$scope.modules[$scope.modules.indexOf(module)].data.attr.splice(index, 1);
			};
            //删除屏蔽频道
            clientEditCtrl.delBlockOption = function(module, index) {
                var blockTime = [],block_Time = [];
                for( var i in $scope.modules[$scope.modules.indexOf(module)].data.block){
                    blockTime.push($scope.modules[$scope.modules.indexOf(module)].data.block[i])
                }
                blockTime.splice(index,1);
                angular.forEach(blockTime,function(e){
                    if(e.videoId){
                        block_Time.push({
                            id: e.videoId,
                            time: e.time,
                            videoName: e.videoName
                        })
                    }else{
                        block_Time.push({
                            id: e.id,
                            time: e.time,
                            videoName: e.videoName
                        })
                    }

                });
                $scope.modules[$scope.modules.indexOf(module)].data.block = block_Time;
            };

            //排序
            $scope.sortFlag = false;
            clientEditCtrl.pressKeySort = function(e, item, mode){

                console.log('e,item,mode==',e,item,mode);
                var target = angular.element(e.target);
                if(!target.val()){
                    //提示输入数字
                }
                angular.forEach($scope.modules,function(objS,i){
                    console.info('i,$scope.modules====',$scope.modules);
                    if($scope.modules.indexOf(mode) == i){
                        item.sortFlag = true;
                        console.info('check out objS====',objS);
                        if(e.which != 13){
                            return;
                        }
                        $scope.modules[i].data.attr = angular.copy(objS.data.attr);
                        var arr = $scope.modules[i].data.attr;

                        _.remove(arr, function(channel){
                            return channel.modelId == item.modelId;
                        });
                        console.info('arr====',arr);
                        _.sortBy(arr, 'sortVideo');
                        //arr.sort(function(a, b){
                        //    return a.sortVideo - b.sortVideo;
                        //});

                        var sorted_arr = [];
                        _.each(arr, function(ch, i){
                            //console.log('ch i target.val()', ch, i, target.val());
                            if((i+1) == target.val() ){
                                sorted_arr.push(item);
                            }
                            sorted_arr.push(ch);
                        });
                        if(!_.includes(sorted_arr, item)){
                            sorted_arr.push(item);
                        }

                        _.each(sorted_arr, function(c, j){
                            c.sortVideo = j+1;
                        });

                        //_.each($scope.modules, function(m, k){
                        //    if(m.name=='频道列表' || m.name=='热播' || m.name=='栏目列表'){
                        //        m.data.attr = sorted_arr;
                        //    }
                        //});
                        $scope.modules[i].data.attr = sorted_arr;
                        item.sortFlag = false;
                    }
                });
            };

			//选择上方  基本信息/模版设置
			clientEditCtrl.changeTab = function(status) {
				$scope.showStatus = status;
			};
            //设置定时
            clientEditCtrl.setVideoTime = function(module,index,num){
                $scope.module = module;
                console.info('module,index===',module,index);
                var objSetTim = [{
                    template: 'modules/oms/client/clientSetTime.html',
                    data: {
                        title: "频道定时",
                        id:1,
                        dataTime:$scope.modules,
                        index:index,
                        module:$scope.module
                    },
                    controller: 'changeTimeCtrl'
                },{
                    template: 'modules/oms/client/clientSetTime.html',
                    data: {
                        title: "栏目定时",
                        dataTime:$scope.modules,
                        id:2,
                        index:index,
                        module:$scope.module
                    },
                    controller: 'changeTimeCtrl'
                },{
                    template: 'modules/oms/client/clientSetTime.html',
                    data: {
                        title: "热播定时",
                        dataTime:$scope.modules,
                        id:5,
                        index:index,
                        module:$scope.module
                    },
                    controller: 'changeTimeCtrl'
                },{
                    template: 'modules/oms/client/clientSetTime.html',
                    data: {
                        title: "屏蔽频道定时",
                        dataTime:$scope.modules,
                        id:5,
                        index:index,
                        flag:0,
                        module:$scope.module
                    },
                    controller: 'changeTimeCtrl'
                }];

                var ngdialog3 = ngDialog.open(objSetTim[num]);

                ngdialog3.closePromise.then(function(data){
                        console.info('data====',data,num, $scope.modules[$scope.modules.indexOf(module)].data);
                        if( data.value.length == 0 ){
                            if(num===3){
                                $scope.modules[$scope.modules.indexOf(module)].data.block[index].time = false;
                            }else{
                                $scope.modules[$scope.modules.indexOf(module)].data.attr[index].times = false;
                            }
                        }

                        if(data.value==0){
                            return;
                        }
                        angular.forEach($scope.modules,function(obj){
                            var t = 0;
                            console.info('modelId======',obj.modelId,obj);
                            if(obj.modelId == data.value[0].id){
                                var m = $scope.modules[$scope.modules.indexOf(module)].data;
                                angular.forEach(data.value,function(showObj){
                                    if(isNaN(showObj.end) && isNaN(showObj.start) ){
                                        t = t + 1;
                                    }
                                });
                                if(num!==3){
                                    if(t == data.value.length ){
                                        m.attr[index].times = false
                                    }else{
                                        m.attr[index].times = angular.copy(data.value);

                                    }
                                }else{
                                    console.info('m.block===',m.block);
                                    if(t == data.value.length ){
                                        m.block[index].time = false;
                                    }else{
                                        m.block[index].time = angular.copy(data.value);
                                        angular.forEach(m.block[index].time,function(e){
                                            delete e.id
                                        })
                                    }
                                    for(var i in m.block){
                                        if(m.block[i].videoId){
                                            m.block[i] = {
                                                id: m.block[i].videoId,
                                                time: m.block[i].time,
                                                videoName:m.block[i].videoName
                                            }
                                        }

                                    }
                                }

                                console.log('mmmmmm====', m,m.attr,$scope.modules);
                            }
                        });


               },function(error){

               }
    )
           };

			//添加模块
			$scope.modelAdd = function(index) {
				$scope.modules.push(angular.copy($scope.model2[index]));
			};

			//移除模块
			$scope.removeModule = function(index, item) {
                console.info('remove module:item',item)
				if (typeof item.targetDataId == "undefined" || item.targetDataId == "") {
					$scope.modules.splice(index, 1);
					return;
				}
				$scope.client.delModelId.push(item.targetDataId);
				$scope.modules.splice(index, 1);
			};

            var blockList = [];
			//保存
			clientEditCtrl.save = function() {

                console.info('$scope.modules=====',$scope.modules);
				$scope.submitted = true;

				if (!clientService.isEmptyObject($scope.myform.$error)) {
					return;
				}
                if($scope.modules.length == 0){
                    StarsUtils.alert('保存失败，请输入数据！');
                    return;
                }

				if (typeof $scope.client.name == "undefined" || $scope.client.name == "") {
					alert("名称不能为空");
					return;
				}

                for(var i=0,m=0; m=$scope.modules.length, i<m; i++) {
                    console.log('不能保存error',$scope.modules[i].data.attr.length,$scope.modules[i].modelId,$scope.modules[i].data.text)
                    if( ($scope.modules[i].data.attr.length == 0 && $scope.modules[i].modelId !== 4 && $scope.modules[i].modelId !== 5) ||
                        ($scope.modules[i].modelId == 4&& $scope.modules[i].data.text == '') ){
                        $scope.submitted = false;
                        StarsUtils.alert('保存失败，存在空数据，请重新编辑！');
                        return;
                    }
                    if ($scope.modules[i].modelId == 5) {
                        console.info('obj.data.count obj.data.attr.length',$scope.modules[i].data.count, $scope.modules[i].data.attr.length);
                        if (typeof $scope.modules[i].data.count != "number" || $scope.modules[i].data.count < $scope.modules[i].data.attr.length || $scope.modules[i].data.count == $scope.modules[i].data.attr.length) {
                            $scope.submitted = false;
                            return;
                        }
                    }

                }

				if (!$scope.submitted) {
					$scope.submitted = true;
					return;
				}


				//匹配对应的ids数据
				angular.forEach($scope.modules, function(obj, i) {
					obj.sort = i + 1;

                    var tmp = [];
                    //热播屏蔽列表
                    //if(obj.modelId == 5 && obj.data.block){
                    //    for(var i in obj.data.block){
                    //        console.info("obj.block========",obj.data.block[i]);
                    //    }
                    //}
					//直播列表
                    obj.data.ids = [];
					if (obj.modelId == 1 || obj.modelId == 2 || obj.modelId == 5 ) {
						angular.forEach(obj.data.attr, function(attr, a) {

                            if(attr.times){
                                for(var i in attr.times){
                                    delete attr.times[i].id;
                                }

                                obj.data.ids.push({'id': angular.copy(attr.modelId), 'time': angular.copy( attr.times )});


                            }else{
                                obj.data.ids.push({'id': angular.copy(attr.modelId), 'time': false})
                            }

						});

						if (obj.modelId == "2" && obj.episode == 1) {
							delete obj.isNumber;
						}


					}
                    else if (obj.modelId == 3) {
						angular.forEach(obj.data.attr, function(attr, a) {
							obj.data.ids.push(angular.copy(attr.modelId));
						});
					} else if (obj.modelId == 4) {
						obj.data = {
							text: obj.data.text
						};
					}
                    if(obj.modelId == 5 ){
                        angular.forEach(obj.data.block,function(da,d){
                            if(da.videoName){
                                delete da.videoName;
                            }

                        });
                        console.log('obj.data.block   test+++',angular.copy(obj.data.block), obj.data.block instanceof Array);

                        if(!(obj.data.block instanceof Array)){
                            angular.forEach(obj.data.block,function(da,d){
                                tmp.push({
                                    id:da.videoId,
                                    time:da.time
                                });
                            });
                            obj.data.block = tmp;
                        }


                        console.log('obj.data.block   after+++',obj.data.block);

                    }
					// delete obj.data.attr;
					// delete obj.data.arry;
				});
				$scope.client.data = angular.copy($scope.modules);
				$scope.itemService = clientService.setName('target');

				if ($scope.client.id == '-1') {
					delete $scope.client.id;
				}

                console.log('$scope.client===',$scope.client);
               //return;
				clientService.saveItem(angular.copy($scope.client), $scope).then(function(data) {
                    alert("保存模版成功");
                    //$state.go('site.oms.client.target');
					$scope.itemCtrl.back();
				}, function(error) {
					alert(error.data.message);
					$scope.submitStatus = false;
					$scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
				});
			};

            $scope.route();

            //基本信息下  设置应用弹出框
            clientEditCtrl.getApp = function(index) {

                $scope.objModel[index].data.id = $scope.client.appId;

                var ngdialog = ngDialog.open($scope.objModel[index]);

                ngdialog.closePromise.then(function(data) {


                    if (typeof data.value == "undefined" || data.value == "$document" || data.value == "$closeButton" || data.value == 0) {
                        return;
                    }
                    $scope.client.appNames = [];
                    $scope.client.appId = [];

                    if (typeof $scope.apps != "undefined") {
                        $scope.client.appId = angular.copy($scope.apps.appid);
                        $scope.client.appNames = angular.copy($scope.apps.appName);
                    }

                    angular.forEach(data.value, function(e, vl) {
                        if(typeof e.version!='undefined'){

                            $scope.client.appId.push(e.id);
                            $scope.client.appNames.push(e.appKeyName+ ' ' + e.name + e.version);
                        }

                    });
                });
            };

            //模版设置下  数据列表弹出框
            clientEditCtrl.changeItem = function(dialogIndex, moduleIndex) {
                console.log('dialogIndex, moduleIndex',dialogIndex, moduleIndex,$scope.modules[moduleIndex].data.attr)

                var idArry = [];
                angular.forEach($scope.modules[moduleIndex].data.attr, function(obj) {
                    idArry.push(parseInt(obj.modelId));
                });


				$scope.objModel[dialogIndex].data.id = idArry;

                console.log('$scope.objModel[dialogIndex].data',$scope.objModel[dialogIndex].data)
                var ngdialog = ngDialog.open($scope.objModel[dialogIndex]);
                //模态框关闭
                ngdialog.closePromise.then(function(data) {


                    console.info('close data.......',data);


					//如果是点击的 X 或者取消 不操作数据
					if (data.value == "$document" || data.value == "$closeButton" || data.value== 0) {
						return;
					}
                    data.value.map(function(a){
                        if(typeof a.name == 'undefined'){
                            data.value.splice(data.value.indexOf(a),1);
                            console.info('data.value a',a);
                        }
                    });
					var ids = [];
					var appSource = angular.copy($scope.modules[moduleIndex].data.attr);
					var arryId = [];


                    angular.forEach($scope.modules[moduleIndex].data.attr, function(obj, i) {
                        ids[i] = parseInt(obj.modelId);
                        //dataObj[obj.modelId] = obj;
                    });


                    for (var key in data.value) {


                        var word = data.value[key];

                        if (ids.indexOf(word.id) > -1) {

                            //appSource.push(angular.copy(dataObj[word]));

                        } else {
                            var appObj = data.value[key];
                            arryId.push(key);

							var obj = {
								modelId: appObj.id,
								name: appObj.name,
								imgUrl: appObj.imgUrl,
                                intro: appObj.intro,
                                recomm: appObj.recomm,
                                sortVideo:0
							};
							appSource.unshift(obj);
						}
					}

                    $scope.modules[moduleIndex].data.arry = angular.copy(arryId);
                    $scope.modules[moduleIndex].data.attr = angular.copy(appSource);


                    //error
                    // $scope.modules[moduleIndex].data.attr = [];
                    // $scope.modules[moduleIndex].data.arry = [];
                    // angular.forEach(data.value, function(e, vl) {
                    //     var obj = {
                    //         modelId: e.id,
                    //         name: e.name,
                    //         imgUrl: e.imgUrl
                    //     };

                    //     if ($scope.modules[moduleIndex].data.arry.indexOf(e.id) == -1) {
                    //         $scope.modules[moduleIndex].data.arry.push(e.id);
                    //         $scope.modules[moduleIndex].data.attr.push(obj);
                    //     }
                    // });
                });
            };

            console.info('modules=====-----',$scope.modules);
            $scope.$watch("modules", function(value) {
                console.log("modules: " + value.map(function(e) {
                    return e.modelId
                }).join(','));
            }, true);
        }
    ]);

    // directive for a single list
    angularAMD.directive('dndList', function($parse) {

        return function(scope, element, attrs) {
            // variables used for dnd
            var toUpdate;
            var startIndex = -1;

            scope.$watch(attrs.dndList, function(value) {
                toUpdate = value;
            }, true);

            // use jquery to make the element sortable (dnd). This is called
            // when the element is rendered
            $(element[0]).sortable({
                items: 'li',
                start: function(event, ui) {
                    // on start we define where the item is dragged from
                    startIndex = ($(ui.item).index());
                },
                stop: function(event, ui) {
                    // on stop we determine the new index of the
                    // item and store it there
                    var newIndex = ($(ui.item).index());
                    var toMove = toUpdate[startIndex];
                    toUpdate.splice(startIndex, 1);
                    toUpdate.splice(newIndex, 0, toMove);

                    // we move items in the array, if we want
                    // to trigger an update in angular use $apply()
                    // since we're outside angulars lifecycle
                    scope.$apply(attrs.dndList);
                },
                axis: 'y'
            })
        }
    });



    // directive for dnd between lists
    angularAMD.directive('dndBetweenList', function($parse) {

        return function(scope, element, attrs) {

            // contains the args for this component
            var args = attrs.dndBetweenList.split(',');
            // contains the args for the target
            var targetArgs = $('#' + args[1]).attr('dnd-between-list').split(',');

            // variables used for dnd
            var toUpdate;
            var target;
            var startIndex = -1;

            // watch the model, so we always know what element
            // is at a specific position
            scope.$watch(args[0], function(value) {
                toUpdate = value;
            }, true);

            // also watch for changes in the target list
            scope.$watch(targetArgs[0], function(value) {
                target = value;
            }, true);

            // use jquery to make the element sortable (dnd). This is called
            // when the element is rendered
            $(element[0]).sortable({
                items: 'li',
                start: function(event, ui) {
                    // on start we define where the item is dragged from
                    startIndex = ($(ui.item).index());
                },
                stop: function(event, ui) {
                    var newParent = ui.item[0].parentNode.id;

                    // on stop we determine the new index of the
                    // item and store it there
                    var newIndex = ($(ui.item).index());
                    var toMove = toUpdate[startIndex];

                    // we need to remove him from the configured model
                    toUpdate.splice(startIndex, 1);

                    if (newParent == args[1]) {
                        // and add it to the linked list
                        target.splice(newIndex, 0, toMove);
                    } else {
                        toUpdate.splice(newIndex, 0, toMove);
                    }

                    // we move items in the array, if we want
                    // to trigger an update in angular use $apply()
                    // since we're outside angulars lifecycle
                    scope.$apply(targetArgs[0]);
                    scope.$apply(args[0]);
                },
                connectWith: '#' + args[1]
            })
        }
    });

    // directive for a single list
    angularAMD.directive('divList', function($parse) {

        return function(scope, element, attrs) {
            // variables used for dnd
            var toUpdate;
            var startIndex = -1;

            scope.$watch(attrs.dndList, function(value) {
                toUpdate = value;
            }, true);

            // use jquery to make the element sortable (dnd). This is called
            // when the element is rendered
            $(element[0]).sortable({
                items: 'div',
                start: function(event, ui) {
                    // on start we define where the item is dragged from
                    startIndex = ($(ui.item).index());
                },
                stop: function(event, ui) {
                    // on stop we determine the new index of the
                    // item and store it there
                    var newIndex = ($(ui.item).index());
                    var toMove = toUpdate[startIndex];
                    toUpdate.splice(startIndex, 1);
                    toUpdate.splice(newIndex, 0, toMove);

                    // we move items in the array, if we want
                    // to trigger an update in angular use $apply()
                    // since we're outside angulars lifecycle
                    scope.$apply(attrs.dndList);
                },
                axis: 'y'
            })
        }
    });


    // directive for dnd between lists
    angularAMD.directive('divBetweenList', function($parse) {

        return function(scope, element, attrs) {

            // contains the args for this component
            var args = attrs.dndBetweenList.split(',');
            // contains the args for the target
            var targetArgs = $('#' + args[1]).attr('dnd-between-list').split(',');

            // variables used for dnd
            var toUpdate;
            var target;
            var startIndex = -1;

            // watch the model, so we always know what element
            // is at a specific position
            scope.$watch(args[0], function(value) {
                toUpdate = value;
            }, true);

            // also watch for changes in the target list
            scope.$watch(targetArgs[0], function(value) {
                target = value;
            }, true);

            // use jquery to make the element sortable (dnd). This is called
            // when the element is rendered
            $(element[0]).sortable({
                items: 'div',
                start: function(event, ui) {
                    // on start we define where the item is dragged from
                    startIndex = ($(ui.item).index());
                },
                stop: function(event, ui) {
                    var newParent = ui.item[0].parentNode.id;

                    // on stop we determine the new index of the
                    // item and store it there
                    var newIndex = ($(ui.item).index());
                    var toMove = toUpdate[startIndex];

                    // we need to remove him from the configured model
                    toUpdate.splice(startIndex, 1);

                    if (newParent == args[1]) {
                        // and add it to the linked list
                        target.splice(newIndex, 0, toMove);
                    } else {
                        toUpdate.splice(newIndex, 0, toMove);
                    }

                    // we move items in the array, if we want
                    // to trigger an update in angular use $apply()
                    // since we're outside angulars lifecycle
                    scope.$apply(targetArgs[0]);
                    scope.$apply(args[0]);
                },
                connectWith: '#' + args[1]
            })
        }
    });



});
