(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['SignupService', '$location'];
function SignupController(SignupService, $location) {
  var $ctrl = this;

  $ctrl.error = false;
  $ctrl.success = SignupService.user ? true : false;

  $ctrl.submit = function() {
    $ctrl.form = {
      firstName: $ctrl.firstName,
      lastName: $ctrl.lastName,
      email: $ctrl.email,
      phone: $ctrl.phone,
      menuNumber: $ctrl.menuNumber
    };

    SignupService
    .submit($ctrl.form)
    .then(function(response) {
      if (response.error) {
        $ctrl.error = true;
      }
      else {
        $ctrl.error = false;
        $ctrl.success = true;
      }
    });
  };

  $ctrl.change = function() {
    $ctrl.success = false;
  };

  $ctrl.myInfo = function() {
    $location.path('/my-info');
  }
}

})();
