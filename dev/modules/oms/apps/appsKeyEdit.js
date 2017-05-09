define([
    'angularAMD',
    'modules/oms/apps/service'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('AppsKeyEditCtrl', function($scope, AppsService) {
        var appsKeyEditCtrl = $scope.appsKeyEditCtrl = {};

        var submitted = false;

        $scope.errorMessage = '';

        $scope.title = $scope.ngDialogData.title;
        var app = $scope.app = $scope.ngDialogData.item;
        $scope.packageAName = [];
        $scope.packageBName = [];
        console.log('$scope.ngDialogData',$scope.ngDialogData)

        if (typeof $scope.app == "undefined" ) {
            $scope.app = {};
        }

        if(angular.isUndefined(app)){
            //add
            AppsService.getAppKey().then(function(resp){
                $scope.app.appKey = resp.data.data.appKey;
            });

            $scope.app.status = 0;
            //add package name
            $scope.packageAName = [{
                name:''
            }];
            $scope.packageBName = [{
                name:''
            }];
        }else{
            //update package
            if(app.package!=='' && app.package!==null && typeof app.package!=='undefined'){
                var packageAll = JSON.parse(app.package);
                if(packageAll.Android){
                    var package_A = packageAll.Android;
                    for(var i=0;i< package_A.length; i++){
                        $scope.packageAName.push({
                            name:package_A[i]
                        })
                    }

                }else{
                    $scope.packageAName.push({
                        name:''
                    })
                }

                if(packageAll.IOS){
                    var package_I = packageAll.IOS;
                    for(var j=0;j< package_I.length; j++){
                        $scope.packageBName.push({
                            name:package_I[j]
                        })
                    }
                }else{
                    $scope.packageBName.push({
                        name:''
                    })
                }


            }else{
                $scope.packageAName.push({
                    name:''
                });
                $scope.packageBName.push({
                    name:''
                })
            }
        }

        //add package name
        appsKeyEditCtrl.addPackage = function(type){
            if(type==1){
                $scope.packageAName.push({
                    name:''
                })
            }else{
                $scope.packageBName.push({
                    name:''
                })
            }

        };

        //remove package name
        appsKeyEditCtrl.removePackage = function(index,type){
            if(type == 1){
                $scope.packageAName.splice(index,1)
            }else{
                $scope.packageBName.splice(index,1)
            }


        };

        //save
        appsKeyEditCtrl.checkCloseDialog = function(){

            $scope.errorMessage = '';
            submitted = true;

            if(angular.isUndefined(app)){
                delete $scope.app.appKey;
            }
            //组装包的数据格式
            var packageAName=[],packageBName = [];
            $scope.packageAName.map(function(li){
               if(li.name!==''){
                   packageAName.push(li.name);
               }
            });
            $scope.packageBName.map(function(li){
                if(li.name!==''){
                    packageBName.push(li.name);
                }
            });
            $scope.app.package = {
                Android:packageAName,
                IOS:packageBName
            };
            if(packageAName.length == 0){
                delete $scope.app.package.Android;
            }
            if(packageBName.length == 0){
                delete $scope.app.package.IOS;
            }

            console.info('app====',$scope.app);
            AppsService.saveItem($scope.app,$scope).then(function(data){

                $scope.submitStatus = false;
                $scope.closeThisDialog(data);

            },function(error){
                $scope.submitStatus = false;
                $scope.errorMessage = error;
            })
        };





    });

});
