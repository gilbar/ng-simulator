/**
 * Created by arikyudin on 21/10/16.
 */

(function () {
    'use strict';

    angular.module('Simulator.core.directives', []);


    angular.module('Simulator.core.directives')

    .directive('imageOnLoad', ['$parse', function ($parse) {
        return {
            restrict: 'A',
            link: function (scope, elem, attrs) {
                var fn = $parse(attrs.imageOnLoad);
                elem.on('load', function (event) {
                    scope.$apply(function() {
                        fn(scope, { $event: event });
                    });
                });
            }
        };
    }])
    .directive('hideDisableMenuItem', function(simulatorService, $timeout, $translate, $compile,$interpolate){

        return {
            restrict: 'A',
            scope: {
                hideDisableMenuItem: '@'
            },
            link: function(scope, elem, attrs) {

                let stateName = scope.hideDisableMenuItem;

                if (stateName && stateName !== '' && simulatorService.isStateHidden(stateName)) {
                    elem.remove();
                }

                if (stateName && stateName !== '' && simulatorService.isStateDisabled(stateName)) {
                    attrs.$updateClass('disabled', attrs.class);
                }
            }
        }
    })


})();