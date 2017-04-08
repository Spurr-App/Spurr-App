// do not tamper with this code in here, study it, but do not touch
// this Auth controller is responsible for our client side authentication
// in our signup/signin forms using the injected Auth service
angular.module('Auth-Ctrl', [])

.controller('AuthController', function ($rootScope, $scope, $window, $location, Auth) {
  $scope.user = {};

  $scope.signin = () => {
    Auth.signin($scope.user)
      .then((data) => {
        $scope.user = { data };
        $rootScope.user = { data };
        $window.localStorage.setItem('com.spurr', undefined);
        $location.path('/confess');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  $scope.signup = () => {
    Auth.signup($scope.user)
      .then((data) => {
        $scope.user = { data };
        $window.localStorage.setItem('com.spurr', undefined);
        $location.path('/confess');
      })
      .catch((error) => {
        console.error(error);
      });
  };
})
.factory('Auth', ($http, $location, $window) => {
  // Don't touch this Auth service!!!
  // it is responsible for authenticating our user
  // by exchanging the user's username and password
  // for a JWT from the server
  // that JWT is then stored in localStorage as 'com.shortly'
  // after you signin/signup open devtools, click resources,
  // then localStorage and you'll see your token from the server
  const signInUser = user =>
    $http({
      method: 'POST',
      url: '/api/users/signin',
      data: user,
    })
    .then(resp => resp.data);

  const signUpUser = user =>
   $http({
     method: 'POST',
     url: '/api/users/signup',
     data: user,
   })
    .then(resp => resp.data);

  const isAuthourized = () => !!$window.localStorage.getItem('com.spurr');

  const signOutUser = () => {
    $window.localStorage.removeItem('com.spurr');
    $location.path('/signin');
  };


  return {
    signin: signInUser,
    signup: signUpUser,
    isAuth: isAuthourized,
    signout: signOutUser,
  };
});
