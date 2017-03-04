angular.module('Confess-Ctrl', [])
.controller('confessCtrl', function ($scope, SpurrFact, confessFact) {
  $scope.showSender = true;
  $scope.showRecipient = true;
  $scope.showDate = true;
  $scope.showLocation = true;

  $scope.fonts = [
    'Tangerine','Poiret One','Open Sans','Diplomata SC','Baloo','Griffy','Oswald',
    'Montserrat','Merriweather','Rochester','Sirin Stencil','Indie Flower','Bitter',
    'Fjalla One','Inconsolata','Dosis','Anton','Cabin','Arvo','Fascinate Inline',
    'Vampiro One','Josefin Sans','Ravi Prakash','Mr Dafoe','Plaster','Frijole','Mogra',
    'Faster One','Bungee','Monoton','Aladin','Rancho','Mirza','Simonetta','Farsan',
    'Yesteryear','Lancelot','Wallpoet','Patrick Hand SC','Barrio','Rakkas','Angkor',
    'Concert One','Mrs Saint Delafield','Erica One','Almendra Display','Squada One',
    'New Rocker','Audiowide','Chelsea Market',
  ].sort();

  $scope.sizes = {
    'X-Small': 9,
    Small: 12,
    Medium: 15,
    Large: 21,
    'X-Large': 30,
  };

  $scope.images = {
    none: 'none',
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
    'background-size':'',
    'background-image': 'none',
    'background-color': 'lightgrey',
  };

  $scope.secret = {
    sender: 'Sender',
    recipient: 'Recipient',
    date: new Date().toDateString(),
    location: 'NOLA', // TODO: GEOLOCATE DYNAMIC LOCATION
    message: 'Message',
    inner_style: JSON.stringify($scope.styleIn),
    outer_style: JSON.stringify($scope.styleOut),
  };

  /**
   * Sets styles of $scope.secret object
   * Styles must be stringified before being sent to database
   */
  $scope.set = function () {
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
  $scope.setFont = function (font, size, color) {
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
  $scope.setBackground = function (url, color) {
    if (url) {
      if (url === 'none') {
        $scope.styleOut['background-image'] = 'none';
      }
      $scope.styleOut['background-image'] = `url(${url})`;
    } else if (color) {
      $scope.styleOut['background-color'] = color;
    }
    $scope.set();
  };

  $scope.searchForImage = function(query) {
    $scope.images = {
      none: 'none',
      paper: '../assets/paper-back.png',
      letter: '../assets/letter-back.png',
      dot: '../assets/dot-back.png',
      wild: '../assets/crazy-back.png',
      dark: '../assets/cross-back.png',
      love: '../assets/heart-back.png',
    };
    confessFact.query(query)
        .then((imagesUrls) => {
        console.log(imagesUrls,'img')
        // $scope.images[]=blah
        imagesUrls.data.forEach((image)=>{
          $scope.images[image.id] = image.url
        });
      }).catch(err => console.warn(err));
  }


  /**
   * Checks if secret should send its sender, recipient, date, and location
   * Sets any of those four to null if necessary
   * Escapes quotation marks in secret.message
   * Runs a function from confessFact to post secret to the database
   * @param {object} secret
   */
  $scope.confess = function (secret) {
    if (!$scope.showSender) {
      secret.sender = null;
    } else if (!$scope.showRecipient) {
      secret.recipient = null;
    } else if (!$scope.showDate) {
      secret.date = null;
    } else if (!$scope.showlocation) {
      secret.location = null;
    }
    secret.message = SpurrFact.esc(secret.message);
    confessFact.post(secret);
  };
  var modal = document.getElementById('myModal');

  // Get the button that opens the modal
  var btn = document.getElementById("myBtn");

  // Get the <span> element that closes the modal
  var span = document.getElementsByClassName("close")[0];

  // When the user clicks the button, open the modal
  btn.onclick = function() {
      modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
      modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
      if (event.target == modal) {
          modal.style.display = "none";
      }
  }
});
