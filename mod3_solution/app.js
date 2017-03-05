(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective)
  .constant('ApiPath', "https://davids-restaurant.herokuapp.com/menu_items.json");

  function FoundItemsDirective() {
    return {
      restrict: 'E',
      templateUrl: 'foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'ctrl',
      bindToController: true,
      link: FoundItemsDirectiveLink
    }
  }

  function FoundItemsDirectiveController() {
    this.getItemsLength = () => this.items ? this.items.length : -1;
  }

  function FoundItemsDirectiveLink(scope, element, attrs, controller) {
    scope.$watch('ctrl.getItemsLength()', (newValue, oldValue) => {
      if (newValue === 0) {
        displayMessage();
      }

      if (newValue > 0) {
        displayItems();
      }
    });

    function displayMessage() {
      const messageElem = element.find('h3.message');
      const listElem = element.find('table.found-items');

      listElem.hide();
      messageElem.slideDown(500);
    }

    function displayItems() {
      const messageElem = element.find('h3.message');
      const listElem = element.find('table.found-items');

      listElem.show();
      messageElem.slideUp(500);
    }
  }

  NarrowItDownController.$inject = [ 'MenuSearchService' ];
  function NarrowItDownController(MenuSearchService) {
    this.input = '';
    this.items = null;

    this.onRemove = index => {
      this.items.splice(index, 1);
    };

    this.onNarrowItDown = input => {
      MenuSearchService.getMatchedMenuItems(input).then(result => {
        this.items = result;
      });
    };
  }

  MenuSearchService.$inject = ['$http', 'ApiPath'];
  function MenuSearchService($http, ApiPath) {
    this.getMatchedMenuItems = searchTerm => {
      return $http({ url: ApiPath })
        .then(response => {
          return searchTerm.trim() ?
            response.data.menu_items.filter(item => {
              return item.name.match(searchTerm.trim()) || item.description.match(searchTerm.trim())
            }) : []
        });
    };
  }

})();
