(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = [ '$scope' ];
  function LunchCheckController($scope) {
    $scope.input = '';
    $scope.message = '';
    $scope.messageColorClass = '';

    $scope.checkIfTooMuch = function() {
      const count = countItems($scope.input);

      switch (true) {
        case count === 0:
          setMessageAndColor('Please enter data first', 'red');
          break;

        case count < 4:
          setMessageAndColor('Enjoy!', 'green');
          break;

        default:
          setMessageAndColor('Too much!', 'green');
      }
    }

    function setMessageAndColor(text, color) {
      $scope.message = text;
      $scope.messageColorClass = color;
    }

    function countItems(string) {
      if (!string) return 0;
      return string.split(',').filter(el => el.trim()).length;
    }
  }
})();
