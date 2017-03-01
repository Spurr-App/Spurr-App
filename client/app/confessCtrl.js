angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($scope, SpurrFact, confessFact) {
  $scope.showSender = true;
  $scope.showRecipient = true;
  $scope.showDate = true;
  $scope.showLocation = true;

  $scope.fonts = [
    'Arial',
    'Helvetica',
    'Futura',
    'Times',
    'Comic Sans MS',
    'Papyrus',
    'Courier New',
    'Arial Black',
    'Impact',
    'Earwig Factory',
    'I Love Glitter',
    'Jazz Ball',
  ].sort();

  $scope.sizes = {
    'X-Small': 9,
    Small: 12,
    Medium: 15,
    Large: 21,
  };

  $scope.images = {
    none: 'none',
    paper: '../assets/paper-back.png',
    letter: '../assets/letter-back.png',
    dot: '../assets/dot-back.png',
    wild: '../assets/crazy-back.png',
    dark: '../assets/cross-back.png',
    love: '../assets/heart-back.png',
  };

  $scope.styleIn = {
    'font-family': 'arial',
    'font-size': '15px',
    color: 'black',
  };

  $scope.styleOut = {
    'background-image': 'none',
    'background-color': 'lightgrey',
  };

  $scope.secret = {
    sender: 'Sender',
    recipient: 'Recipient',
    date: new Date().toDateString(),
    location: 'NOLA',
    message: 'Message',
    inner_style: JSON.stringify($scope.styleIn),
    outer_style: JSON.stringify($scope.styleOut),
  };

  /**
   * Sets styles of $scope.secret object
   * Styles must be stringified before being sent to database
   */
  $scope.set = function () {
    $scope.secret.inner_style = JSON.stringify($scope.styleIn);
    $scope.secret.outer_style = JSON.stringify($scope.styleOut);
  };

  /**
   * Changes an aspect of the styleIn depending on which arguments are passed
   * Calls $scope.set to re-stringify styles
   * @param {String} font
   * @param {String} size
   * @param {String} color
   */
  $scope.setFont = function (font, size, color) {
    if (font) {
      $scope.styleIn['font-family'] = font;
    } else if (size) {
      $scope.styleIn['font-size'] = `${size}px`;
    } else if (color) {
      $scope.styleIn.color = color;
    }
    $scope.set();
  };

  /**
   * Changes an aspect of the styleOut depending on which arguments are passed
   * Calls $scope.set to re-stringify styles
   * @param {String} url
   * @param {String} color
   */
  $scope.setBackground = function (url, color) {
    if (url) {
      if (url === 'none') {
        $scope.styleOut['background-image'] = 'none';
      }
      $scope.styleOut['background-image'] = `url(${url})`;
    } else if (color) {
      $scope.styleOut['background-color'] = color;
    }
    $scope.set();
  };

  /**
   * Checks if secret should send its sender, recipient, date, and location
   * Sets any of those four to null if necessary
   * Escapes quotation marks in secret.message
   * Runs a function from confessFact to post secret to the database
   * @param {object} secret
   */
  $scope.confess = function (secret) {
    if (!$scope.showSender) {
      secret.sender = null;
    } else if (!$scope.showRecipient) {
      secret.recipient = null;
    } else if (!$scope.showDate) {
      secret.date = null;
    } else if (!$scope.showlocation) {
      secret.location = null;
    }
    secret.message = SpurrFact.esc(secret.message);
    confessFact.post(secret);
  };
});
