(function () {
"use strict";

angular.module('public')
.service('SignupService', SignupService);


SignupService.$inject = ['$http', 'ApiPath'];
function SignupService($http, ApiPath) {
  var service = this;
  service.user = null;

  service.submit = function(form) {
    return service.checkMenuItem(form.menuNumber)
    .then(function(response) {
      if (!response.error) {
        service.user = Object.assign({}, form, { favouriteDish: response });
      }

      return response;
    });
  };

  service.checkMenuItem = function (shortName) {
    return $http.get(ApiPath + '/menu_items/' + shortName.toUpperCase() + '.json')
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        return error.data;
      });
  };

}

})();
