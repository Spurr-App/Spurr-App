angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($scope, confessFact) {

  $scope.showSender = true;
  $scope.showRecipient = true;
  $scope.showDate = true;
  $scope.showLocation = true;

  $scope.secret = {
    sender: 'Sender',
    recipient: 'Recipient',
    date: new Date().toDateString(),
    location: 'NOLA',
    message: 'Message',
    inner_style: $scope.styleIn,
    outer_style: $scope.styleOut,
  };

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
    'background-image': `url('$scope.images.none')`,
    'background-color': 'lightgrey',
  };

  $scope.fonts = [
    'Arial',
    'Helvetica',
    'Futura',
    'Times',
    'Comic Sans MS',
    'Papyrus',
    'Courier New',
    'Arial Black',
    'Impact'
  ].sort();

  $scope.sizes = [
    12, 14, 16, 18, 20, 24, 28, 32, 36,
  ].sort();

  $scope.confess = function(secret) {
    confessFact.post(secret);
  }

  $scope.setFont = function(font, size, color) {
    console.log(font, size);
    if (font) {
      $scope.styleIn['font-family'] = font;
    } else if (size) {
      $scope.styleIn['font-size'] = size + 'px';
    } else if (color) {
      $scope.styleIn.color = color;
    }
    // confessFact.font(font, size, color);
  };

  $scope.setBackground = function(url) {

    confessFact.img(url);
  }

  $scope.setBackgroundColor = function(color) {
    confessFact.bgColor(color);
  }
});
