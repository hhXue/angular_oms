'use strict';
require.config({

    baseUrl: './',
    paths: {
        app: 'app',
        angular: 'libs/angular',
        angularAMD: 'libs/angularAMD',
        ngload: 'libs/ngload',
        ngDialog: 'libs/ngDialog',
        text: 'libs/text',
        ngAnimate: 'libs/angular-animate',
        angularStrap: 'libs/angular-strap',
        angularStrapTpl: 'libs/angular-strap.tpl',
        angularSanitize: 'libs/angular-sanitize',

        videogular: 'libs/videogular',
        vgControls: 'libs/vg-controls',
        vgOverlayPlay: 'libs/vg-overlay-play',
        vgPoster: 'libs/vg-poster',
        vgBuffering: 'libs/vg-buffering',
        vgImaAds: 'libs/vg-ima-ads',

        base64: 'libs/base64',
        angularUiSelect: 'libs/select',

        Session: 'public/login/session',
        AuthService: 'public/login/authService',
        login: 'public/login/login',
        layout: 'public/layout/layout',
        directives: 'utils/directive',
        authService: 'public/login/authService',
        BaseCtrl: 'utils/BaseCtrl',
        BaseService: 'utils/BaseService',

        ngfil: 'utils/filter',
        dirPagination: 'utils/pagination/pagination',

        angularUiRouter: 'libs/angular-ui-router',
        uiRouterExtras: 'libs/ct-ui-router-extras',
        angularChinese: 'libs/angular-locale_zh-cn',
        spin: 'libs/spin',
        angularSpinner: 'libs/angular-spinner',
        angularResource: 'libs/angular-resource',
        lodash: 'libs/lodash',
        utils: 'utils/utils',
    
        jquery: 'libs/jquery',
        ZeroClipboard: 'libs/ZeroClipboard',
        ngClip: 'libs/ng-clip',
        //m3u8
        ie10ViewportBugWorkaround:'libs/ie10-viewport-bug-workaround',
        videoDev:'libs/video.dev',
        videojsMediaSources:'libs/videojs-media-sources',
        videojsHls:'libs/videojs.hls.min',
        //test
        swfobject:'libs/swfobject',

        //app version select directive
        appVersionSelect: 'utils/appVersionSelect/appVersionSelect',
        ivhTreeview: 'libs/ivh-treeview'
    },
    shim: {
        angular: {deps: [], exports: 'angular'},
        angularAMD: {deps: ['angular'] },
        angularStrap: {deps: ['angular'] },
        angularStrapTpl: {deps: ['angular', 'angularStrap'] },
        angularChinese: {deps: ['angular'] },
        ngload: {deps: ['angularAMD'] },
        ngDialog: {deps: ['angular', 'angularAMD'], exports: 'ngDialog'},
        ngAnimate: {deps: ['angular'] },
        angularUiSelect: {deps: ['angular'] },
        angularSpinner: {deps: ['angular', 'spin'] },
        utils: {deps: ['angular', 'angularAMD', 'ngDialog'] },
        dirPagination: {deps: ['angular', 'angularAMD'] },
        angularResource: {deps: ['angular'] },
        angularSanitize: {deps: ['angular'] },
        videogular: {deps: ['angular'] },
        vgControls: {deps: ['angular', 'videogular'] },
        vgOverlayPlay: {deps: ['angular', 'videogular'] },
        vgPoster: {deps: ['angular', 'videogular'] },
        vgBuffering: {deps: ['angular', 'videogular'] },
        vgImaAds: {deps: ['angular'] },
        angularUiRouter: {deps: ['angular'] },
        d3: {deps: [] },
        jquery: {exports: '$'},
        ZeroClipboard: {deps: ['angular'] },
        ngClip: {deps: ['angular', 'ZeroClipboard'] },
        lodash: {exports: '_'},
        ocLazyLoad: {deps: ['angular'] },
        uiRouterExtras: {deps: ['angularUiRouter'] },
        uiRouterExtrasStatevis: {deps: ['uiRouterExtras']},

        videoDev: { exports: 'videojs' },
        videojsMediaSources: { deps: ['videoDev'] },
        videojsHls: { deps: ['videoDev'] },
        ivhTreeview: { deps: ['angular'] }

    }

});
