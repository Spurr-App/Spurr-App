angular.module('Saved-Fact', [])
.factory('savedFact', function ($http) {
  /**
   * Gets saved spurrs from the saved_spurrs database
   * Resets received data's style to parsed objects
   * Changes font to 2/3 original size
   * @returns {Function} Promise from get request resolving data
   */
  const grabSavedSpurrs = function () {
    return new Promise((resolve) => {
      $http({
        method: 'GET',
        url: '/api/savedSpurrs',
      }).then((res) => {
        res.data.forEach((spurr, index) => {
          res.data[index].inner_style = JSON.parse(res.data[index].inner_style);
          res.data[index].outer_style = JSON.parse(res.data[index].outer_style);
          res.data[index].inner_style['font-size'] = (res.data[index].inner_style['font-size'] / 3) * 2;
        });
        resolve(res.data);
      });
    });
  };

  return {
    get: grabSavedSpurrs,
  };
});
