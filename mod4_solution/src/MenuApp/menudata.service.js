(function () {
'use strict';

angular.module('MenuData')
.service('MenuDataService', MenuDataService)
.constant('ApiPath', "https://davids-restaurant.herokuapp.com/");

MenuDataService.$inject = ['ApiPath', '$http'];
function MenuDataService(ApiPath, $http) {
  this.getAllCategories = () => {
    return $http({
      method: 'GET',
      url: ApiPath + 'categories.json'
    }).then(response => response.data);
  };

  this.getItemsForCategory = categoryShortName => {
    return $http({
      method: 'GET',
      url: ApiPath + 'menu_items.json',
      params: {category: categoryShortName}
    }).then(response => response.data.menu_items);
  }
}

})();
