const router = function ($routeProvider) {
  $routeProvider
    .when('/confess', {
      templateUrl: '../views/confess.html',
      controller: 'confessCtrl',
    })
    .when('/receive', {
      templateUrl: '../views/receive.html',
      controller: 'receiveCtrl',
    })
    .when('/secrets', {
      templateUrl: '../views/saved.html',
      // controller: '',
    })
    .when('/about', {
      templateUrl: '../views/about.html',
      controller: 'confessCtrl',
    })
    .when('/signin', {
      templateUrl: '../views/signin.html',
      controller: 'confessCtrl',
    })
    .when('/signup', {
      templateUrl: '../views/signup.html',
      controller: 'confessCtrl',
    })
    .otherwise({
      redirectTo: '/confess',
    });
};

angular.module('Spurr', [
  'Spurr-Ctrl',
  'Spurr-Fact',
  'Confess-Ctrl',
  'Confess-Fact',
  'Receive-Ctrl',
  'Receive-Fact',
  'ngRoute',
  'ngMessages',
])
.config(router);
