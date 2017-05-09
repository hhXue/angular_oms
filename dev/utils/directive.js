define([
	'angularAMD'
], function(angularAMD) {

	angularAMD.directive('ngEnter', function($document) {
		return function(scope, element, attrs) {
			$document.bind("keydown", function(event) {

				if (event.which === 13) {
					scope.$apply(function() {
						scope.$eval(attrs.ngEnter);
					});

					event.preventDefault();
				}
			});
			scope.$on("$destroy", cleanUp);

			function cleanUp() {
				window.angular.element($document).off('keydown keypress');
			}
		};
	});
	//-- 验证修改用户名密码是否相等
	angularAMD.directive("passwordVerify", function() {
		return {
			require: "ngModel",
			scope: {
				passwordVerify: '='
			},
			link: function(scope, element, attrs, ctrl) {

				scope.$watch(function() {
					var combined;

					if (scope.passwordVerify || ctrl.$viewValue) {
						combined = scope.passwordVerify + '_' + ctrl.$viewValue;
					}
					return combined;
				}, function(value) {
					if (value) {
						ctrl.$parsers.unshift(function(viewValue) {
							var origin = scope.passwordVerify;
							if (origin !== viewValue) {
								ctrl.$setValidity("passwordVerify", false);
								return undefined;
							} else {
								ctrl.$setValidity("passwordVerify", true);
								return viewValue;
							}
						});
					}
				});
			}
		};
	});

	angularAMD.directive("loadUrl", function($timeout) {
		return {

			restrict: 'A',

			link: function(scope, element, attrs) {

				$timeout(function(obj, name) {

					$(element).attr("src", element[0].name);

				}, 1500);
			}
		};
	});



	angularAMD.directive("isNumber", function($timeout) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				element.bind("blur", function() {
					scope.$apply(ckNumber);
				})
				element.bind("focus", function() {
					scope.$apply(init);
				})

				function init() {
					delete scope.myform.$error.number;

				}

				function ckNumber() {

					var regst = /^[0-9]+(.[0-9]{1,3})?$/;
					var numb = scope.myform.number.$viewValue;

					if (!regst.test(numb)) {
						scope.myform.$error.number = true;
					} else {
						delete scope.myform.$error.number;
					}
				}

			}
		};
	});



	angularAMD.directive('fileModel', ['$parse', function($parse) {
		return {
			restrict: 'A',
			link: function(scope, element, attrs) {
				var model = $parse(attrs.fileModel);
				var modelSetter = model.assign;

				element.bind('change', function() {
					scope.$apply(function() {
						modelSetter(scope, element[0].files[0]);
					});
				});
			}
		};
	}]);


	angularAMD.directive("selectImage", function($parse, $timeout) {
		return {
			restrict: 'E',
			scope: {
				img: '=img'

			},
			templateUrl: 'utils/selectImage/tpl.html',
			link: function(scope, el, attrs, ctrl) {

				var privateImg = "";
				var modelId = "";

				function sco() {
					scope.img = privateImg;
				}

				//监听postMessage消息事件
				if (typeof window.addEventListener != 'undefined') {
					window.addEventListener('message', onmessage, false);
				} else if (typeof window.attachEvent != 'undefined') {
					window.attachEvent('onmessage', onmessage);
				}

				//选中图片后，返回时触发
				function onmessage(e, a, b) {
					var data = e.data.split('|');
					if (data.length == 2) {
						imgUrl = data[1];
					} else {
						imgUrl = data[0];
					}
					if (imgUrl) {
						setImagePath(imgUrl, false);
					}
				}

				//设置ngModel字段的值为imgUrl
				function setImagePath(imgUrl, force) {
					if (angular.element(el)[0].id == modelId) {
						modelId = "";
						var img = angular.copy(imgUrl);
						angular.element(el).find('p').next().css("display", "block");
						angular.element(el).find('img').attr('src', img);
						angular.element(el).find('span').html(img);
						scope.fromId = '';
						privateImg = img;
						scope.$apply(sco);
					}
				}

				$timeout(function() {
					if (typeof scope.img != "undefined") {
						if (scope.img == '')
							return;
						angular.element(el).find('p').next().css("display", "block");
						angular.element(el).find('img').attr('src', scope.img);
						scope.imgUrl = scope.img;
						angular.element(el).find('span').html(scope.img);
						scope.fromId = '';
						privateImg = scope.img;
						scope.$apply(sco);
					}
				}, 1500)

				//选择图片，返回值使用postMessage
				angular.element(el).find('button').bind('click', function(e) {
					modelId = angular.copy(el[0].id);

					var config = JSON.parse(sessionStorage.getItem('baseConfig'));
					var dialogWidth = '600px';
					var dialogHeight = '400px';
					angular.element(el).find('img').attr('id', attrs.ngModel);
					angular.element(el).find('p').attr('id', attrs.ngModel);
					window.open(config.imgBaseUrl, null, "dialogHeight=" + dialogHeight + ";dialogWidth=" + dialogWidth);
				});

				//删除图片
				angular.element(el).find('a').bind('click', function() {
					angular.element(el).find('p').next().css("display", "none");
					angular.element(el).find('img').attr('src', "");
					scope.imgUrl = "";
					//	console.info('delete', scope.channel.videoImage)
					angular.element(el).find('span').html("");
					privateImg = "";
					scope.$apply(sco);
				});
			}
		}
	});


});