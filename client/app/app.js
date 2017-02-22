const router = function ($routeProvider) {
  $routeProvider
    .when('/test', {
      templateUrl: '../views/test.html',
      // controller: '',
    })
    .when('/secrets', {
      templateUrl: '../views/secrets.html',
      // controller: '',
    })
    .when('/confess', {
      templateUrl: '../views/confess.html',
      controller: 'confessCtrl',
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
      redirectTo: '/test',
    });
};

angular.module('Spurr', [
  'Spurr-Ctrl',
  'Spurr-Fact',
  'Confess-Ctrl',
  'Confess-Fact',
  'ngRoute',
  'ngMessages',
])
.config(router);
