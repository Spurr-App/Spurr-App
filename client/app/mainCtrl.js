angular.module('Spurr-Ctrl', [])
.controller('SpurrCtrl', function ctrl($scope, SpurrFact) {
  $scope.default = '';

  $scope.secret = {
    who: 'Liv',
    when: 'Today',
    where: 'NOLA',
    what: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  };

  $scope.secrets = [
    $scope.secret,
    $scope.secret,
    $scope.secret,
    $scope.secret,
  ];

  $scope.test = function (input) {
    SpurrFact.test(input);
  };
});
