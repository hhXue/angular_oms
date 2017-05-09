define([
    'angularAMD',
    'modules/oms/basic/service',
], function(angularAMD) {
    'use strict';

    angularAMD.controller('TagEditCtrl', function($scope, BasicsService) {
        var tagEditCtrl = $scope.tagEditCtrl = {};

        $scope.submitted = false;

        $scope.errorMessage = '';
        console.log('$scope.ngDialogData', $scope.ngDialogData);

        $scope.title = $scope.ngDialogData.title;
        var tag = $scope.tag = $scope.ngDialogData.item;

        if (tag.id == null) {
            $scope.ngDialogData.item = {};
        }

        tagEditCtrl.init = function() {
            $scope.options = [{
                id: 1,
                tagName: "频道标签"
            }, {
                id: 2,
                tagName: "栏目标签"
            }, {
                id: 3,
                tagName: "节目标签"
            }];

            if (typeof $scope.ngDialogData.item.id != "undefined") {
                $scope.tag.tagType = $scope.options[$scope.tag.tagType - 1];
            } else {
                $scope.tag.tagType = $scope.options[0];
            }
        };

        tagEditCtrl.checkCloseDialog = function() {
            $scope.errorMessage = '';
            $scope.submitted = true;

            if (!BasicsService.isEmptyObject($scope.myform.$error)) {
                return;
            }

            $scope.tag.tagType = $scope.tag.tagType.id;
            $scope.tag.pid = $scope.tag.pid.id;

            if (typeof $scope.tag.pid == "undefined") {
                $scope.tag.pid = 0;
            }

            tag = angular.copy($scope.tag);

            BasicsService.saveItem(tag , $scope).then(function(data) {
                $scope.closeThisDialog(data);
                $scope.submitStatus = false;
            }, function(error) {
                $scope.submitStatus = false;
                $scope.errorMessage = error;
            });
        };

        //when add tag get pName
        tagEditCtrl.getParentTags = function() {

            BasicsService.getParentTags().then(function(resp) {

                $scope.parentTags = resp.data.data;

                if (typeof $scope.tag.id == "undefined" || $scope.tag.id == null || $scope.tag.id == "") {
                    $scope.tag.pid = $scope.parentTags[0];
                } else {

                    angular.forEach($scope.parentTags, function(obj, i) {
                        if (obj.id == $scope.tag.pid) {
                            $scope.tag.pid = $scope.parentTags[i];
                        }
                    });
                }
            }, function(error) {

            })
        };
        tagEditCtrl.getParentTags();
        //choose pid
        $scope.is_first_level_tag = false;
        tagEditCtrl.setTagPidValue = function(el) {

            if ($scope.is_first_level_tag) {
                $scope.is_first_level_tag = false;

            } else {
                $scope.is_first_level_tag = true;
                $scope.tag.pid = 0;
            }
        }

        tagEditCtrl.init();

    });

});
