define([
    'angularAMD',
    'Session'
], function(angularAMD, Session) {

    'use strict';

    angularAMD.config(['$stateProvider', '$starSessionProvider', '$futureStateProvider',
        function($stateProvider, $starSessionProvider, $futureStateProvider, $scope) {

            var session = $starSessionProvider.getSession();
            console.log('session====',session)

            function loadCtrl($q, deps) {
                console.info('load deps==', deps);
                var d = $q.defer();
                require(deps, function() {
                    d.resolve();
                });
                return d.promise;
            }
            var stateFactory = {
                "site.oms": {
                    name: 'site.oms',
                    url: '/oms',
                    views: {
                        "topnav": {
                            templateUrl: "public/layout/topnav.html",
                            controller: "TopnavCtrl"
                        },
                        "leftnav": {
                            templateUrl: "public/layout/leftnav.html",
                            controller: "LeftnavCtrl"
                        }
                    },
                    data: {
                        authorizedRoles: [session.userRole]
                    }
                },
                "site.oms.home": {
                    name: 'site.oms.home',
                    url: '/home',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/home/home.html",
                            controller: "HomeCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/home/home']);
                        }
                    }
                },

                "site.oms.home.homeindex": {
                    name: 'site.oms.home.homeindex',
                    url: '/home',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/home/home.html",
                            controller: "HomeCtrl"
                        }
                    },
                    data: {
                        display: false
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/home/home']);
                        }
                    }
                },
                //"site.oms.system": {
                //    name: "site.oms.system",
                //    url: "/system"
                //
                //},
                "site.oms.system.permissions": {
                    name: "site.oms.system.permissions",
                    url: "/permissions",
                    views: {
                        "leftna@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/manage/permission.html",
                            controller: "PermissionCtrl"
                        }
                    },
                    data: {
                        methods: {
                            index: {},
                            update: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/manage/permission', 'modules/oms/manage/permissionEdit']);
                        }
                    }
                },
                "site.oms.system.role": {
                    name: "site.oms.system.role",
                    url: "/role",
                    views: {
                        "leftnav@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/manage/role.html",
                            controller: "RoleCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/manage/role', 'modules/oms/manage/roleEdit', 'modules/oms/manage/service']);
                        }
                    }
                },
                "site.oms.system.permissionrole": {
                    name: "site.oms.system.permissionrole",
                    url: "/power/:roleId",
                    data: {
                        display: false
                    },
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/manage/power.html",
                            controller: "PowerCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/manage/power', 'modules/oms/manage/service']);
                        }
                    }
                },
                "site.oms.system.user": {
                    name: "site.oms.system.user",
                    url: "/account",
                    views: {
                        "leftnav@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/manage/account.html",
                            controller: "AccountCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/manage/account', 'modules/oms/manage/accountEdit', 'modules/oms/manage/service']);
                        }
                    }
                },
                "site.oms.apps": {
                    name: "site.oms.apps",

                    url: "/apps"
                },
                "site.oms.apps.apps": {
                    name: 'site.oms.apps.apps',
                    url: '/apps/:appsAppId/:titleName',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/apps/apps.html",
                            controller: "AppsCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        },
                        display:false
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/apps/apps', 'modules/oms/apps/appsEdit', 'modules/oms/apps/appOperation', 'modules/oms/apps/appsForceUpdate']);
                        }
                    }
                },
                "site.oms.apps.appkey":{
                    name:"site.oms.apps.appkey",
                    url:"/appkey",
                    views:{
                        "content@site":{
                            templateUrl:"modules/oms/apps/appsKey.html",
                            controller:"AppsKeyCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/apps/appsKey','modules/oms/apps/appsKeyEdit', 'modules/oms/apps/appShow']);
                        }
                    }
                },
                "site.oms.cps": {
                    name: "site.oms.cps",
                    url: "/cps"
                },
                "site.oms.cps.cps": {
                    name: 'site.oms.cps.cps',
                    url: '/cps',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/cps/cps.html",
                            controller: "CpsCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/cps/cps', 'modules/oms/cps/cpsEdit','modules/oms/content/channelOption']);
                        }
                    }
                },

                "site.oms.cps.cpvideo": {
                    name: 'site.oms.cps.cpvideo',
                    url: '/cpvideo/:cpId',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/cps/cpVideo.html",
                            controller: "CpsVideoCtrl"
                        }
                    },
                    data: {
                        display: false
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/cps/cpVideo', 'modules/oms/cps/cpVideoEdit']);
                        }
                    }
                },


                //xue content/EPG
                "site.oms.contents": {
                    name: "site.oms.contents",
                    url: "/contents"
                },
                "site.oms.epg": {
                    name: "site.oms.epg",
                    url: "/epg"
                },
                "site.oms.epg.video": {
                    name: 'site.oms.epg.video',
                    url: '/video',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/content/epg.html",
                            controller: "EpgCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/content/epg', 'modules/oms/content/epgEdit']);
                        }
                    }
                },
                "site.oms.epg.epg": {
                    name: 'site.oms.epg.epg',
                    url: '/epg/:videoId',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/content/program.html",
                            controller: "ProgramCtrl"
                        }
                    },
                    data: {
                        display: false
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/content/program', 'modules/oms/content/programEdit']);
                        }
                    }
                },
                "site.oms.contents.vod": {
                    name: 'site.oms.contents.vod',
                    url: '/vod',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/content/show.html?videoType=0",
                            controller: "ShowCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/content/show', 'modules/oms/content/showEdit', 'modules/oms/content/channelOption', 'modules/oms/content/showOption', 'modules/oms/content/showVideo','modules/oms/content/vodEdit']);

                        }
                    }
                },
                //------

                "site.oms.contents.video": {
                    name: 'site.oms.contents.video',
                    url: '/channel',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/content/channel.html",
                            controller: "channelCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/content/channel', 'modules/oms/content/channelOption', 'modules/oms/content/service']);
                        }
                    }
                },

                "site.oms.contents.createvideo": {
                    name: 'site.oms.contents.createvideo',
                    url: '/videocreate/:videoId',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/content/channelEdit.html",
                            controller: "channelEditCtrl"
                        }
                    },
                    data: {
                        display: false
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/content/channelEdit', 'modules/oms/content/channelOption', 'modules/oms/content/service']);
                        }
                    }
                },

                "site.oms.contents.bindVideo": {
                name: 'site.oms.contents.bindVideo',
                    url: '/bindVideo/:videoId',
                    views: {
                    "content@site": {
                        templateUrl: "modules/oms/content/bindVideo.html",
                            controller: "bindVideoCtrl"
                    }
                },
                resolve: {
                    "loadCtrl": function($q) {
                        return loadCtrl($q, ['modules/oms/content/bindVideo']);
                    }
                }
            },
                "site.oms.basic": {
                    name: "site.oms.basic",
                    url: "/basic"
                },
                "site.oms.basic.property": {
                    name: "site.oms.basic.property",
                    url: "/property",
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/basic/property.html",
                            controller: "PropertyCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/basic/property', 'modules/oms/basic/propertyEdit']);
                        }
                    }
                },
                "site.oms.basic.tag": {
                    name: "site.oms.basic.tag",
                    url: "/tag",
                    views: {
                        "leftnav@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/basic/tag.html",
                            controller: "TagCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/basic/tag', 'modules/oms/basic/tagEdit']);
                        }
                    }
                },
                "site.oms.basic.category": {
                    name: "site.oms.basic.category",
                    url: "/category",
                    views: {
                        "leftnav@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/basic/category.html",
                            controller: "CategoryCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/basic/category', 'modules/oms/basic/categoryEdit','modules/oms/apps/appOperation']);
                        }
                    }
                },
                "site.oms.basic.market": {
                    name: "site.oms.basic.market",
                    url: "/market",
                    views: {
                        "leftnav@": {},
                        "topnav@": {},
                        "content@site": {
                            templateUrl: "modules/oms/basic/market.html",
                            controller: "MarketCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/basic/market', 'modules/oms/basic/marketEdit']);
                        }
                    }
                },
                "site.oms.client": {
                    name: "site.oms.client",
                    url: "/client"
                },

                "site.oms.client.tablet": {
                    name: 'site.oms.client.tablet',
                    url: '/tablet',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/client/tab.html",
                            controller: "TabCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/client/tab', 'modules/oms/client/tabEdit','modules/oms/client/versionList']);
                        }
                    }
                },
                "site.oms.client.target": {
                    name: 'site.oms.client.target',
                    url: '/target/:targetId',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/client/clientManage.html",
                            controller: "clientCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/client/clientManage', 'modules/oms/client/template', 'modules/oms/client/service']);
                        }
                    }
                },

                "site.oms.client.create": {
                    name: 'site.oms.client.create',
                    url: '/clientCtrl/:targetId/:tabletId',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/client/clientEdit.html",
                            controller: "clientEditCtrl"
                        }
                    },
                    data: {
                        display: false
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['libs/jquery-ui', 'modules/oms/client/clientEdit', 'modules/oms/client/clientOption', 'modules/oms/client/service','modules/oms/client/clientSetTime']);
                        }
                    }
                },
                "site.oms.client.version": {
                    name: 'site.oms.client.version',
                    url: '/version/:clientId/:nameIndex/:tabletId',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/client/clientVersion.html",
                            controller: "versionCtrl"
                        }
                    },
                    data: {
                        display: false
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/client/clientVersion', 'modules/oms/client/versionOption', 'modules/oms/client/service']);
                        }
                    }

                },
                "site.oms.client.radio": {
                    name: 'site.oms.client.radio',
                    url: '/radio',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/client/audioapi.html",
                            controller: "AudioapiCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/client/audioapi']);
                        }
                    }
                },
                //xue api
                "site.oms.inteface.customapi": {
                    name: 'site.oms.inteface.customapi',
                    url: '/customapi',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/client/tmpapi.html",
                            controller: "TmpapiCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/client/tmpapi', 'modules/oms/client/tmpapiEdit','modules/oms/client/versionList','modules/oms/content/channelOption']);
                        }
                    }
                },

                "site.oms.test": {
                    name: "site.oms.test",
                    url: "/test"
                },
                "site.oms.test.test": {
                    name: 'site.oms.test.test',
                    url: '/test',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/test/frame.html",
                            controller: "TestCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/test/ZeroClipboard.min', 'modules/oms/test/testEdit']);
                        }
                    }
                },

                "site.oms.inteface": {
                    name: 'site.oms.inteface',
                    url: '/inteface'
                },
                "site.oms.inteface.server": {
                    name: 'site.oms.inteface.server',
                    url: '/server',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/inteface/server.html",
                            controller: "serverCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/inteface/server', 'modules/oms/inteface/service']);
                        }
                    }
                },

                "site.oms.inteface.web": {
                    name: 'site.oms.inteface.web',
                    url: '/intefaceWeb',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/inteface/web.html",
                            controller: "webCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/inteface/web', 'modules/oms/inteface/service']);
                        }
                    }
                },
                "site.oms.inteface.ios": {
                    name: 'site.oms.inteface.ios',
                    url: '/intefaceIos',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/inteface/ios.html",
                            controller: "iosCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/inteface/ios', 'modules/oms/inteface/service']);
                        }
                    }
                },
                "site.oms.inteface.android": {
                    name: 'site.oms.inteface.android',
                    url: '/intefaceAndroid',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/inteface/android.html",
                            controller: "androidCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/inteface/android', 'modules/oms/inteface/service']);
                        }
                    }
                },
                "site.oms.logs":{
                    name: "site.oms.logs",
                    url: "/logs"
                },
                "site.oms.logs.log": {
                    name: 'site.oms.logs.log',
                    url: '/log',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/logs/log.html",
                            controller: "LogCtrl"
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/logs/log']);
                        }
                    }
                },
                "site.oms.area": {
                    name: "site.oms.area",
                    url: "/relatArea"
                },
                "site.oms.area.arearelation": {
                    name: 'site.oms.area.arearelation',
                    url: '/relatArea',
                    views: {
                        "content@site": {
                            templateUrl: "modules/oms/relatArea/relatArea.html",
                            controller: "AreaRelatCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/relatArea/relatArea','modules/oms/relatArea/relatOperation']);
                        }
                    }
                },
                "site.oms.config": {
                    name: "site.oms.config",
                    url: "/config"
                },
                "site.oms.config.config": {
                    name: 'site.oms.config.config',
                        url: '/config',
                        views: {
                        "content@site": {
                            templateUrl: "modules/oms/config/config.html",
                                controller: "ConfigCtrl"
                        }
                    },
                    data: {
                        methods: {
                            create: {},
                            index: {},
                            update: {},
                            delete: {},
                            forceUpdate: {}
                        }
                    },
                    resolve: {
                        "loadCtrl": function($q) {
                            return loadCtrl($q, ['modules/oms/config/config']);
                        }
                    }
                }

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
                        console.info('load---,_state', obj.name,_state);
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

            //频道管理 -- 频道屏蔽时间
            $stateProvider.state({
                name: 'site.oms.contents.bindVideo',
                url: '/bindVideo/:videoId',
                views: {
                    "content@site": {
                        templateUrl: "modules/oms/content/bindVideo.html",
                        controller: "bindVideoCtrl"
                    }
                },
                resolve: {
                    "loadCtrl": function($q) {
                        return loadCtrl($q, ['modules/oms/content/bindVideo']);
                    }
                }
            });

        }
    ]);

});
