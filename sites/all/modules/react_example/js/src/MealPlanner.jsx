var MealPlanner = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  render: function () {
    var mealItems = this.state.store.meal.map(function (id) {
      return this.state.store.items[id]
    }.bind(this));

    if (mealItems.length === 0) {
      return null;
    }

    var meal = mealItems.map(function (item) {
      var key = 'menu-item-' + item.id;

      return (
        <MenuItem key={key} item={item} inMeal='true' />
      );
    }.bind(this));

    return (
      <div className="meal-planner">
        <h1>Meal Planner</h1>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Calories</td>
              <td>Brandon Approved?</td>
            </tr>
          </thead>
          <tbody>
            {meal}
          </tbody>
        </table>
      </div>
    );
  },
});
