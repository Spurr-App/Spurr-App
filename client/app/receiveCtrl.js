angular.module('Receive-Ctrl', [])
.controller('receiveCtrl', function ($scope, receiveFact) {

  $scope.username = 'liv'

  $scope.ready = false;

  $scope.get = function() {
    receiveFact.get()
    .then(function(secret) {
      console.log(secret);
      $scope.secret = secret;
      $scope.secret.username = $scope.username;
      $scope.ready = true;
    });
  };

  $scope.save = function(secret) {
    receiveFact.post(secret);
  };

  $scope.get();

});
