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

  const saveSpurr = function(secret) {
    return new Promise(function(resolve, reject) {
      $http({
        method: 'POST',
        url: '/api/savedSpurrs',
        data: secret,
      }).then(function (res) {
        console.log('done');
        resolve(res.data);
      });
    });
  };

  return {
    get: grabOneSpurr,
    post: saveSpurr,
  };
});

console.log('yo');
