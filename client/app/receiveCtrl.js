angular.module('Receive-Ctrl', [])
.controller('receiveCtrl', function ($scope, receiveFact) {

  $scope.secret = {
    name: 'null',
    date: 'null',
    location: 'null',
    message: 'null',
  };

  // $scope.secret = {
  //   name: null,
  //   date: null,
  //   location: null,
  //   message: null,
  // };

  $scope.start = function() {
    receiveFact.get();
  };

  $scope.start();
});
