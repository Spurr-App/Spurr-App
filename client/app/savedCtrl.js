angular.module('Saved-Ctrl', [])
.controller('savedCtrl', function ($scope, savedFact) {
  $scope.username = 'liv';

  $scope.secret = {
    sender: 'Sender',
    recipient: 'Recipient',
    date: new Date().toDateString(),
    location: 'NOLA',
    message: 'Message',
    inner_style: JSON.stringify($scope.styleIn),
    outer_style: JSON.stringify($scope.styleOut),
  };

  $scope.styleIn = null;
  $scope.styleOut = null;

  $scope.ready = false;

  $scope.secrets = [];

  $scope.get = function(test) {
    console.log(test);
    savedFact.get()
    .then(function(secrets) {
      console.log(secrets);
      $scope.secrets = secrets;
      // $scope.secret.username = $scope.username;
      // $scope.styleIn = secret.inner_style;
      // $scope.styleOut = secret.outer_style;
    });
  };

  $scope.show = function() {
    $scope.ready = true;
  }

  $scope.save = function(secret) {
    receiveFact.post(secret);
  };
});
