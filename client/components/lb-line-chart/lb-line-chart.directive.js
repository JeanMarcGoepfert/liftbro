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
                label: 'Reps',
                fillColor: 'rgba(51,122,183,0.1)',
                strokeColor: '#177bbb',
                pointColor: '#177bbb',
                pointStrokeColor: '#177bbb',
                pointHighlightFill: '#177bbb',
                pointHighlightStroke: '#146ca4',
                data: []
              },
              {
                label: 'Weight',
                fillColor: 'rgba(92,184,92,0.1)',
                strokeColor: '#1aae88',
                pointColor: '#1aae88',
                pointStrokeColor: '#1aae88',
                pointHighlightFill: '#1aae88',
                pointHighlightStroke: '#179877',
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
          $scope.lineChart = new window.Chart(element).Line($scope.data, { responsive: true });
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
