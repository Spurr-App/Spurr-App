angular.module('Receive-Fact', [])
.factory('receiveFact', function ($http, $window) {
  /**
   * Gets one spurr from the spurrs database
   * Resets received data's style to parsed objects
   * @returns {Function} Promise from get request resolving data
   */
  const grabOneSpurr = function () {
    return new Promise((resolve) => {
      $http({
        method: 'GET',
        url: '/api/spurrs',
      }).then((res) => {
        res.data.inner_style = JSON.parse(res.data.inner_style);
        res.data.outer_style = JSON.parse(res.data.outer_style);
        resolve(res.data);
      });
    });
  };

  /**
   * Sends secret to the savedSpurrs database
   * Redirects to secrets view
   * @param {Object} secret
   * @returns {Function} Promise from post request
   */
  const saveSpurr = function (secret, user) {
    return new Promise(() => {
      $http({
        method: 'POST',
        url: '/api/savedSpurrs',
        data: {
          secret,
          user,
        }
      }).then(() => {
        $window.location.href = '#!/secrets';
      });
    });
  };

  return {
    get: grabOneSpurr,
    post: saveSpurr,
  };
});
