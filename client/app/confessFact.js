angular.module('Confess-Fact', [])
.factory('confessFact', function ($http, $window) {
  /**
   * Sends secret to the spurrs database
   * Redirects to receive view
   * @param {Object} secret
   * @returns {Secret} Promise from post request
   */
  const postSpurr = function post(secret) {
    return $http({
      method: 'POST',
      url: '/api/spurrs',
      data: secret
    }).then((res) => {
      $window.location.href = '#!/receive';
    });
  };

  const queryImage = function get(query) {
    return $http({
      method: 'GET',
      url: '/api/imagequery',
      params:{
        data: query
      },
    }).then((imagesUrls) => {
      return imagesUrls;
    });
  };

  return {
    post: postSpurr,
    query: queryImage,
  };
});
