angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($scope, confessFact) {

  $scope.showName = true;
  $scope.showDate = true;
  $scope.showLocation = true;

  $scope.secret = {
    name: 'Liv',
    date: new Date().toDateString(),
    location: 'NOLA',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    text_font: 'arial',
    text_color: 'white',
    text_size: 20,
    background: 'blue',
  };

  $scope.style = {
    background: $scope.secret.background,
    'font-family': $scope.secret.text_font,
    'font-size': $scope.secret.text_size + 'px',
    color: $scope.secret.text_color,
  };

  $scope.background = '';
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

});
