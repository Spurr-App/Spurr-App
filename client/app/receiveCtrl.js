angular.module('Receive-Ctrl', [])
.controller('receiveCtrl', function ($scope, receiveFact) {

  // $scope.secret = {
  //   name: null,
  //   date: null,
  //   location: null,
  //   message: null,
  // };

  $scope.get = function() {
    receiveFact.get()
    .then(function(data) {
      $scope.secret = data;
    });
  };

  $scope.save = function(secret) {
    receiveFact.post(secret);
  };

});
