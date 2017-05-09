define([
    'angularAMD',
    'Session'
], function(angularAMD, Session) {

    'use strict';

    angularAMD.config(['$stateProvider', '$starSessionProvider', '$futureStateProvider',
        function($stateProvider, $starSessionProvider, $futureStateProvider, $scope) {

            var session = $starSessionProvider.getSession();
            console.log('session jieshao====',session);

            function loadCtrl($q, deps) {
                console.info('load deps==', deps);
                var d = $q.defer();
                require(deps, function() {
                    d.resolve();
                });
                return d.promise;
            }
            var stateFactory = {
                "site.active_pho": {
                    name: 'site.active_pho',
                    url: '/active_pho',
                    views: {
                        "topnav": {
                            templateUrl: "public/layout/topnav.html",
                            controller: "TopnavCtrl"
                        },
                        "leftnav": {
                            templateUrl: "modules/active_pho/pics.html",
                            controller: "JieshaoCtrl"
                        }
                    },
                    data: {
                        authorizedRoles: [session.userRole]
                    }
                }
                //"site.active_pho.jieshao": {
                //    name: 'site.active_pho.pics',
                //    url: '/pics',
                //    views: {
                //        "content@site": {
                //            templateUrl: "modules/active_pho/pics.html",
                //            controller: "ActivePhoCtrl"
                //        }
                //    },
                //    resolve: {
                //        "loadCtrl": function($q) {
                //            return loadCtrl($q, ['modules/active_pho/pics']);
                //        }
                //    }
                //}
                //------



            };

            function setStates(objs) {
                angular.forEach(objs, function(obj) {
                    if ('undefined' !== typeof stateFactory['site.' + obj.name]) {
                        var _state = stateFactory['site.' + obj.name];
                        if ('undefined' !== typeof obj.methods && obj.methods.length > 0) {
                            angular.forEach(obj.methods, function(_m) {
                                if (typeof _state.data === 'undefined') {
                                    _state.data = {}
                                }
                                if (typeof _state.data.methods === 'undefined') {
                                    _state.data.methods = {};
                                }
                                _state.data.methods[_m.name] = _m;
                            });
                        }
                        console.info('load jieshao---,_state', obj.name,_state);
                        $stateProvider.state(_state);
                        if ('undefined' !== typeof obj.modules && obj.modules.length > 0) {
                            setStates(obj.modules);
                        }
                        if ('undefined' !== typeof obj.controllers && obj.controllers.length > 0) {
                            setStates(obj.controllers);
                        }
                    }
                });
            }
            setStates(session.systems);


        }
    ]);

});
