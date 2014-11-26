'use strict';

angular.module('liftbroApp')
  .directive('lbBarChart', function() {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'components/lb-bar-chart/lb-bar-chart.html',
      controller: function($scope) {
        $scope.data = {};
        $scope.chartOptions = {
          responsive: true,
          barStrokeWidth: 2
        };
        $scope.colors = [['#5cb85c', '#4cae4c'], ['#f0ad4e', '#eea236']];

        $scope.formatDataForChart = function() {
          $scope.data.datasets[0].fillColor = 'rgba(0,0,0,0)';
          $scope.data.datasets[0].highlightFill = 'rgba(0,0,0,0.05)';
          $scope.data.datasets[0].strokeColor = $scope.colors[$scope.index][0];
          $scope.data.datasets[0].highlightStroke = $scope.colors[$scope.index][1];
        };

        $scope.buildChart = function(data, element) {
          $scope.chartOptions = {
            tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>',
            responsive: true
          };

          $scope.chartCanvas = element.find('canvas')[0].getContext('2d');

          $scope.chart = new window.Chart($scope.chartCanvas).Bar(data, $scope.chartOptions);
        };
      },
      link: function(scope, element, attr) {

        scope.index = attr['dataindex'];

        attr.$observe('data', function(val) {
          if (!val.length) { return; }
          scope.data = JSON.parse(val);
          scope.formatDataForChart();
          scope.buildChart(scope.data, element);
        });

      }
    };
  });
