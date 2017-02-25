angular.module('Saved-Fact', [])
.factory('savedFact', function ($http, $window) {
  const grabOneSpurr = function() {
    return new Promise(function(resolve, reject) {
      $http({
        method: 'GET',
        url: '/api/savedSpurrs',
      }).then(function (res) {
        res.data.forEach(function(spurr, index) {
          res.data[index].inner_style = JSON.parse(res.data[index].inner_style);
          res.data[index].outer_style = JSON.parse(res.data[index].outer_style);
          res.data[index].inner_style['font-size'] = res.data[index].inner_style['font-size'] / 3 * 2;
        })
        resolve(res.data);
      });
    });
  };

  return {
    get: grabOneSpurr,
  };
});
