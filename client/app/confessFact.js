angular.module('Confess-Fact', [])
.factory('confessFact', function ($http, $window) {
  const postSpurr = function post(secret) {
    return $http({
      method: 'POST',
      url: '/api/spurrs',
      data: secret,
    }).then(function (res) {
      console.log('success', res);
      $window.location.href = "#!/secrets";
    });
  };

  const getSpurr = function post(secret) {
    console.log('post', secret);
    return $http({
      method: 'GET',
      url: '/api/spurrs',
      data: secret,
    }).then(function (res) {
      console.log('success', res);
    });
  };

  return {
    post: postSpurr,
    get: getSpurr,
  };
});
