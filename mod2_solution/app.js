(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = [ 'ShoppingListCheckOffService' ];
  function ToBuyController(ShoppingListCheckOffService) {
    const toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getToBuyItems();

    toBuy.markAsBought = index => ShoppingListCheckOffService.markAsBought(index);

    toBuy.isEmpty = () => isEmpty(toBuy.items);
  }

  AlreadyBoughtController.$inject = [ 'ShoppingListCheckOffService' ];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    const bought = this;

    bought.items = ShoppingListCheckOffService.getBoughtItems();

    bought.markAsLost = index => ShoppingListCheckOffService.markAsLost(index);

    bought.isEmpty = () => isEmpty(bought.items);
  }

  function ShoppingListCheckOffService() {
    const service = this;

    const toBuyItems = [
      { name: "coffee", quantity: 1 },
      { name: "milk", quantity: 2 },
      { name: "bananas", quantity: 10 },
      { name: "gyoza", quantity: 3 },
      { name: "sweet chili sause", quantity: 1 },
    ];

    const boughtItems = [];

    service.getToBuyItems = () => toBuyItems;
    service.getBoughtItems = () => boughtItems;

    service.markAsBought = index => {
      transferItemAtIndex(index, toBuyItems, boughtItems);
    };

    service.markAsLost = index => {
      transferItemAtIndex(index, boughtItems, toBuyItems);
    };
  }

  function transferItemAtIndex(index, source, destination) {
    const [ item ] = source.splice(index, 1);
    destination.push(item);
  }

  function isEmpty(arr) {
    return arr.length === 0;
  }
})();
