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
    }.bind(this));
  },

  render: function () {
    var ids = Object.keys(this.state.items);
    var items = jQuery.map(ids, function (id) {
      var item = this.state.items[id]
        , key = 'menu-item-' + id;

      return (
        <tr key={key}>
          <td>{item.name}</td>
          <td>{item.field_calories}</td>
        </tr>
      );
    }.bind(this));

    return (
      <div className="menu">
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Calories</td>
            </tr>
          </thead>
          <tbody>
            {items}
          </tbody>
        </table>
      </div>
    );
  },
});

React.render(
  React.createElement(Menu),
  document.getElementById('react-tutorial')
);
