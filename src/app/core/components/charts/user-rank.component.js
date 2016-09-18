'use strict';

/**
 * Created by arikyudin on 23/07/16.
 */

(function () {
    'use strict';

    angular.module('Simulator.components').component('userRank', {
        bindings: {
            titleLabel: '<'
        },
        template: '<div>' + '<canvas id="pie" class="chart chart-horizontal-bar"' + 'chart-data="$ctrl.data" ' + 'chart-labels="$ctrl.labels" ' + 'chart-series="$ctrl.series"' + 'chart-options="$ctrl.options">' + '</canvas>' + '</div>',
        controller: ["$translate", "customerStatsService", function userRankCtrl($translate, customerStatsService) {
            'ngInject';

            var _this = this;

            this.labels = [];
            this.data = [];
            this.series = [];
            this.options = {
                title: {
                    display: true,
                    text: this.titleLabel,
                    fontSize: 14
                },
                legend: {
                    display: false,
                    position: 'top'
                }
            };

            customerStatsService.getRank().then(function (ranks) {
                ranks.splice(0, 0, {
                    rank: 10,
                    averageGrade: 75
                });
                ranks.reverse();
                _.forEach(ranks, function (rank) {
                    _this.labels.push(getName(rank));
                    _this.data.push(rank.averageGrade);
                });
            });

            function getName(rank) {

                var userRank = $translate.instant('STATS.DASHBOARD.CHARTS.USERS_RANK.RANK') + " " + rank.rank,
                    anonymous = $translate.instant('STATS.DASHBOARD.CHARTS.USERS_RANK.ANONYMOUS'),
                    you = $translate.instant('STATS.DASHBOARD.CHARTS.USERS_RANK.YOU');

                return rank.name ? userRank + ": " + you : userRank + ": " + anonymous;
            }
        }]
    });
})();