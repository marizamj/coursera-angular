(function () {
"use strict";

angular.module('public')
.controller('MyInfoController', MyInfoController);

MyInfoController.$inject = ['SignupService', 'ApiPath', '$location'];
function MyInfoController(SignupService, ApiPath, $location) {
  var $ctrl = this;
  $ctrl.basePath = ApiPath;

  $ctrl.user = SignupService.user;

  $ctrl.signUp = function() {
    $location.path('/signup');
  };

}

})();
