angular.module('Confess-Fact', [])
.factory('confessFact', function ($http, $window) {
  const images = {
    none: '../assets/no-back.png',
    paper: '../assets/paper-back.png',
    letter: '../assets/letter-back.png',
    dot: '../assets/dot-back.png',
    wild: '../assets/crazy-back.png',
    dark: '../assets/cross-back.png',
    love: '../assets/heart-back.png',
  };

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
    images,
    post: postSpurr,
    query: queryImage,
  };
});
