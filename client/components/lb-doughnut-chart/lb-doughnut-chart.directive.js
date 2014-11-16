'use strict';

angular.module('liftbroApp')
  .directive('lbDoughnutChart', function() {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: '/components/lb-doughnut-chart/lb-doughnut-chart.html',
      controller: function($scope) {
        $scope.selectedMetric = 'reps';

        $scope.selectMetric = function(metric) {
            $scope.chart.destroy();
            $scope.chart = new window.Chart($scope.chartCanvas).Doughnut($scope.data.chartValues, $scope.chartOptions);
        };

        $scope.data = {
            chartValues: [
                {
                    value: 300,
                    color:'#F7464A',
                    highlight: '#FF5A5E',
                    label: 'Benchpress'
                },
                {
                    value: 50,
                    color: '#46BFBD',
                    highlight: '#5AD3D1',
                    label: 'Curl'
                },
                {
                    value: 100,
                    color: '#FDB45C',
                    highlight: '#FFC870',
                    label: 'Legpress'
                },
                {
                    value: 300,
                    color:'#F7464A',
                    highlight: '#FF5A5E',
                    label: 'Benchpress'
                },
                {
                    value: 100,
                    color: '#FDB45C',
                    highlight: '#FFC870',
                    label: 'Legpress'
                },
                {
                    value: 300,
                    color:'#F7464A',
                    highlight: '#FF5A5E',
                    label: 'Benchpress'
                }
            ]
        };
      },
      link: function(scope, element, attr) {
        scope.data.daysAgo = attr.data;

        scope.chartOptions = {
          tooltipTemplate: '<%if (label){%><%=label%>: <%}%><%= value %> reps',
          responsive: true
        };

        scope.chartCanvas = element.find('canvas')[0].getContext('2d');

        scope.chart = new window.Chart(scope.chartCanvas).Doughnut(scope.data.chartValues, scope.chartOptions);
      }
    };
  });