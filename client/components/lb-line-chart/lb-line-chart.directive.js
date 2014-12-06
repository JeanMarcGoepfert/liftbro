'use strict';

angular.module('liftbroApp')
  .directive('lbLineChart', function() {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'components/lb-line-chart/lb-line-chart.html',
      controller: function($scope, $filter) {

        $scope.formatDataForChart = function(data) {
          var res = {
            labels: [],
            datasets: [
              {
                label: "Reps",
                fillColor: "rgba(51,122,183,0.1)",
                strokeColor: "rgba(51,122,183,1)",
                pointColor: "rgba(51,122,183,0.5)",
                pointStrokeColor: "rgba(51,122,183,1)",
                pointHighlightFill: "rgba(51,122,183,1)",
                pointHighlightStroke: "rgba(51,122,183,1)",
                data: []
              },
              {
                label: "Weight",
                fillColor: "rgba(92,184,92,0.1)",
                strokeColor: "rgba(92,184,92,1)",
                pointColor: "rgba(92,184,92,0.5)",
                pointStrokeColor: "rgba(92,184,92,1)",
                pointHighlightFill: "rgba(92,184,92,1)",
                pointHighlightStroke: "rgba(92,184,92,1)",
                data: []
              }
            ]
          };
          data.forEach(function(val) {
            res.labels.push($filter('date')(val.date));
            res.datasets[0].data.push(val.reps);
            res.datasets[1].data.push(val.weight);
          });

          return res;
        };

        $scope.buildChart = function(data, element) {
          $scope.lineChart = new Chart(element).Line($scope.data, { responsive: true });
        };
      },
      link: function(scope, element, attr) {


        attr.$observe('data', function(val) {

          scope.data = scope.formatDataForChart(JSON.parse(val));

          if (!scope.data.labels.length) { return; }

          scope.buildChart(scope.data, element.find('canvas')[0].getContext('2d'));
        });

      }
    };
  });
