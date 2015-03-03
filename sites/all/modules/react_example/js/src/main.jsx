var Menu = React.createClass({
  getInitialState: function () {
    return {
      // An object full of item ids and their nutritional information.
      items: {},
      // An array of items that make up the user's meal.
      meal: [],
    };
  },

  componentWillMount: function () {
    jQuery.get('/sites/all/modules/react_example/js/data.json', function (data) {
      this.setState({ items: data });
      this.setState({ meal: [536, 541] });
    }.bind(this));
  },

  render: function () {
    var ids = Object.keys(this.state.items);
    var items = jQuery.map(ids, function (id) {
      var item = this.state.items[id]
        , key = 'menu-item-' + id;

      return (
        <MenuItem items={this.state.items} id={id}/>
      );
    }.bind(this));

    return (
      <div className="menu">
        <MealPlanner items={this.state.items} meal={this.state.meal} />
        <div className="menu-items">
          <h1>Menu Items</h1>
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Calories</td>
                <td>Brandon Approved?</td>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>
          </table>
        </div>
      </div>
    );
  },
});

React.render(
  React.createElement(Menu),
  document.getElementById('react-tutorial')
);
