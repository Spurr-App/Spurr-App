angular.module('Spurr-Ctrl', [])
.controller('SpurrCtrl', function ctrl($scope, SpurrFact) {
  $scope.default = '';

  $scope.secret = {
    who: 'Liv',
    when: 'Today',
    where: 'NOLA',
    what: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
