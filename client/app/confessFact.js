angular.module('Confess-Fact', [])
.factory('confessFact', function ($http) {
  const postSpurr = function post(secret) {
    console.log('post', secret);
    return $http({
      method: 'POST',
      url: '/api/spurrs',
      data: secret,
    }).then(function successCallback(res) {
      console.log(res);
    }, function errorCallback(res) {
      console.log(res);
    });
  };

  const getSpurr = function post(secret) {
    console.log('post', secret);
    return $http({
      method: 'GET',
      url: '/api/spurrs',
      data: secret,
    }).then(function successCallback(res) {
      console.log(res);
    }, function errorCallback(res) {
      console.log(res);
    });
  };

  return {
    post: postSpurr,
    get: getSpurr,
  };
});
