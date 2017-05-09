define(["angularAMD","modules/vodSource/transcode/service","Session"],function(angularAMD){"use strict";angularAMD.controller("TransCodeCtrl",["$scope","TransService","Session","$controller","$state","ngDialog","StarsUtils","APP_CONFIG",function($scope,TransService,Session,$controller,$state,ngDialog,StarsUtils,config){$scope.methods=$state.current.data.methods,$scope.$state=$state,$controller("BaseCtrl",{$scope:$scope}),$scope.itemService=TransService.setName("transcode").setHttpBaseUrl(config.cvaBaseUrl),$scope.typeStatus={0:{uploadStatus:"等待上传",transStatus:""},10:{uploadStatus:"正在上传",transStatus:""},11:{uploadStatus:"上传成功",transStatus:"正在转码"},12:{uploadStatus:"上传失败",transStatus:""},20:{uploadStatus:"上传成功",transStatus:"等待转码"},21:{uploadStatus:"上传成功",transStatus:"正在转码"},22:{uploadStatus:"上传成功",transStatus:"转码成功"},23:{uploadStatus:"上传成功",transStatus:"转码失败"}},$scope.itemCtrl.search=function(){$scope.searchParams.status=angular.copy($scope.searchParams.uploadStatus),$scope.searchParams.status=angular.copy($scope.searchParams.transStatus),$scope.getResultsPage(1,$scope.searchParams)},"undefined"!=typeof $scope.methods.index.name&&$scope.getResultsPage($scope.currentPage),$scope.itemCtrl.search=function(){$scope.searchParams.uploadTime=Math.floor(Date.parse($scope.searchParams.uploadTimes)/1e3),$scope.searchParams.transEndtime=Math.floor(Date.parse($scope.searchParams.transEndtimes)/1e3),$scope.getResultsPage(1,$scope.searchParams)};var transCodeCtrl=$scope.transCodeCtrl={};transCodeCtrl.reUpload=function(item){TransService.reUpload(item.id).then(function(data){item.uploadStatus=data.data.status,$scope.getResultsPage($scope.currentPage)},function(error){})},transCodeCtrl.reTranscode=function(item){TransService.reTranscode(item.id).then(function(data){item.transStatus=data.data.status,$scope.getResultsPage($scope.currentPage)},function(error){})},transCodeCtrl.openVideo=function(url){ngDialog.open({template:"modules/vodSource/transcode/showVideo.html",data:{title:"视频",location:url},controller:"ShowVideoCtrl"})}}])});