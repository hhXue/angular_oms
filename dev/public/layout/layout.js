define([
	'angularAMD',
	'AuthService',
	'Session'
], function(angularAMD,AuthService) {
	'use strict';

	angularAMD.controller('TopnavCtrl', function($scope, AuthService,$state, Session, $rootScope) {
		$scope.$state = $state;

		$rootScope.userObj = JSON.parse(sessionStorage.getItem('currentUser'));

		$scope.navList = Session.systems;


		$scope.setcookie = function(name, value, hours, path, domain, secure) {
			var cdata = name + "=" + value;
			if (hours) {
				var d = new Date();
				d.setHours(d.getHours() + hours);
				cdata += "; expires=" + d.toGMTString();
			}
			cdata += path ? ("; path=" + path) : "";
			cdata += domain ? ("; domain=" + domain) : "";
			cdata += secure ? ("; secure=" + secure) : "";
			document.cookie = cdata;
		};

		$scope.getCookie = function(name) {
			var reg = eval("/(?:^|;\\s*)" + name + "=([^=]+)(?:;|$)/");
			return reg.test(document.cookie) ? RegExp.$1 : "";
		}

		$scope.removeCookie = function(name, path, domain) {
			$scope.setcookie(name, "", -1, path, domain);
		}

		$scope.logout = function() {
      console.log('logout');
			$scope.removeCookie('omstoken','/',AuthService.config.rootDomain);
			$rootScope.$broadcast('auth-logout');
		};

	});

	angularAMD.controller('LeftnavCtrl', function($scope, $state, Session) {
		$scope.$state = $state;
		var systems = angular.copy(Session.systems);
		$scope.navList = [];
		angular.forEach(systems, function(sys) {
			if ($state.current.name.indexOf(sys.name) > -1) {
				//delete from navlist when state property data.display setted false
				angular.forEach(sys.modules, function(module, idx) {
					if ($state.get('site.' + module.name)) {
						var data = $state.get('site.' + module.name).data;
						if (angular.isDefined(data.display) && !data.display) {
							sys.modules.splice(idx, 1);
						} else {
							if (angular.isDefined(module.controllers) && module.controllers.length > 0) {
								for (var i = module.controllers.length - 1; i >= 0; i--) {
									var ctrl = module.controllers[i];
									if ($state.get('site.' + ctrl.name)) {
										var data = $state.get('site.' + ctrl.name).data;
										if (angular.isDefined(data.display) && !data.display) {
											sys.modules[idx].controllers.splice(i, 1);
										}
									}
								}

							}
						}
					}
				});
				$scope.navList = sys.modules;
			};
		});

		console.log('LeftnavCtrl navList', $scope.navList);

		$scope.menuClick = function(e) {

			var target = angular.element(e.currentTarget);

			var next = target.next();

			if (next.length > 0) {
				e.preventDefault();
				if (next.hasClass('collapse')) {
					target.find('span').attr('class', 'glyphicon glyphicon-triangle-bottom')
					next.removeClass('collapse');
				} else {
					target.find('span').attr('class', 'glyphicon glyphicon-triangle-right')
					next.addClass('collapse');
				}

			}


		}


	});

});
