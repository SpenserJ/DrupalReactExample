var MenuList = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  getInitialState: function () {
    return {
      filter: '',
      vegetarian: false,
      brandon: false,
    };
  },

  updateFilter: function (e) {
    var newFilter = {};
    if (e.target.type === 'checkbox') {
      newFilter[e.target.name] = e.target.checked;
    } else {
      newFilter[e.target.name] = e.target.value;
    }
    this.setState(newFilter);
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
    })
    // Filter out items that don't meet our vegetarian filter.
    .filter(function (item) {
      return (this.state.vegetarian === false
           || item.field_vegetarian == this.state.vegetarian);
    }.bind(this))
    // Filter out items that don't meet our Brandon filter.
    .filter(function (item) {
      return (this.state.brandon === false
           || item.field_brandon_thordarson == this.state.brandon);
    }.bind(this))
    // Map item objects into rendered content.
    .map(function (item) {
      return (<MenuItem key={'menu-item-' + item.id} item={item} />);
    });

    return (
      <div className="menu-items">
        <h1>Menu Items</h1>
        <span>
          <label>Filter: </label>
          <input type="text" size="60" name="filter" onChange={this.updateFilter} />
        </span>
        <span>
          <label>Vegetarian: </label>
          <input type="checkbox" name="vegetarian" onChange={this.updateFilter} />
        </span>
        <span>
          <label>Brandon Approved: </label>
          <input type="checkbox" name="brandon" onChange={this.updateFilter} />
        </span>
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
