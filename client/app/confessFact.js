angular.module('Confess-Fact', [])
.factory('confessFact', function ($http, $window) {
  const msgTexts = Array.from(document.getElementsByClassName('msgText'));
  const changeFont = function (font, size) {
    if (font) {
      msgTexts.forEach(function (text) {
        text.style.fontFamily = font;
      });
    } else if (size) {
      msgTexts.forEach(function (text) {
        text.style.fontSize = size + 'px';
      });
    }
  }

  const changeBgColor = function (color) {
    console.log(color)
    const msg = document.getElementById('confessional');
    msg.style.backgroundColor = color;
  }

  const changeImage = function (url) {
    const msg = document.getElementById('confessional');
    msg.style.backgroundImage = `url(${url})`;
  }

  const postSpurr = function post(secret) {
    return $http({
      method: 'POST',
      url: '/api/spurrs',
      data: secret,
    }).then(function (res) {
      console.log('success', res);
      $window.location.href = "#!/receive";
    });
  };

  const getSpurr = function post(secret) {
    console.log('post', secret);
    return $http({
      method: 'GET',
      url: '/api/spurrs',
      data: secret,
    }).then(function (res) {
      console.log('success', res);
    });
  };

  return {
    font: changeFont,
    img: changeImage,
    bgColor: changeBgColor,
    post: postSpurr,
    get: getSpurr,
  };
});
