angular.module('Saved-Ctrl', [])
.controller('savedCtrl', function ($scope, SpurrFact, savedFact) {
  $scope.username = 'liv';

  $scope.styleIn = null;
  $scope.styleOut = null;

  $scope.ready = false;

  $scope.secrets = [];

  /**
   * Gets one spurr from the spurrs database
   * Resets received data's style to parsed objects
   * @returns {Function} Promise from get request resolving data
   */
  $scope.get = function () {
    console.log('get');
    savedFact.get()
    .then((secrets) => {
      $scope.secrets = secrets;
    });
    $scope.ready = true;
  };

  $scope.get();
  $scope.get();

  /**
   * Gets one spurr from the spurrs database
   * Resets received data's style to parsed objects
   * @returns {Function} Promise from get request resolving data
   */
  $scope.show = function () {
    $scope.ready = true;
  };

  /**
   * Gets one spurr from the spurrs database
   * Resets received data's style to parsed objects
   * @returns {Function} Promise from get request resolving data
   */
  $scope.save = function (secret) {
    secret.message = SpurrFact.esc(secret.message);
    savedFact.post(secret);
  };
});
