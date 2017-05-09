define([
    'angularAMD'
], function(angularAMD) {
    'use strict';

    angularAMD.controller('CategoryEditCtrl', function($scope, BasicsService) {
        var categoryEditCtrl = $scope.categoryEditCtrl = {};
        var submitted = false;
        $scope.errorMessage = '';
        $scope.title = $scope.ngDialogData.title;
        var category = $scope.category = $scope.ngDialogData.item;

        console.log(category);

        if (category.id == null) {
            $scope.ngDialogData.item = {};
        }

        category.categoryType = 2;

        categoryEditCtrl.checkCloseDialog = function() {
            $scope.errorMessage = '';
            submitted = true;
            BasicsService.saveItem(category, $scope).then(function(data) {
                $scope.submitStatus = false;
                $scope.closeThisDialog(data);
            }, function(error) {
                $scope.submitStatus = false;
                $scope.errorMessage = error;
            });
        };
    });

});
