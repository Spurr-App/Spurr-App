angular.module('Receive-Ctrl', [])
.controller('receiveCtrl', function ($scope, receiveFact) {

  $scope.username = 'liv'

  $scope.secret = null;
  $scope.styleIn = null;
  $scope.styleOut = null;

  $scope.ready = false;

  $scope.get = function() {
    receiveFact.get()
    .then(function(secret) {
      console.log(secret);
      $scope.secret = secret;
      $scope.secret.username = $scope.username;
      $scope.styleIn = secret.inner_style;
      $scope.styleOut = secret.outer_style;
    });
  };

  $scope.show = function() {
    $scope.ready = true;
  }

  $scope.save = function(secret) {
    receiveFact.post(secret);
  };

  $scope.get();

});
