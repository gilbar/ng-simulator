/**
 * Created by arikyudin on 05/06/16.
 */

(function () {
    'use strict';

    angular.module('Simulator.pages.auth', ['ngResource']).config(routeConfig);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('auth', {
                abstract: true,
                template: '<div ui-view></div>',
                resolve: {
                    user: function(userAuthService) {
                        return userAuthService.getUser();
                    }
                }
            })
            .state('signin', {
                url: '/signin',
                templateUrl: 'app/pages/auth/auth.html',
                controller: 'signinController as signin',
                title: 'Sign In',
                sidebarMeta: {
                    order: 300
                }
            })
            .state('signout', {
                url: '/signout',
                controller: function(userAuthService){
                    userAuthService.signout();
                }
            })
    }


})();