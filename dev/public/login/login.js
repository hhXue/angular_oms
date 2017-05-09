define(["angularAMD", "AuthService", "base64"], function(angularAMD, AuthService, base64) {
	"use strict";
	angularAMD.controller("LoginCtrl", ["$scope", "AuthService", "$state", "$rootScope", "AUTH_EVENTS", "$timeout", function($scope, AuthService, $state, $rootScope, AUTH_EVENTS, $timeout) {

		var md5 = "8a2a4149613ce7c12086baa1a7742ce2";

		$scope.loading = !1, $scope.has_error = !1, $scope.error_msg = "", $timeout(function() {
			$scope.loginShow = !0
		}, 500),

		//$scope.login = function(a) {
        //
		//	//验证是否为空 rememberme 是否保存cookie
		//	"undefined" != typeof a && "" != a.username && ("undefined" == typeof a.rememberme && (a.rememberme = !1), $scope.credentials = {
		//		username: a.username,
		//		password: base64encode(a.password + md5),
		//		rememberme: a.rememberme
		//	}, $scope.loading = !0, $scope.has_error = !1, $scope.error_msg = "",
        //
		//	//ajax 登陆
			AuthService.login($scope.credentials).then(function(a, b, c) {
				//返回对象 (用户当前信息 和 权限)
				var d = JSON.stringify(AuthService.getHttpBaseUrl());
				//放入h5 的前端的sessionStorage里 (cookie长度不够)
				sessionStorage.setItem("baseConfig", d),
				//broadcast赋值 跳转到apps.js  监听的路由
				 $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);

			}, function(a, b, c) {
        var d = JSON.stringify(AuthService.getHttpBaseUrl());
        //放入h5 的前端的sessionStorage里 (cookie长度不够)
        sessionStorage.setItem("baseConfig", d),
          //broadcast赋值 跳转到apps.js  监听的路由
          $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
				console.info("login error", a), $scope.loading = !1, $scope.has_error = !0, $scope.error_msg = "code" + a.data.code + ":" + a.data.message, $rootScope.$broadcast(AUTH_EVENTS.loginFailed)
			})
    //)
		//},
    //$scope.init = function() {
    //    document.cookie && null == sessionStorage.getItem("currentUser") && AuthService.ckCookie().then(function(a, b, c) {
    //        var d = JSON.stringify(AuthService.getHttpBaseUrl());
    //        sessionStorage.setItem("baseConfig", d), $rootScope.$broadcast(AUTH_EVENTS.loginSuccess)
    //    }, function(a, b, c) {})
    //},
    //$scope.Window_Load = function() {
    //    setCookie("omstoken", ""), removeCookie("address", "/"), alert(document.cookie)
    //},
    //$scope.setCookie = function(a, b, c, d, e, f) {
    //    var g = a + "=" + b;
    //    if (c) {
    //        var h = new Date;
    //        h.setHours(h.getHours() + c), g += "; expires=" + h.toGMTString()
    //    }
    //    g += d ? "; path=" + d : "", g += e ? "; domain=" + e : "", g += f ? "; secure=" + f : "", document.cookie = g
    //},
    //$scope.getCookie = function(name) {
    //    var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/");
    //    return reg.test(document.cookie) ? RegExp.$1 : ""
    //},
    //$scope.removeCookie = function(a, b, c) {
    //    this.setCookie(a, "", -1, b, c)
    //},
    //$scope.logout = function() {
    //    AuthService.logout().then(function() {
    //        $scope.setCurrentUser(null), sessionStorage.setItem("changeIndex", null), sessionStorage.setItem("currentUser", "1"), $rootScope.$broadcast(AUTH_EVENTS.loginoutSuccess)
    //    }, function() {
    //        $rootScope.$broadcast(AUTH_EVENTS.loginoutFailed)
    //    })
    //},
    //$scope.cancel = function() {
    //    $scope.loading = !1
    //},
    // $scope.loginOauth = function(a) {
    //    $window.location.href = "/auth/" + a
    //},
    //    $scope.init()
	}])
});
