var MenuStore = {};

(function () {
  var _store = {
    // An object full of item ids and their nutritional information.
    items: {},
    // An array of items that make up the user's meal.
    meal: [],
  };

  MenuStore.Actions = Reflux.createActions([
    'initMenu',
    'addToMeal',
    'removeFromMeal',
  ]);

  MenuStore.Store = Reflux.createStore({
    listenables: [MenuStore.Actions],

    getInitialState: function () {
      return _store;
    },

    onInitMenu: function (menu) {
      jQuery.extend(_store.items, menu);

      this.trigger(_store);
    },

    onAddToMeal: function (id) {
      // IDs are stored as a string by the JSON.
      id = '' + id;

      // If the item is already in our meal, ignore it.
      if (jQuery.inArray(id, _store.meal) !== -1) { return; }

      _store.meal.push(id);

      this.trigger(_store);
    },

    onRemoveFromMeal: function (id) {
      // IDs are stored as a string by the JSON.
      id = '' + id;

      // Remove any item with the same ID from the meal.
      _store.meal = jQuery.grep(_store.meal, function (test) {
        return id != test;
      });

      this.trigger(_store);
    },
  });
})();

jQuery.get('/sites/all/modules/react_example/js/data.json', function (data) {
  MenuStore.Actions.initMenu(data);
});
