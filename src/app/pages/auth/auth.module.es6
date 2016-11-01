/**
 * Created by arikyudin on 05/06/16.
 */

(function () {
    'use strict';

    angular.module('Simulator.pages.auth', [])
        .config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('setup', {
                abstract: true,
                template: '<div ui-view></div>',
                resolve: {
                    translateReady: ($translate, $q, simulatorService) => {

                        return simulatorService.getStatus().then(config => {

                            $translate.use(config.locale);

                            return $q.when($translate.isReady());
                        }).catch(err => {
                            return false;
                        });
                    }
                }
            })
            .state('auth', {
                abstract: true,
                template: '<div ui-view></div>',
                resolve: {
                    user: (userAuthService) => {
                        return userAuthService.getUser();
                    }
                }
            })
            .state('signin', {
                url: '/signin',
                parent: 'setup',
                templateUrl: 'app/pages/auth/signin.html',
                controller: 'signinController as signin'
            })
            .state('signup', {
                url: '/signup',
                parent: 'setup',
                templateUrl: 'app/pages/auth/signup.html',
                controller: 'signupController as signup'
            })
            .state('signout', {
                url: '/signout',
                controller: function(userAuthService){
                    userAuthService.signout();
                }
            })
            .state('forgotPassword', {
                url: '/password-forgot',
                parent: 'setup',
                templateUrl: 'app/pages/auth/forgot_password.html',
                controller: 'forgotController as forgot'
            })
    }


})();