define([
    'angularAMD',
    'modules/oms/manage/service',
    'utils',
    'Session'
], function(angularAMD) {
  'use strict';
  angularAMD.controller('AccountCtrl', ['$scope', 'ngDialog', 'usSpinnerService', 'StarsUtils', 'Session', '$state', '$controller', 'manageService',
    function($scope, ngDialog, usSpinnerService, StarsUtils, Session, $state, $controller, manageService) {


      $scope.fallback = function(copy) {
        window.prompt('Press cmd+c to copy the text below.', copy);
      };
      $scope.showMessage = function() {
        console.log("clip-click works!");
      };

      //permission control fixed to methods
      $scope.methods = $state.current.data.methods;

      //set data config
      $scope.dataConfig = {
        edit: {
          template: 'modules/oms/manage/accountEdit.html',
          data: {
            title: "修改账号"
          },
          controller: 'accountEditCtrl'
        },
        create: {
          template: 'modules/oms/manage/accountEdit.html',
          data: {
            title: "新增账号",
            item: {}
          },
          controller: 'accountEditCtrl'
        }
      };
      //extend from BaseCtrl
      $controller('BaseCtrl', {
        $scope: $scope
      });

      //set item service
      $scope.itemService = manageService.setName('user');

      $scope.init = function() {

        $scope.getResultsPage($scope.currentPage);

        //获取权限列表
        manageService.getRoleForLogin().then(function(e) {
          $scope.roles = e.data;

        }, function(error) {

        })
      }

      if (typeof $scope.methods.index.name != 'undefined') {
        $scope.init();
      }
      $scope.route();
    }
  ]);

});
