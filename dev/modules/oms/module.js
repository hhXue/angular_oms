define([
    'angular',
    'angularAMD',
    'Session',
    'uiRouterExtras',
    'utils',
    'dirPagination',
    'angularUiSelect',
    'modules/oms/states',
    'appVersionSelect'
], function(angular, angularAMD, Session) {
    'use strict';

    var oms = angular.module('oms', ['star.session', 'ui.router', 'ngDialog', 'ct-ui-router-extras', 'stars.utils', 'dirPagination', 'ui.select']);
    oms.filter('propsFilter', function() {
        return function(items, props) {
            var out = [];
            if (angular.isArray(items)) {
                items.forEach(function(item) {
                    var itemMatches = false;

                    var keys = Object.keys(props);
                    for (var i = 0; i < keys.length; i++) {
                        var prop = keys[i];
                        var text = props[prop].toLowerCase();
                        if (item[prop].toString().toLowerCase().indexOf(text) !== -1) {
                            itemMatches = true;
                            break;
                        }
                    }

                    if (itemMatches) {
                        out.push(item);
                    }
                });
            } else {
                // Let the output be the input untouched
                out = items;
            }

            return out;
        };
    });
    return oms;

});
