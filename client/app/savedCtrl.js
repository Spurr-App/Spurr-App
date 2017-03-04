angular.module('Saved-Ctrl', [])
.controller('savedCtrl', function ($rootScope, $scope, SpurrFact, savedFact) {
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
    savedFact.get($rootScope.user)
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

  /**
   * Receives secret object from clicked element and constructs
   * a url to post the secret to a social media platform,
   * then opens that url in a new tab
   * @param {object} contains the 'message property'
   * @param {string} tells the switch which social media url to make
   */
  $scope.socialShare = (secret, service) => {
    savedFact.openWind(secret, service);
  };
});
