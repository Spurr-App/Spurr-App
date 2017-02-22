angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($scope, confessFact) {
  $scope.message = '';


  $scope.showName = true;
  $scope.showDate = true;
  $scope.showLocation = true;

  $scope.date = new Date();

  $scope.secret = {
    name: 'Liv',
    date: $scope.date.valueOf(),
    location: 'NOLA',
    message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
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
    console.log('step 1');
    confessFact.post(secret);
  }

  $scope.get = function(secret) {
    console.log('step 2');
    confessFact.get(secret);
  }
});
