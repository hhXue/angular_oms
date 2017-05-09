define([
    'angular',
    'angularAMD',
    'app',
    'AuthService',
    'login',
    'applicationCtrl',
    'layout'

], function (angular, angularAMD, app) {
     'use strict';

    console.log('main app',app);

	angularAMD.bootstrap(app);
});