angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($scope, confessFact) {
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
  ].sort();

  $scope.sizes = [
    9, 12, 15, 21, 30, 36,
  ];

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
   */
  $scope.set = function () {
    $scope.secret.inner_style = JSON.stringify($scope.styleIn);
    $scope.secret.outer_style = JSON.stringify($scope.styleOut);
  };

  /**
   * Returns the sum of a and b
   * @param {Number} a
   * @param {Number} b
   * @returns {Number} Sum of a and b
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
   * Returns the sum of a and b
   * @param {Number} a
   * @param {Number} b
   * @returns {Number} Sum of a and b
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
    confessFact.post(secret);
  };
});
