angular.module('Spurr-Ctrl', [])
.controller('SpurrCtrl', function ($scope, SpurrFact, $window, $location) {
  $scope.default = '';

  /**
   * Runs a function to console log input
   * Works on any view to ensure angular is working
   * @param {Any} input
   */
  $scope.test = function (input) {
    SpurrFact.esc(input);
  };

  /**
   * Clears localstorage, effectively logging out user
   * Redirects user to root
   */
  $scope.signout = function () {
    $window.localStorage.clear();
    $location.path('/');
  };
});
