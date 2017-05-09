define([
    'angularAMD',
    'ngDialog'
],function(angularAMD,ngDialog){
    'use strict';

    var module = angular.module('stars.utils',['ngDialog']);
    module.service('StarsUtils',['ngDialog',function(ngDialog){

        function showConfirm(msg,text_ok,text_cancel){

            var confirmDialog = ngDialog.openConfirm({
                template:'\
                <p>{{msg}}</p>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">{{text_cancel}}</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">{{text_ok}}</button>\
                </div>',
                plain: true,
                controller: function($scope){
                    $scope.msg = msg;
                    $scope.text_ok = text_ok || '确定';
                    $scope.text_cancel = text_cancel || '取消';
                }
            });
            return confirmDialog;
        }

        function showAlert(msg){
            return ngDialog.open({
                template: '\
                <p>{{msg}}</p>\
                <div class="ngdialog-buttons text-center">\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="closeThisDialog(0)">确定</button>\
                </div>',
                plain: true,
                controller: function($scope){
                    $scope.msg = msg;
                }
            });
        }

        //capitalize the first letter of a word
        function capitalizeFirst(str){
            return str.charAt(0).toUpperCase() + str.substring(1);
        }

        return {
            confirm: showConfirm,
            alert: showAlert,
            capitalizeFirst: capitalizeFirst
        };


    }]);




})