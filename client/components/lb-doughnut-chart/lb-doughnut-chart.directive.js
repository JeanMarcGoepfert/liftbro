'use strict';

angular.module('liftbroApp')
  .directive('lbDoughnutChart', function() {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'components/lb-doughnut-chart/lb-doughnut-chart.html',
      controller: function($scope) {
        $scope.selectedMetric = 'totalAmount';
        $scope.originalData = [];
        $scope.chartData = {
          dateCreated: '',

          colors:     ['#177bbb', '#5cb85c', '#f0ad4e', '#d9534f', '#5bc0de', '#bd91ef', '#1aae88'],
          highlights: ['#146ca4', '#4cae4c', '#eea236', '#d43f3a', '#46b8da', '#ab7fdd', '#179877'],
          data: []
        };

        $scope.formatDataForChart = function(selectedMetric) {
          $scope.chartData.data = [];

          $scope.originalData.sets.forEach(function(val, ind) {

            $scope.chartData.data.push({
              value: val[selectedMetric],
              label: val.name,
              metric: val.metric,
              color: $scope.chartData.colors[ind] || $scope.chartData.colors[0 + ind % $scope.chartData.colors.length],
              highlight: $scope.chartData.highlights[ind] || $scope.chartData.highlights[0 + ind % $scope.chartData.highlights.length]
            });
          });
        };

        $scope.selectMetric = function(metric) {
          $scope.formatDataForChart(metric);
          $scope.chartData.data.forEach(function(val, ind) {
            $scope.chart.segments[ind].value = val.value;
          });

          $scope.chart.update();
        };

        $scope.buildChart = function(data, element) {
          $scope.chartOptions = {
            tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %>',
            responsive: true
          };

          $scope.chartCanvas = element.find('canvas')[0].getContext('2d');

          $scope.chart = new window.Chart($scope.chartCanvas).Doughnut(data, $scope.chartOptions);
        };
      },
      link: function(scope, element, attr) {

        attr.$observe('data', function(val) {
          if (!val.length) { return; }

          scope.originalData = JSON.parse(val);
          scope.chartData.dateCreated = scope.originalData.dateCreated;
          scope.formatDataForChart(scope.selectedMetric);
          scope.buildChart(scope.chartData.data, element);
        });
      }
    };
  });
