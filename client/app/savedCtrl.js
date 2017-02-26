angular.module('Saved-Ctrl', [])
.controller('savedCtrl', function ($scope, savedFact) {
  $scope.username = 'liv';

  $scope.styleIn = null;
  $scope.styleOut = null;

  $scope.ready = false;

  $scope.secrets = [];

  $scope.get = function (test) {
    console.log(test);
    savedFact.get()
    .then(function (secrets) {
      console.log(secrets);
      $scope.secrets = secrets;
    });
  };

  $scope.show = function () {
    $scope.ready = true;
  }

  $scope.save = function (secret) {
    receiveFact.post(secret);
  };
});
