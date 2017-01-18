/**
 * Created by arikyudin on 23/07/16.
 */

(function () {
    'use strict';

    angular.module('Simulator.components.charts')
        .component('userQuota', {
            bindings: {
                titleLabel: '<'
            },
            template: `<h5 class="text-center">{{$ctrl.titleLabel}}</h5>
                        <div id="questionsQuotaChart" class="amChart"></div>
                       `,
            controller: function userQuotaCtrl($translate, customerService, simulator_config) {
                'ngInject';

                var questionsQuota = {
                    "theme": "light",
                    "type": "serial",
                    "depth3D": 100,
                    "angle": 30,
                    "autoMargins": false,
                    "marginBottom": 100,
                    "marginLeft": 350,
                    "marginRight": 300,
                    "dataProvider": [],
                    "valueAxes": [ {
                        "stackType": "regular",
                        "gridAlpha": 0
                    } ],
                    "graphs": [ {
                        "type": "column",
                        "topRadius": 1,
                        "columnWidth": 1,
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
                        "columnWidth": 1,
                        "showOnAxis": true,
                        "lineThickness": 2,
                        "lineAlpha": 0.5,
                        "lineColor": "#cdcdcd",
                        "fillColors": "#cdcdcd",
                        "fillAlphas": 0.5,
                        "valueField": "value2",
                        "balloonText": "[[category2]]: [[value]]"
                    } ],

                    "categoryField": "category1",
                    "categoryAxis": {
                        "axisAlpha": 0,
                        "labelOffset": 100,
                        "gridAlpha": 0
                    },
                    "export": {
                        "enabled": false
                    }
                };

                this.$onInit = () => {
                    customerService.getQuota().then((quota) => {

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


                        AmCharts.makeChart('questionsQuotaChart', questionsQuota);
                    });
                };

            },
            controllerAs: '$ctrl'
        });



})();
