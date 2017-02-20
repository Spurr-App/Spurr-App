angular.module('Spurr-Ctrl', [])
.controller('SpurrCtrl', function ctrl($scope, SpurrFact) {
  this.default = '';

  $scope.test = function (input) {
    SpurrFact.test(input);
  };
});
