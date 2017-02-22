angular.module('Receive-Fact', [])
.factory('receiveFact', function ($http) {
  const grabOneSpurr = function() {
    return new Promise(function(resolve, reject) {
      $http({
        method: 'GET',
        url: '/api/spurrs',
      }).then(function (res) {
        resolve(res.data);
      });
    });
  };

  return {
    get: grabOneSpurr
  };
});

console.log('yo');
