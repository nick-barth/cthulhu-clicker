(function(angular) {
    'use strict';
    var app = angular.module('InsanityApp', []);

    app.controller('LunacyCtrl', ['$scope', '$interval', function($scope, $interval) {
        $scope.madness = 10000;
        $scope.lunacy = 100000;
        $scope.lunacy_rate = 0;
        $scope.madness_rate = 0;
        $scope.click_rate = 1;
        $scope.total_madness = 0;

        $scope.madness_upgrades = [{
                id: 0,
                name: 'Hooded Chanter',
                desc: "Ph'nglui mglw'nafh Cthulhu R'lyeh wgah'nagl fhtagn",
                total: 0,
                cost: 10,
                rate: 0,
                costType: 'madness',
                cost_increase: function() {
                    return this.total * 2;
                },
                increase: 1,
                modifier: 0,
                visible: 1
            }, {
                id: 1,
                name: 'Priest of the Old Gods',
                desc: "Smoke stained, yellowed, tattered, tainted, sacrosanct",
                total: 0,
                cost: 100,
                rate: 0,
                costType: 'madness',
                cost_increase: function() {
                    return this.total * 20;
                },
                increase: 10,
                modifier: 0,
                visible: 0
            },
            {
                id: 2,
                name: 'Rat',
                desc: "Cats recoil in horror from their once usual prey",
                total: 0,
                cost: 10,000,
                rate: 0,
                costType: 'madness',
                cost_increase: function() {
                    return this.total * 20;
                },
                increase: 100,
                modifier: 0,
                visible: 0
            },
            {
                id: 3,
                name: 'Outsider',
                desc: "He who was amongst the catacombs of Nephren-Ka",
                total: 0,
                cost: 100,000,
                rate: 0,
                costType: 'madness',
                cost_increase: function() {
                    return this.total * 20;
                },
                increase: 1000,
                modifier: 0,
                visible: 0
            },
            {
                id: 4,
                name: 'Human?',
                desc: "Almost, has a certain Innsmouth look",
                total: 0,
                cost: 1,000,000,
                rate: 0,
                costType: 'madness',
                cost_increase: function() {
                    return this.total * 20;
                },
                increase: 10,
                modifier: 0,
                visible: 0
            },

        ];

        $scope.lunacy_upgrades = [{
                id: 0,
                name: 'A small bas relief sculpture',
                desc: "Sinister with latent horror",
                total: 0,
                cost: 10,
                rate: 0,
                costType: 'madness',
                cost_increase: function() {
                    return this.total * 2;
                },
                increase: 1,
                modifier: 0,
                visible: 1
            }, {
                id: 1,
                name: 'An ancient viol',
                desc: "A shrieking crescendo, the infinite abyss",
                total: 0,
                cost: 100,
                rate: 0,
                costType: 'madness',
                cost_increase: function() {
                    return this.total * 20;
                },
                increase: 10,
                modifier: 0,
                visible: 0
            }

        ];

        //check if visible
        $scope.checkVisibility = function() {
            for (var i = 0; i < $scope.madness_upgrades.length; i++) {
                if ($scope.madness_upgrades[i].visible != 1 && $scope.madness > $scope.madness_upgrades[i].cost) {
                    $scope.madness_upgrades[i].visible = 1;
                }
            }
        }

        $interval(function() {
            $scope.madness = $scope.madness + $scope.madness_rate;
            $scope.total_madness = $scope.total_madness + $scope.madness_rate;
            $scope.checkVisibility();
        }, 1000);

        $scope.click = function() {
            $scope.madness = $scope.madness + $scope.click_rate;
            $scope.total_madness = $scope.total_madness + $scope.madness_rate;
        }
        $scope.upgradeClick = function(id) {
            var upgrade = $scope.madness_upgrades[id];
            if ($scope.madness >= upgrade.cost) {


                upgrade.rate = upgrade.rate + upgrade.increase;
                $scope.madness = $scope.madness - upgrade.cost;
                $scope.madness_rate = $scope.madness_rate + upgrade.increase;
                upgrade.total++;
                upgrade.cost = upgrade.cost + upgrade.cost_increase();
            }
        }

    }]);
})(window.angular);
