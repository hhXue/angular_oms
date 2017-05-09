 /**
 * loads sub modules and wraps them up into the main module.
 * This should be used for top-level module definitions only.
 */
define([
    'angular',
    'angularAMD',
    'angularChinese',
    'AuthService',
    'angularUiRouter',
    'uiRouterExtras',
    'Session',
    'ngDialog',
    'spin',
    'angularSpinner',
    'ngAnimate',
    'angularStrap',
    'angularStrapTpl',
    'utils',
    'directives',

    'dirPagination',
    'BaseCtrl',
    'angularSanitize',
    'angularUiSelect',
    'jquery',
    'ZeroClipboard',
    'ngClip',
    'ngfil',
    'base64',
    //
    'videogular',
    'vgControls',
    'vgOverlayPlay',
    'vgPoster',
    'vgBuffering',

    'vgImaAds',
    //m3u8
    'ie10ViewportBugWorkaround',
     'videoDev',
     'videojsMediaSources',
     'videojsHls',
    //test
    'swfobject',
    'ivhTreeview'
], function(angular, angularAMD) {
    'use strict';

    var app = angular.module('app', [
        'stars.session',
        'stars.utils',
        'ui.router',
        'ct.ui.router.extras',
        'ngDialog',
        'angularSpinner',
        'mgcrea.ngStrap',
        'stars.utils.dirPagination',
        'ngSanitize',
        'ui.select',
        'ngClipboard',
        //
        "ngSanitize",
        "com.2fdevs.videogular",
        "com.2fdevs.videogular.plugins.controls",
        "com.2fdevs.videogular.plugins.overlayplay",
        "com.2fdevs.videogular.plugins.poster",
        "com.2fdevs.videogular.plugins.imaads",
        "ivh.treeview"
        //m3u8
        //'ie10ViewportBugWorkaround',
        //'videoDev',
        //'videojsMediaSources',
        //'videojsHls'
        //test
        //'swfobject'
    ]);


    app.config(appConfig)
        .run(appRun);

    appConfig.$inject = ['$urlRouterProvider', '$stateProvider', 'USER_ROLES', '$httpProvider', 'paginationTemplateProvider', 'ngClipProvider'];


    function appConfig($urlRouterProvider, $stateProvider, USER_ROLES, $httpProvider, paginationTemplateProvider, ngClipProvider) {


        ngClipProvider.setPath("libs/ZeroClipboard.swf");

        paginationTemplateProvider.setPath('utils/pagination/pagination.tpl.html');

        //http cross doman
        $httpProvider.defaults.useXDomain = true;
        //$httpProvider.defaults.headers.Authorization = 'Basic fdfwoeigjiewoe';
        $httpProvider.defaults.headers['Content-Type'] = 'application/json';

        delete $httpProvider.defaults.headers.common['X-Requested-With'];


        //default route
        $urlRouterProvider.otherwise('/login');

        // Public routes
        $stateProvider
            .state('public', {
                abstract: true,
                template: "<ui-view/>",
                data: {
                    authorizedRoles: [USER_ROLES.all]
                }
            })
            .state('public.404', {
                url: '/404/',
                templateUrl: 'public/404.html'
            })
            .state('public.accessdenied', {
                url: '/accessdenied',
                templateUrl: "public/accessdenied.html"
            })
            .state('public.login', {
                url: '/login',
                templateUrl: 'public/login/login.html',
                controller: 'LoginCtrl' 
            })
            //.state('public.logout', {
            //    url: '/logout',
            //    templateUrl: 'public/login/login.html',
            //    controller: 'LoginCtrl'
            //})
            //.state('public.register', {
            //    url: '/register',
            //    templateUrl: 'register',
            //    controller: 'RegisterCtrl'
            //});

        $stateProvider.state('site', {
            abstract: true,
            views: {
                "": {
                    templateUrl: "public/layout/layout.html"
                }
            },
            data: {
                authorizedRoles: []
            }

        });
        //        $urlRouterProvider.deferIntercept();
    }

    appRun.$inject = ['$rootScope', '$state', '$stateParams', 'AUTH_EVENTS', 'AuthService', 'Session', '$q'];

    function appRun($rootScope, $state, $stateParams, AUTH_EVENTS, AuthService, Session, $q) {


        sessionStorage.getItem('currentUser');

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function() {
            console.log('notauthenticated');
            $state.go('public.login');
        });


        $rootScope.$on(AUTH_EVENTS.notAuthorized, function() {
            if (sessionStorage.getItem('currentUser') == null) {
                $state.go('public.accessdenied');
            }
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, function() {

            console.log('login success stateProvider', Session);
            var loadStates = function($q, Session) {

                var promises = [];

                angular.forEach(Session.systems, function(sys, idx) {
                    console.info('loadStates systems===', sys.name);

                    //set default state
                    if (idx == 0) {
                        var _module = sys.modules[0];
                        if (angular.isDefined(_module.methods) && _module.methods.length > 0) {
                            Session.defaultState = 'site.' + _module.name;
                        } else {
                            Session.defaultState = 'site.' + _module.controllers[0].name;
                        }
                    }

                    var d = $q.defer();
                    require(['ngload', 'angularAMD', "ngload!modules/" + sys.name + "/module"],
                        function ngloadCallback(ngload, angularAMD, result) {

                            angularAMD.processQueue();
                            d.resolve(undefined);

                            return d.promise;
                        });

                    promises.push(d.promise);

                });

                return $q.all(promises);
            }

            var result = loadStates($q, Session);

            result.then(function() {
                console.log('login success; site.oms=', $state.get('site.oms'),Session, 'sessiong.defaultstate=');
                console.log('login success; Session.lastState===', Session.lastState);
                console.log('login success; Session.defaultState===', Session.defaultState);

                if (typeof Session.lastState != 'undefined')
                    $state.go(Session.lastState);
                else {
                    $state.go(Session.defaultState);
                }

            }, function() {
                console.log('login error states===', $state.get());
                $state.go('public.login');
            });

        });

        $rootScope.$on(AUTH_EVENTS.logout, function() {
            sessionStorage.removeItem('currentUser');

            Session.destroy();
            console.log('event logout', Session);
            //刷新页面
            window.location.reload();
        })

        //debug ui-router lifecycle
        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('$stateChangeStart to ' + toState.name + '- fired when the transition begins. toState,toParams : \n', toState, fromState);

            var authorizedRoles = toState.data ? toState.data.authorizedRoles : [];
            // console.info('run event authorizedRoles', authorizedRoles);
            if (!AuthService.isAuthorized(authorizedRoles)) {
                event.preventDefault();
                // console.info('isAuthenticated',AuthService.isAuthenticated());
                if (AuthService.isAuthenticated()) {
                    // user is not allowed
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
                } else {
                    // user is not logged in
                    // $state.go('public.login');
                    $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
                }
            }

        });

        $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams) {
            console.info('$stateChangeError', arguments);
        });
        $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
            console.info('fromState.name===========',fromState,toState,toParams,fromParams)
            if (toState.name != 'public.login') {

                Session.lastState = toState.name;

                if (toState.name != fromState.name && fromState.name != 'public.login') {
                    Session.backUrl = fromState.name;
                }
                for (var key in $stateParams) {
                    angular.forEach(Session.lastParams, function(e, vl) {
                        for (var savekey in e) {
                            if (key == savekey) {

                                console.log(key, savekey, toParams);
                                if (e[savekey] != "") {
                                    if (toParams[key] == "") {
                                        toParams[key] = e[savekey];
                                        $stateParams[key] = e[savekey];
                                    }


                                }

                            }
                        };
                    })
                };
                var str = JSON.stringify(Session);
                sessionStorage.setItem('currentUser', str);
            }
            console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
        });

        $rootScope.$on('$viewContentLoaded', function(event) {
            //        console.log('$viewContentLoaded - fired after dom rendered',event);
        });
        $rootScope.$on('$stateNotFound', function(event, unfoundState, fromState, fromParams) {
            console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
            console.log(unfoundState, fromState, fromParams);
        });
        try {
            var sessionCookie = JSON.parse(sessionStorage.getItem('currentUser'));
        } catch (e) {
            alert(e);
        }

        if (typeof sessionCookie != 'undefined' && sessionCookie != null && typeof sessionCookie.userId != 'undefined' && typeof Session.userId == 'undefined') {
            Session.create(sessionCookie);
            $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
        }
    }
    return app;

});
