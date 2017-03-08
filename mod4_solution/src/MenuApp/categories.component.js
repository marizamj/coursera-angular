(function () {
'use strict';

angular.module('MenuApp')
.component('categories', {
  templateUrl: 'src/MenuApp/templates/categoriescomponent.template.html',
  bindings: {
    categories: '<'
  }
});

})();
