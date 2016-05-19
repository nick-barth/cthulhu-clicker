(function(angular) {
    'use strict';
    var app = angular.module('InsanityApp', []);

    app.controller('LunacyCtrl', ['$scope', '$interval', function($scope, $interval) {
        var gamestate = localStorage.getItem('StateOfMadness');
        if (gamestate) {
            $scope.game = JSON.parse(gamestate);
        } else {
            $scope.game = {};
            $scope.game.madness = 10000;
            $scope.game.lunacy = 100000;
            $scope.game.lunacy_rate = 0;
            $scope.game.madness_rate = 0;
            $scope.game.click_rate = 1;
            $scope.game.total_madness = 0;
            $scope.game.madness_upgrades = [{
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
                }, {
                    id: 2,
                    name: 'Rat',
                    desc: "Cats recoil in horror from their once usual prey",
                    total: 0,
                    cost: 10000,
                    rate: 0,
                    costType: 'madness',
                    cost_increase: function() {
                        return this.total * 20;
                    },
                    increase: 100,
                    modifier: 0,
                    visible: 0
                }, {
                    id: 3,
                    name: 'Outsider',
                    desc: "He who was amongst the catacombs of Nephren-Ka",
                    total: 0,
                    cost: 100000,
                    rate: 0,
                    costType: 'madness',
                    cost_increase: function() {
                        return this.total * 20;
                    },
                    increase: 1000,
                    modifier: 0,
                    visible: 0
                }, {
                    id: 4,
                    name: 'Human?',
                    desc: "Almost, has a certain Innsmouth look",
                    total: 0,
                    cost: 1000000,
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

            $scope.game.lunacy_upgrades = [{
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
            }];

        }



        /*---------------------------------------
          MAIN LOOP
        ----------------------------------------*/

        $interval(function() {
            $scope.game.madness = $scope.game.madness + ($scope.game.madness_rate / 10);
            $scope.game.total_madness = $scope.game.total_madness + $scope.game.madness_rate;
            $scope.checkVisibility();
        }, 100);

        /*---------------------------------------
          SAVE
        ----------------------------------------*/
        $interval(function() {
            $scope.save();
        }, 10000);

        /*---------------------------------------
          HELPER FUNCTIONS
        ----------------------------------------*/

        $scope.checkVisibility = function() {
            for (var i = 0; i < $scope.game.madness_upgrades.length; i++) {
                if ($scope.game.madness_upgrades[i].visible != 1 && $scope.game.madness > $scope.game.madness_upgrades[i].cost) {
                    $scope.game.madness_upgrades[i].visible = 1;
                }
            }
        }

        $scope.craftClick = function() {
            $scope.game.madness = $scope.game.madness + $scope.game.click_rate;
            $scope.game.total_madness = $scope.game.total_madness + $scope.game.madness_rate;
        }
        $scope.upgradeClick = function(id) {
            var upgrade = $scope.game.madness_upgrades[id];
            if ($scope.game.madness >= upgrade.cost) {
                upgrade.rate = upgrade.rate + upgrade.increase;
                $scope.game.madness = $scope.game.madness - upgrade.cost;
                $scope.game.madness_rate = $scope.game.madness_rate + upgrade.increase;
                upgrade.total++;
                upgrade.cost = upgrade.cost + upgrade.cost_increase();

            }
        }

        $scope.save = function() {
            localStorage.removeItem("StateOfMadness");
            localStorage.setItem("StateOfMadness", JSON.stringify($scope.game));
        }

    }]);
})(window.angular);
