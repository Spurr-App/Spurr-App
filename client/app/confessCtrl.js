angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($rootScope, $scope, SpurrFact, confessFact) {
  $scope.showSender = true;
  $scope.showRecipient = true;
  $scope.showDate = true;
  $scope.showLocation = true;
  const modal = document.getElementById('myModal');

  $scope.fonts = [
    'Tangerine', 'Poiret One', 'Open Sans', 'Diplomata SC', 'Baloo', 'Griffy', 'Oswald',
    'Montserrat', 'Merriweather', 'Rochester', 'Sirin Stencil', 'Indie Flower', 'Bitter',
    'Fjalla One', 'Inconsolata', 'Dosis', 'Anton', 'Cabin', 'Arvo', 'Fascinate Inline',
    'Vampiro One', 'Josefin Sans', 'Ravi Prakash', 'Mr Dafoe', 'Plaster', 'Frijole', 'Mogra',
    'Faster One', 'Bungee', 'Monoton', 'Aladin', 'Rancho', 'Mirza', 'Simonetta', 'Farsan',
    'Yesteryear', 'Lancelot', 'Wallpoet', 'Patrick Hand SC', 'Barrio', 'Rakkas', 'Angkor',
    'Concert One', 'Mrs Saint Delafield', 'Erica One', 'Almendra Display', 'Squada One',
    'New Rocker', 'Audiowide', 'Chelsea Market',
  ].sort();

  $scope.sizes = {
    'X-Small': 9,
    Small: 12,
    Medium: 15,
    Large: 21,
    'X-Large': 30,
  };

  $scope.images = {
    paper: '../assets/paper-back.png',
    letter: '../assets/letter-back.png',
    dot: '../assets/dot-back.png',
    wild: '../assets/crazy-back.png',
    dark: '../assets/cross-back.png',
    love: '../assets/heart-back.png',
  };

  $scope.styleIn = {
    'font-family': 'arial',
    'font-size': '15px',
    color: 'black',
  };

  $scope.styleOut = {
    'background-size': '',
    'background-image': 'none',
    'background-color': 'lightgrey',
  };

  $scope.secret = {
    sender: 'Sender',
    recipient: 'Recipient',
    date: new Date().toDateString(),
    location: 'Getting location...',
    message: 'Message',
    inner_style: JSON.stringify($scope.styleIn),
    outer_style: JSON.stringify($scope.styleOut),
  };

  $scope.setLocation = () => {
    SpurrFact.geo()
      .then((citySt) => {
        $scope.secret.location = citySt;
      })
      .catch(() => {
        $scope.secret.location = 'Earth';
      });
  };
  $scope.setLocation();

  /**
   * Sets styles of $scope.secret object
   * Styles must be stringified before being sent to database
   */
  $scope.set = () => {
    $scope.secret.inner_style = JSON.stringify($scope.styleIn);
    $scope.secret.outer_style = JSON.stringify($scope.styleOut);
  };

  /**
   * Changes an aspect of the styleIn depending on which arguments are passed
   * Calls $scope.set to re-stringify styles
   * @param {String} font
   * @param {String} size
   * @param {String} color
   */
  $scope.setFont = (font, size, color) => {
    if (font) {
      $scope.styleIn['font-family'] = font;
    } else if (size) {
      $scope.styleIn['font-size'] = `${size}px`;
    } else if (color) {
      $scope.styleIn.color = color;
    }
    $scope.set();
  };

  /**
   * Changes an aspect of the styleOut depending on which arguments are passed
   * Calls $scope.set to re-stringify styles
   * @param {String} url
   * @param {String} color
   */

  $scope.setBackground = (url, color) => {
    if (!url && !color) {
      $scope.styleOut['background-image'] = 'none';
      $scope.styleOut['background-color'] = 'lightgrey';
    } else if (url) {
      $scope.styleOut['background-image'] = `url(${url})`;
    } else {
      $scope.styleOut['background-color'] = color;
    }
    // close modal on click
    modal.style.display = 'none';

    $scope.set();
  };


  let previousQuery;

  $scope.searchForImage = function (query) {
    modal.style.display = 'block';
    if (query !== previousQuery) {
      previousQuery = query;
      $scope.images = {
        paper: '../assets/paper-back.png',
        letter: '../assets/letter-back.png',
        dot: '../assets/dot-back.png',
        wild: '../assets/crazy-back.png',
        dark: '../assets/cross-back.png',
        love: '../assets/heart-back.png',
      };
      // open modal//

      confessFact.query(query)
          .then((imagesUrls) => {
            imagesUrls.data.forEach((image) => {
              $scope.images[image.id] = image.url;
            });
          }).catch(err => console.warn(err));
    }
  };

  /**
   * Checks if secret should send its sender, recipient, date, and location
   * Sets any of those four to null if necessary
   * Escapes quotation marks in secret.message
   * Runs a function from confessFact to post secret to the database
   * @param {object} secret
   */
  $scope.confess = (secret) => {
    const secretBuilder = secret;
    if (!$scope.showSender) {
      secretBuilder.sender = null;
    } else if (!$scope.showRecipient) {
      secretBuilder.recipient = null;
    } else if (!$scope.showDate) {
      secretBuilder.date = null;
    } else if (!$scope.showlocation || $scope.location === 'Getting location...') {
      secretBuilder.location = null;
    }
    secretBuilder.message = SpurrFact.esc(secretBuilder.message);
    confessFact.post(secretBuilder, $rootScope.user);
  };
});
