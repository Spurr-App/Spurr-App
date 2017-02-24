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

  $scope.images = {
    none: 'none',
    letter: '../extra/letter-back.png',
    dot: '../extra/dot-back.png',
  };

  $scope.styleIn = {
    'font-family': 'arial',
    'font-size': '15px',
    'color': 'black',
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

  $scope.set = function() {
    $scope.secret.inner_style = JSON.stringify($scope.styleIn);
    $scope.secret.outer_style = JSON.stringify($scope.styleOut);
    console.log(JSON.stringify($scope.styleIn));
    console.log($scope.secret);
  };

  $scope.setFont = function(font, size, color) {
    if (font) {
      $scope.styleIn['font-family'] = font;
    } else if (size) {
      $scope.styleIn['font-size'] = size + 'px';
    } else if (color) {
      $scope.styleIn.color = color;
    }
    $scope.set();
  };

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
  }
});


// INSERT INTO spurrs (sender,recipient,date,message,inner_style,outer_style) VALUES ("Today's self", "Future self", "Fri Feb 24 2017", "It will be okay", "{"font-family":"Futura","font-size":"21px","color":"red"}", "{"background-image":"url(../extra/dot-back.png)","background-color":"#ffafaf"}")
