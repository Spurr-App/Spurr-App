angular.module('Spurr-Fact', [])
.factory('SpurrFact', function () {
  /**
   * Console log truthy input, or error message followed by input
   * @param {Any} input
   */
  const tester = (input) => {
    if (input) {
      console.warn(input);
    } else {
      console.warn('Error, input is', input);
    }
  };

  /**
   * Returns res with escaped quotation marks
   * @param {String} str
   * @return {String} res
   */
  const escapeText = (str) => {
    let res;
    res = str.replace(/"/g, '\\"');
    res = str.replace(/'/g, "\\'");
    return res;
  };

  const geo = () =>
    new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        const geocoder = new google.maps.Geocoder();
        const geolocate = new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude);
        geocoder.geocode({ latLng: geolocate }, (results, status) => {
          const result = results.length > 4 ? results[5] : results[2];
          if (status === google.maps.GeocoderStatus.OK) {
            resolve(`${result.formatted_address}`);
          }
        });
      });
    });

  return {
    test: tester,
    esc: escapeText,
    geo,
  };
});
