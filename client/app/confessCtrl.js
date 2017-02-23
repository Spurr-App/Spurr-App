angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($scope, confessFact) {

  $scope.showSender = true;
  $scope.showRecipient = true;
  $scope.showDate = true;
  $scope.showLocation = true;

  $scope.secret = {
    sender: 'Liv',
    recipient: 'Dear self,',
    date: new Date().toDateString(),
    location: 'NOLA',
    message: 'It\'ll be okay.',
    inner_style: $scope.styleIn,
    outer_style: $scope.styleOut,
    // bgColor: 'black',
    // bgImg: '../extra/letter-back.png',
    // text_font: 'Arial',
    // text_color: 'white',
    // text_size: 20,
  };

  $scope.images = {
    none: 'none',
    letter: '../extra/letter-back.png',
    dot: '../extra/dot-back.png',
  };

  $scope.styleIn = {
    'font-family': $scope.secret.text_font,
    'font-size': $scope.secret.text_size + 'px',
    'color': $scope.secret.text_color,
  };

  $scope.styleOut = {
    'background-image': `url('${$scope.secret.bgImg}')`,
    'background-color': $scope.secret.bgColor,
    'font-family': $scope.secret.text_font,
    'font-size': $scope.secret.text_size + 'px',
    'color': $scope.secret.text_color,
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

  $scope.setFont = function(font, size) {
    console.log(font, size);
    confessFact.font(font, size);
  };

  $scope.setBackground = function(url) {
    confessFact.img(url);
  }

  $scope.setBackgroundColor = function(color) {
    confessFact.bgColor(color);
  }
});
