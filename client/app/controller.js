angular.module('SpurrCtrl', [])
.controller('Spurr-Ctrl', function ctrl() {
  this.default = '';
  this.test = function(input) {
    return input ? console.log(input) : console.log('Error, input is', input);
  };
});
