angular.module('Saved-Fact', [])
.factory('savedFact', function ($http, $window) {
  const grabOneSpurr = function() {
    return new Promise(function(resolve, reject) {
      $http({
        method: 'GET',
        url: '/api/savedSpurrs',
      }).then(function (res) {
        resolve(res.data);
      });
    });
  };

  return {
    get: grabOneSpurr,
  };
});
