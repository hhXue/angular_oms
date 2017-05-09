define([
	'angularAMD'
], function(angularAMD) {

	angularAMD.filter('errorMsg', function() {
		return function(error) {
			if (typeof error == "undefined" || error == "") {
				return "";
			}
			var str = [];
			if (error.status == 400) {
				angular.forEach(error.data.message, function(e) {
					console.log(e);
					str.push(e);
				});
			} else {
				str.push(error.data.message);
				if (error.data.error) {
					str.push(error.data.error.message);
				}
			}
			return str;
		};
	});

	angularAMD.filter('errorImg', function() {
		return function(imgUrl) {
			if (typeof imgUrl == "undefined" || imgUrl == "") {
				return "styles/images/null.png";
			} else {
				return imgUrl;
			}
		};
	});

});