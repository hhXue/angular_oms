
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

        httpBaseUrl: 'http://omsweb.starschina.com/admin',
        serverUrl:'http://omsweb.starschina.com/server',
        areaUrl:'http://area.starschina.com/admin',//地域
        sourceUrl:'http://lsms.starschina.com/admin',
        sourceServeUrl:'http://lsms.starschina.com/server',
        cvaBaseUrl:'http://cva.starschina.com/admin',
        epgBaseUrl: 'http://epgweb.starschina.com/admin',
        pushBaseUrl:'http://push.starschina.com/admin',
        imgBaseUrl: 'http://imgadmin.starschina.com',
        rootDomain: 'starschina.com'
        
            /*test.epg.starschina.com  epg系统
        test.oms.starschina.com 前端web管理
        test.omsapi.starschina.com 后端api
        test.img.starschina.com 图片系统
        */

    });


});