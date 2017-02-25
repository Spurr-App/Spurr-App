angular.module('Receive-Fact', [])
.factory('receiveFact', function ($http, $window) {
  const grabOneSpurr = function() {
    return new Promise(function(resolve, reject) {
      $http({
        method: 'GET',
        url: '/api/spurrs',
      }).then(function (res) {
        res.data.inner_style = JSON.parse(res.data.inner_style);
          res.data.outer_style = JSON.parse(res.data.outer_style);
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
        $window.location.href = "#!/secrets";
      });
    });
  };

  return {
    get: grabOneSpurr,
    post: saveSpurr,
  };
});
