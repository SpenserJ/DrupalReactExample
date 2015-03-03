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
    });

    var nutritional = mealItems.reduce(function (total, item) {
      total.calories += (parseInt(item.field_calories, 10) || 0);
      total.total_fats += (parseInt(item.field_total_fats, 10) || 0);
      total.carbohydrates += (parseInt(item.field_carbohydrates, 10) || 0);
      total.dietary_fiber += (parseInt(item.field_dietary_fiber, 10) || 0);
      return total;
    }, {
      calories: 0,
      total_fats: 0,
      carbohydrates: 0,
      dietary_fiber: 0,
    });
    var nutritionalTable = (
      <table>
        <thead>
          <tr>
            <td>Calories</td>
            <td>Total Fats</td>
            <td>Carbohydrates</td>
            <td>Dietary Fiber</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{nutritional.calories}</td>
            <td>{nutritional.total_fats}</td>
            <td>{nutritional.carbohydrates}</td>
            <td>{nutritional.dietary_fiber}</td>
          </tr>
        </tbody>
      </table>
    );

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
        {nutritionalTable}
      </div>
    );
  },
});
