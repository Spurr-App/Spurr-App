angular.module('Confess-Fact', [])
.factory('confessFact', function ($http, $window) {
  /**
   * Sends secret to the spurrs database
   * Redirects to receive view
   * @param {Object} secret
   * @returns {Secret} Promise from post request
   */
  const postSpurr = secret =>
    $http({
      method: 'POST',
      url: '/api/spurrs',
      data: secret,
    }).then(() => {
      $window.location.href = '#!/receive';
    });

  const queryImage = query =>
    $http({
      method: 'GET',
      url: '/api/imagequery',
      params: {
        data: query,
      },
    }).then(imagesUrls => imagesUrls);

  return {
    post: postSpurr,
    query: queryImage,
  };
});
