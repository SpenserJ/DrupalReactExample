var MealPlanner = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  render: function () {
    var meal = this.state.store.meal.map(function (id) {
      var item = this.state.store.items[id]
        , key = 'menu-item-' + id;

      return (
        <MenuItem id={id}/>
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
