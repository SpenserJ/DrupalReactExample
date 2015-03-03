var MealPlanner = React.createClass({
  render: function () {
    var meal = this.props.meal.map(function (id) {
      var item = this.props.items[id]
        , key = 'menu-item-' + id;

      return (
        <MenuItem items={this.props.items} id={id}/>
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
