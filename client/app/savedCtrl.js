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

  $scope.fbShare = (secret) => {
    const homeURL = 'https://www.spurralizious.com';
    const pictureLink = 'http://imgur.com/a/uHorC';
    const url = `http://www.facebook.com/dialog/feed?app_id=${1767308383585120}` +
    `&link=${encodeURIComponent('www.spurralizious.com')}&picture=http://i.imgur.com/Ej3LoGC.png` +
    `&name=${encodeURIComponent('Spurr')}&caption=${'Don\'t you have a secret?'}` +
    `&description=${encodeURIComponent(`Someone whispurred a secret: ${secret.message}`)}&display=popup`;
    window.open(url,
                'feedDialog',
                'toolbar=0,status=0,width=626,height=436'
    );
  };
});
