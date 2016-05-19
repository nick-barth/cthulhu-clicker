(function(angular) {
    'use strict';
    var app = angular.module('InsanityApp', []);

    app.controller('LunacyCtrl', ['$scope', '$interval', function($scope, $interval) {
        //  var gamestate = localStorage.getItem('StateOfMadness');
        var gamestate = 0;
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
            var madness_upgrades = [{
                "id": 0,
                "name": "Rat",
                "desc": "Cats recoil in horror from their once usual prey",
                "costtype": "madness",
                "cost": 1,
                "rate": 0,
                "costmodifier": 1.5,
                "increase": 1,
                "total": 0,
                "modifier": 0,
                "visible": 1
            }, {
                "id": 1,
                "name": "Drug Addict",
                "desc": "sunken eyes only hold murmors and shadows",
                "costtype": "madness",
                "cost": 100,
                "rate": 0,
                "costmodifier": 1.5,
                "increase": 10,
                "total": 0,
                "modifier": 0,
                "visible": 0
            }, {
                "id": 2,
                "name": "Grave Digger",
                "desc": "Now fears what was once mundane",
                "costtype": "madness",
                "cost": 10000,
                "rate": 0,
                "costmodifier": 1.2,
                "increase": 100,
                "total": 0,
                "modifier": 0,
                "visible": 0
            }, {
                "id": 3,
                "name": "Hermit",
                "desc": "Isolated, but aware",
                "costtype": "madness",
                "cost": 100000,
                "rate": 0,
                "costmodifier": 1.5,
                "increase": 1000,
                "total": 0,
                "modifier": 0,
                "visible": 0
            }, {
                "id": 4,
                "name": "Sailor",
                "desc": "Spreading stories and disease",
                "costtype": "madness",
                "cost": 1000000,
                "rate": 0,
                "costmodifier": 1.5,
                "increase": 10000,
                "total": 0,
                "modifier": 0,
                "visible": 0
            }, {
                "id": 5,
                "name": "Child",
                "desc": "Purity is an impropriety",
                "costtype": "madness",
                "cost": 10000000,
                "rate": 0,
                "costmodifier": 1,
                "increase": 100000,
                "total": 0,
                "modifier": 0,
                "visible": 0
            }];
            madness_upgrades = JSON.stringify(madness_upgrades);
            $scope.game.madness_upgrades = JSON.parse(madness_upgrades);


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
                upgrade.cost = upgrade.cost * upgrade.costmodifier;

            }
        }

        $scope.save = function() {
            localStorage.removeItem("StateOfMadness");
            localStorage.setItem("StateOfMadness", JSON.stringify($scope.game));
        }

    }]);
})(window.angular);
