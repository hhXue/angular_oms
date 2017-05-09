
define([
    'angular',
    'angularAMD'
], function(angular, angularAMD) {
    'use strict';

    angularAMD.constant('AUTH_EVENTS', {
        loginSuccess: 'auth-login-success',
        loginFailed: 'auth-login-failed',
        logout: 'auth-logout',
        sessionTimeout: 'auth-session-timeout',
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized'
    });

    angularAMD.constant('USER_ROLES', {
        all: '*',
        admin: 'admin',
        editor: 'editor',
        user: 'user',
        guest: 'guest'
    });
    angularAMD.constant("APP_CONFIG", {

        httpBaseUrl: 'http://api.oms.com/admin',
        serverUrl:'http://api.oms.com/server',
        areaUrl:'http://area.oms.com/admin',
        sourceUrl:'http://lsms.oms.com/admin',
        sourceServeUrl:'http://lsms.oms.com/server',
        cvaBaseUrl:'http://cva.oms.com/admin',
        epgBaseUrl: 'http://epg.oms.com/admin',
        pushBaseUrl:'http://push.oms.com/admin',
        imgBaseUrl: 'http://img.oms.com',
        rootDomain: 'oms.com'

    });


});