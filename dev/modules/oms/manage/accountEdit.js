define([
   'angularAMD',
   'modules/oms/manage/service'
], function(angularAMD) {
  'use strict';

  angularAMD.controller('accountEditCtrl', function($scope, $controller, manageService) {

    var accountEditCtrl = $scope.accountEditCtrl = {};

    var submitted = false;
    var account;

    //extend from BaseCtrl
    $controller('BaseCtrl', {
      $scope: $scope
    });


    $scope.itemService = manageService.setName('user');

    $scope.errorMessage = '';
    $scope.title = $scope.ngDialogData.title;

    accountEditCtrl.init = function() {

      $scope.account = $scope.ngDialogData.item;
      //用户名检查唯一
      $scope.userNameChecked = "ok";

      account = angular.copy($scope.account);

      //获取权限列表
      manageService.getRoleForLogin().then(function(e) {
        $scope.roles = e.data;
        if (typeof $scope.account.id == "undefined") {
          $scope.account = {};
          $scope.userRole = $scope.roles[0];
        } else {

          manageService.getUserById($scope.account.id).then(function(e) {
            $scope.account = e.data;
            $scope.account.id = $scope.account.userId;
            $scope.account.userPassword = '';
          })

          angular.forEach($scope.roles, function(val, e) {
            if (val.roleId == $scope.account.roleId) {
              $scope.userRole = $scope.roles[e];
            }
          })
        }
      }, function(error) {

      })
    }

    accountEditCtrl.isEmail = function(form) {
      var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!reg.test(form.userEmail.$viewValue)) {
        form.$error.emailError = true;
      } else {
        delete form.$error.emailError;
      }

    }

    //验证手机号
    accountEditCtrl.ckPhone = function(form) {
      if (!(/^1[3|4|5|8][0-9]\d{8,8}$/.test(form.userTelephone.$viewValue))) {
        $scope.phoneFormt = true;
        form.$error.phomeError = true;
      } else {
        delete $scope.phoneFormt;
        delete form.$error.phomeError;
      }
    }

    //保存用户
    accountEditCtrl.checkCloseDialog = function() {

      $scope.errorMessage = '';
      $scope.submitted = true;

      if (manageService.isEmptyObject($scope.myform.$error) && $scope.userNameChecked == "ok") {
        if ($scope.account.userPassword == '') {
          delete $scope.account.userPassword;
        }

        $scope.account.roleId = angular.copy($scope.userRole.roleId);

        manageService.saveItem($scope.account, $scope).then(function(data) {
          $scope.submitStatus = false;
          $scope.closeThisDialog(data);
        }, function(error) {
          $scope.submitStatus = false;
          $scope.errorMessage = 'code ' + error.data.code + ':' + error.data.message;
        });
      }
    };

    //账号名唯一
    accountEditCtrl.checkUserName = function(username) {

      if (account.userName == username && username != "" && typeof username != "undefined") {
        $scope.userNameChecked = "ok";
        return;
      }
      if (typeof username == "undefined") {
        return;
      }

      manageService.checkExist({
        userName: username,
        userPersonName: ""
      }).then(function(data) {
        console.log('data', data);
        $scope.userNameChecked = "no";

      }, function(reason) {
        $scope.userNameChecked = "ok";
        console.log('reason', reason);
      });
    };

    accountEditCtrl.init();

  });



});
