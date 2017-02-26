angular.module('Receive-Ctrl', [])
.controller('receiveCtrl', function ($scope, receiveFact) {
  $scope.username = 'liv';

  $scope.secret = null;
  $scope.styleIn = null;
  $scope.styleOut = null;

  $scope.ready = false;

  /**
   * Gets one spurr from database
   * Sets local variables to parts of received data
   */
  $scope.get = function () {
    receiveFact.get()
    .then((secret) => {
      $scope.secret = secret;
      $scope.secret.username = $scope.username;
      $scope.styleIn = secret.inner_style;
      $scope.styleOut = secret.outer_style;
    });
  };

  /**
   * Sets $scope.ready to true
   */
  $scope.show = function () {
    $scope.ready = true;
  };

  /**
   * Checks if secret should send its sender, recipient, date, and location
   * Sets any of those four to null if necessary
   * Runs a function from confessFact to post secret to the database
   */
  $scope.save = function (secret) {
    receiveFact.post(secret);
  };

  $scope.get();
});
