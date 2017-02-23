angular.module('Receive-Ctrl', [])
.controller('receiveCtrl', function ($scope, receiveFact) {

  $scope.ready = false;

  $scope.get = function() {
    receiveFact.get()
    .then(function(data) {
      $scope.secret = data;
      $scope.ready = true;
    });
  };

  $scope.save = function(secret) {
    receiveFact.post(secret);
  };

});
