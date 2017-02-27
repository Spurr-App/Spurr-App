angular.module('Spurr-Ctrl', [])
.controller('SpurrCtrl', function ($scope, SpurrFact) {
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

  /**
   * Runs a function to console log input
   * Works on any view to ensure angular is working
   * @param {Any} input
   */
  $scope.test = function (input) {
    SpurrFact.esc(input);
  };
});
