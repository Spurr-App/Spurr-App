angular.module('Spurr-Fact', [])
.factory('SpurrFact', function () {
  const test = function (input) {
    return input ? console.log(input) : console.log('Error, input is', input);
  };

  return {
    test: test,
  };
});
