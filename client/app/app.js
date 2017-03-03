const router = function ($routeProvider, $httpProvider) {
  $routeProvider
    .when('/confess', {
      templateUrl: '../views/confess.html',
      controller: 'confessCtrl',
      authenticate: true,
    })
    .when('/receive', {
      templateUrl: '../views/receive.html',
      controller: 'receiveCtrl',
      authenticate: true,
    })
    .when('/secrets', {
      templateUrl: '../views/saved.html',
      controller: 'savedCtrl',
      authenticate: true,
    })
    .when('/about', {
      templateUrl: '../views/about.html',
      controller: 'confessCtrl',
    })
    .when('/home', {
      templateUrl: '../views/home.html',
    })
    .when('/signin', {
      templateUrl: '../views/signin.html',
      controller: 'AuthController',
    })
    .when('/signup', {
      templateUrl: '../views/signup.html',
      controller: 'AuthController',
    })
    .otherwise({
      redirectTo: '/home',
    });
  $httpProvider.interceptors.push('AttachTokens');
};

angular.module('Spurr', [
  'Spurr-Ctrl',
  'Spurr-Fact',
  'Confess-Ctrl',
  'Confess-Fact',
  'Receive-Ctrl',
  'Receive-Fact',
  'Saved-Ctrl',
  'Saved-Fact',
  'Auth-Ctrl',
  'ngRoute',
  'ngMessages'
])
.config(router)
.factory('AttachTokens', function ($window) {
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  const attach = {
    request: function (object) {
      const jwt = $window.localStorage.getItem('com.spurr');
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    },
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', (evt, next) => {
    if (next.$$route && next.$$route.authenticate && !Auth.isAuth()) {
      $location.path('/signin');
    }
  });
});
