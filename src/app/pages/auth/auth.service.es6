/**
 * Created by arikyudin on 05/06/16.
 */

(function () {
    'use strict';

    angular.module('Simulator.pages.auth')
        .factory('userAuthService', function($rootScope, Restangular, $state, $q){

            var auth = Restangular.all('/auth');

            var Srv = {

                signin: (userDetails) => {
                    return auth.customPOST(userDetails, 'login');

                },
                signup: (userDetails) => {
                    return Restangular.all('candidates').post({emailAddress: userDetails.email});
                },
                signout: () => {

                    $rootScope.currentUser = null;

                    return auth.customPOST({}, 'logout')
                        .then((res)=>{

                        })
                        .catch(()=>{
                           $state.go('signin');
                        })
                },
                getUser: (resetPassword) => {

                    if (!$rootScope.currentUser) {

                        Restangular.setDefaultHttpFields({'withCredentials': true});
                        var defer = $q.defer();

                        auth.customGET('').then(function(user){
                            if (!resetPassword && !user.tempPassword){
                                $rootScope.currentUser = user
                            }

                            defer.resolve(user);
                        }, function(reason){

                            defer.reject(reason);
                            //$state.go('signin');
                        });

                        return defer.promise;
                    } else {
                        return $q.when($rootScope.currentUser);
                    }
                },
                getPostLogin: (user) => {
                    return Srv.getUser().then(postLoginData => {
                        return _.assign({}, user, postLoginData);
                    });
                },
                isLoggedIn: () => {
                    return !!$rootScope.currentUser;
                }
            };

            return Srv;
        })

        .factory('customerService', (Restangular) => {
            var customers = Restangular.all('/customers/');

            function getQuota() {
                return customers.get('quota');
            }

            function getInfo() {
                return customers.get('info');
            }

            function putInfo(details) {
                let params = $.param(details);

                return customers.customPOST(params, 'info', undefined, {'Content-Type': 'application/x-www-form-urlencoded'});
            }

            function resetPassword(email) {
                return customers.customPUT(email, 'password', undefined, {ContentType: 'application/json'});
            }

            function changePassword(user) {
                let params = $.param(user);
                return customers.customPOST(params, 'password', undefined, {'Content-Type': 'application/x-www-form-urlencoded'})
            }

            return {getQuota, getInfo, putInfo, resetPassword, changePassword};
        })

})();