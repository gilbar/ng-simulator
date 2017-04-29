'use strict';

/**
 * Created by arikyudin on 23/07/16.
 */

(function () {
    'use strict';

    angular.module('Simulator.components.charts').component('userQuota', {
        bindings: {
            titleLabel: '<',
            titleTooltip: '<'
        },
        template: '<h4 class="text-center" tooltip="{{::$ctrl.titleTooltip}}" tooltip-placement="bottom">{{::$ctrl.titleLabel}}</h4>\n                        <div id="questionsQuotaChart" class="amChart"></div>\n                       ',
        controller: ["$rootScope", "$translate", "customerService", "simulator_config", function userQuotaCtrl($rootScope, $translate, customerService, simulator_config) {
            'ngInject';

            var questionsQuota = {
                "theme": "light",
                "type": "serial",
                "depth3D": 100,
                "angle": 30,
                "fontSize": 14,
                "fontFamily": "'Arimo', sans-serif",
                "autoMargins": false,
                "marginBottom": 100,
                "marginLeft": 350,
                "marginRight": 300,
                "dataProvider": [],
                "valueAxes": [{
                    "stackType": "regular",
                    "axisAlpha": 0,
                    "gridAlpha": 0,
                    "labelsEnabled": false
                }],
                "graphs": [{
                    "type": "column",
                    "topRadius": 1,
                    "columnWidth": 0.3,
                    "showOnAxis": true,
                    "lineThickness": 2,
                    "lineAlpha": 0.5,
                    "lineColor": "#FFFFFF",
                    "fillColors": "#8d003b",
                    "fillAlphas": 0.8,
                    "valueField": "value1",
                    "balloonText": "[[category1]]: [[value]]"
                }, {
                    "type": "column",
                    "topRadius": 1,
                    "columnWidth": 0.3,
                    "showOnAxis": true,
                    "lineThickness": 2,
                    "lineAlpha": 0.5,
                    "lineColor": "#cdcdcd",
                    "fillColors": "#cdcdcd",
                    "fillAlphas": 0.5,
                    "valueField": "value2",
                    "balloonText": "[[category2]]: [[value]]"
                }],

                "categoryField": "category1",
                "categoryAxis": {
                    "axisAlpha": 0,
                    "labelOffset": 30,
                    "autoRotateCount": 2,
                    "autoRotateAngle": 15,
                    "labelRotation": 15,
                    "centerRotatedLabels": true,
                    "equalSpacing": true,
                    "gridAlpha": 0
                },
                "export": {
                    "enabled": false
                },
                "titles": [
                    /*{
                        "size": 15,
                        "text": this.titleLabel,
                        "color": "#666666"
                    }*/
                ]
            };

            this.$onInit = function () {

                var chart = AmCharts.makeChart('questionsQuotaChart', questionsQuota);

                customerService.getQuota().then(function (quota) {

                    if (simulator_config.postCreditModeEnabled) {
                        questionsQuota.dataProvider.push({
                            category1: $translate.instant('STATS.ACCOUNT.LEFTPOSTCREDITQUESTIONSQUOTA'),
                            category2: $translate.instant('STATS.ACCOUNT.SPENTPOSTCREDITQUESTIONSQUOTA'),
                            value1: quota['leftPostCreditQuestionsQuota'],
                            value2: quota['totalPostCreditQuestionsQuota'] - quota['leftPostCreditQuestionsQuota']
                        });
                    }

                    questionsQuota.dataProvider.push({
                        category1: $translate.instant('STATS.ACCOUNT.LEFTNEWQUESTIONSQUOTA'),
                        category2: $translate.instant('STATS.ACCOUNT.SPENTNEWQUESTIONSQUOTA'),
                        value1: quota['leftNewQuestionsQuota'],
                        value2: quota['totalNewQuestionsQuota'] - quota['leftNewQuestionsQuota']
                    });

                    chart.validateData();

                    $rootScope.$broadcast('rebuildStateBasedMenuItems', { quota: quota });
                });
            };
        }],
        controllerAs: '$ctrl'
    });
})();