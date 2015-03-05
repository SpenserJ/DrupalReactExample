var MenuList = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  getInitialState: function () {
    return { filter: '', };
  },

  updateFilter: function (e) {
    this.setState({ filter: e.target.value, });
  },

  render: function () {
    var searchFilter = this.state.filter.split(/(?:\s|,)/);
    var items = Object.keys(this.state.store.items)
    // Filter out items that are listed in our meal.
    .filter(function (id) {
      return jQuery.inArray(id, this.state.store.meal) === -1;
    }.bind(this))
    // Map item ids to menu item objects.
    .map(function (id) {
      return this.state.store.items[id];
    }.bind(this))
    // Filter out items that don't match all search terms.
    .filter(function (item) {
      if (searchFilter.length === 0) { return true; }
      var matches = searchFilter.filter(function (term) {
        return item.name.indexOf(term) > -1;
      });
      return (matches.length === searchFilter.length);
    }.bind(this))
    // Map item objects into rendered content.
    .map(function (item) {
      return (<MenuItem key={'menu-item-' + item.id} item={item} />);
    });

    return (
      <div className="menu-items">
        <h1>Menu Items</h1>
        <div>
          <label>Filter: </label><input type="text" size="60" onChange={this.updateFilter} />
        </div>
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
    );
  },
});
