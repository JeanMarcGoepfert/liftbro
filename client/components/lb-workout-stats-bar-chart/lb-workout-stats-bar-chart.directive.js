'use strict';

angular.module('liftbroApp')
  .directive('lbWorkoutStatsBarChart', function() {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'components/lb-workout-stats-bar-chart/lb-workout-stats-bar-chart.html',
      controller: function($scope) {
        $scope.selectedMetric = 'amount';
        $scope.colors = { weight: ['#5cb85c', '#4cae4c'], amount: ['#f0ad4e', '#eea236']};
        $scope.normalisedWorkout = {};
        $scope.totals = { amount: 0, weight: 0};

        $scope.formatDataForChart = function(workout) {
          var res = { labels: [], datasets: [{data: [], weight: [], amount: [] }] };

          workout.sets.forEach(function(val) {
            var amount = 0;
            var weight = 0;

            val.reps.forEach(function(val) {
              amount += val.amount;
              weight += val.weight;
            });

            if ($scope.normalisedWorkout.hasOwnProperty(val.exercise.name)) {
              $scope.normalisedWorkout[val.exercise.name].amount += amount;
              $scope.normalisedWorkout[val.exercise.name].weight += weight;
            } else {
              $scope.normalisedWorkout[val.exercise.name] = { amount: amount, weight: weight };
            }
          });

          for (var key in $scope.normalisedWorkout) {
            res.labels.push(key);

            $scope.totals.amount += $scope.normalisedWorkout[key].amount;
            $scope.totals.weight += $scope.normalisedWorkout[key].weight;

            res.datasets[0].weight.push($scope.normalisedWorkout[key].weight);
            res.datasets[0].amount.push($scope.normalisedWorkout[key].amount);
          }

          res.datasets[0].fillColor = 'rgba(0,0,0,0)';
          res.datasets[0].highlightFill = 'rgba(0,0,0,0.05)';
          res.datasets[0].strokeColor = $scope.colors[$scope.selectedMetric][0];
          res.datasets[0].highlightStroke = $scope.colors[$scope.selectedMetric][1];

          $scope.workoutDataCopy = res;
          return res;
        };

        $scope.buildChart = function(data, element) {

          data.datasets[0].data = data.datasets[0][$scope.selectedMetric];

          $scope.chartOptions = {
            tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>',
            responsive: true,
            barStrokeWidth: 2
          };

          $scope.chartCanvas = element.find('canvas')[0].getContext('2d');

          $scope.chart = new window.Chart($scope.chartCanvas).Bar(data, $scope.chartOptions);
        };

        $scope.selectMetric = function() {

          $scope.chart.datasets[0].bars.forEach(function(val) {
            val.strokeColor = $scope.colors[$scope.selectedMetric][0];
            val.highlightStroke = $scope.colors[$scope.selectedMetric][1];
                val.value = $scope.normalisedWorkout[val.label][$scope.selectedMetric];
          });

          $scope.chart.update();
        };
      },
      link: function(scope, element, attr) {

        attr.$observe('data', function(val) {
          scope.data = scope.formatDataForChart(JSON.parse(val));

          if (!scope.data.labels.length) { return; }

          scope.buildChart(scope.data, element);
        });

      }
    };
  });
