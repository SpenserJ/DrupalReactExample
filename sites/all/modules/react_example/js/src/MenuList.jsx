var MenuList = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  getInitialState: function () {
    return {
      terms: [],
      vegetarian: false,
      brandon: false,
    };
  },

  updateFilter: function (e) {
    var newFilter = {};
    if (e instanceof Array) {
      newFilter.terms = e;
    } else if (e.target.type === 'checkbox') {
      newFilter[e.target.name] = e.target.checked;
    } else {
      newFilter[e.target.name] = e.target.value;
    }
    this.setState(newFilter);
  },

  render: function () {
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
      if (this.state.terms.length === 0) { return true; }
      var matches = this.state.terms.filter(function (term) {
        return item.name.indexOf(term) > -1;
      });
      return (matches.length === this.state.terms.length);
    }.bind(this))
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
          <label>Search Terms: </label>
          <ReactTagsInput ref="terms" onChange={this.updateFilter} />
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
