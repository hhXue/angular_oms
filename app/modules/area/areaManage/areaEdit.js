define(["angularAMD","modules/area/areaManage/service"],function(angularAMD){"use strict";angularAMD.controller("AreaEditCtrl",["$scope","AreaService","ngDialog","$controller","$stateParams","$state","APP_CONFIG",function($scope,AreaService,ngDialog,$controller,$stateParams,$state,config){var areaEdit=$scope.areaEdit={};$scope.area={};$scope.errorMessage="",$controller("BaseCtrl",{$scope:$scope}),AreaService.setHttpBaseUrl(config.areaUrl),AreaService.getCountry().then(function(resp){$scope.country=resp.data.rows,$scope.areaList=resp.data.rows,$stateParams.areaId&&AreaService.getRelatArea($stateParams.areaId).then(function(resp){$scope.area=resp.data,angular.forEach($scope.country,function(i){resp.data.maps[1]&&resp.data.maps[1].indexOf(i.countryId)>-1&&$scope.chooseAreas.push({countryId:i.countryId,countryName:i.countryName})})},function(error){})},function(error){}),$scope.chooseAreas=[],areaEdit.addAreas=function(areaL){var npmBox=[];angular.forEach($scope.chooseAreas,function(o){npmBox.push(o.countryId)}),-1==npmBox.indexOf(areaL.countryId)?$scope.chooseAreas.push(areaL):alert("此地域已被选中，请勿重复选择！")},areaEdit.cancelArea=function(chooseArea){$scope.chooseAreas.splice($scope.chooseAreas.indexOf(chooseArea),1)},areaEdit.checkCloseDialog=function(){$scope.errorMessage="",$scope.submitted=!0,$scope.area.maps={};var npmMap=[];$scope.chooseAreas.length>0&&($.each($scope.chooseAreas,function(a,m){npmMap.push(m.countryId)}),$scope.area.maps[1]=npmMap),$scope.myform.$valid&&($scope.itemService=AreaService.setName("area"),AreaService.saveItem($scope.area,$scope).then(function(data){$state.go("site.area.area.area"),$scope.submitStatus=!1},function(error){$scope.submitStatus=!1,$scope.errorMessage="code "+error.data.code+":"+error.data.message}))},areaEdit.closeThisDialog=function(){$state.go("site.area.area.area")}}])});