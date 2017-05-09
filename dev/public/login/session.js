define([
    'angularAMD'
], function() {

    var module = angular.module('stars.session', []);

    module.provider('$starSession', function() {
        var starSession = {};

        this.setSession = function(value) {
            starSession = value;
        };

        this.getSession = function() {
            return starSession;
        };

        this.$get = ['$http', function($http) {

            function CreateSession(settings) {
                var self = this,
                    session = this.session = angular.extend({}, starSession, settings);

                starSession = session;
            }

            CreateSession.prototype.getSession = function() {
                return this.session;
            };

            return {
                create: function(settings) {
                    return new CreateSession(settings);
                },
                destroy: function() {
                    this.session = {};
                }
            };
        }];
    });

    module.service('Session', ['$starSession', function($starSession) {

        var session = this;

        session.create = function(user) {
            console.info('session create===', user, session);
            $starSession.create(user);

            angular.forEach(session, function(v, k, o) {
                if (!angular.isFunction(v)) {
                    delete session[k];
                }
            });

            session = angular.extend(session, user);
            console.log('session session', session);
        };
        session.destroy = function() {
            $starSession.destroy();

            angular.forEach(session, function(v, k, o) {
                if (!angular.isFunction(v)) {
                    delete session[k];
                }
            });
        };

        return session;
    }]);

    return module;
});