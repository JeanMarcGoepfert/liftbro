'use strict';

angular.module('liftbroApp')
  .directive('lbLineChart', function() {
    return {
      restrict: 'AE',
      scope: {},
      templateUrl: 'components/lb-line-chart/lb-line-chart.html',
      controller: function($scope) {

        $scope.data = {
          labels: ["12/2/2014", "12/3/2014", "12/5/2014", "12/6/2014", "12/7/2014", "12/8/2014", "12/9/2014"],
          datasets: [
            {
              label: "Weight",
              fillColor: "rgba(92,184,92,0.1)",
              strokeColor: "rgba(92,184,92,1)",
              pointColor: "rgba(92,184,92,0.5)",
              pointStrokeColor: "rgba(92,184,92,1)",
              pointHighlightFill: "rgba(92,184,92,1)",
              pointHighlightStroke: "rgba(92,184,92,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: "Reps",
              fillColor: "rgba(51,122,183,0.1)",
              strokeColor: "rgba(51,122,183,1)",
              pointColor: "rgba(51,122,183,0.5)",
              pointStrokeColor: "rgba(51,122,183,1)",
              pointHighlightFill: "rgba(51,122,183,1)",
              pointHighlightStroke: "rgba(51,122,183,1)",
              data: [45, 34, 45, 65, 66, 78, 55]
            }
          ]
        };


      },
      link: function(scope, element, attr) {
        var ctx = element.find('canvas')[0].getContext('2d');
        var myLineChart = new Chart(ctx).Line(scope.data, { responsive: true });
      }
    };
  });
