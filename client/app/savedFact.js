angular.module('Saved-Fact', [])
.factory('savedFact', function ($http) {
  /**
   * Gets saved spurrs from the saved_spurrs database
   * Resets received data's style to parsed objects
   * Changes font to 2/3 original size
   * @returns {Function} Promise from get request resolving data
   */
  const grabSavedSpurrs = user =>
    new Promise((resolve) => {
      $http({
        method: 'GET',
        url: '/api/savedSpurrs',
        params: user,
      }).then((res) => {
        res.data.forEach((spurr, index) => {
          res.data[index].inner_style = JSON.parse(res.data[index].inner_style);
          res.data[index].outer_style = JSON.parse(res.data[index].outer_style);
          res.data[index].inner_style['font-size'] = (res.data[index].inner_style['font-size'] / 3) * 2;
        });
        resolve(res.data);
      });
    });

  const openWind = (secret, service) => {
    switch (service) {
      case 'facebook': {
        const fbURL = `http://www.facebook.com/dialog/feed?app_id=${1767308383585120}` +
          `&link=${encodeURIComponent('www.spurralizious.com')}&picture=http://i.imgur.com/Ej3LoGC.png` +
          `&name=${encodeURIComponent('Spurr')}&caption=${'Don\'t you have a secret?'}` +
          `&description=${encodeURIComponent(`Someone whispurred a secret: ${secret.message}`)}&display=popup`;

        return window.open(fbURL, 'feedDialog', 'toolbar=0,status=0,width=626,height=436');
      }
      case 'twitter': {
        const twitURL = `https://twitter.com/share?url=${'https://spurralizious.com'}` +
          `&via=Spurr&text=${encodeURIComponent(`Someone whispurred: ${secret.message}`)}`;
        const width = 575;
        const height = 400;
        const opts = `status=1,width=${width},height=${height}`;
        return window.open(twitURL, 'twitter', opts);
      }
      default: {
        return 'No such path!';
      }
    }
  };

  return {
    get: grabSavedSpurrs,
    openWind,
  };
});
