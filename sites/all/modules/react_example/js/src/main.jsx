var Menu = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  render: function () {
    var ids = Object.keys(this.state.store.items);
    var items = jQuery.map(ids, function (id) {
      var item = this.state.store.items[id]
        , key = 'menu-item-' + id;

      return (
        <MenuItem id={id}/>
      );
    }.bind(this));

    return (
      <div className="menu">
        <MealPlanner />
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
