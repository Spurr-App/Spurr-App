angular.module('Saved-Ctrl', [])
.controller('savedCtrl', function ($scope, SpurrFact, savedFact) {
  $scope.username = 'liv';

  $scope.styleIn = null;
  $scope.styleOut = null;

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
   * Escapes quotation marks in secret.message
   * Saves the secret to database
   */
  $scope.save = function (secret) {
    secret.message = SpurrFact.esc(secret.message);
    savedFact.post(secret);
  };

  $scope.socialShare = (secret, service) => {
    savedFact.openWind(secret, service);
  };
});
