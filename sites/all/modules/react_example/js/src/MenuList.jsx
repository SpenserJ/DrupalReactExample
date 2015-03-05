var MenuList = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  getInitialState: function () {
    return { filter: '', };
  },

  updateFilter: function (e) {
    this.setState({ filter: e.target.value, });
  },

  render: function () {
    var items = Object.keys(this.state.store.items)
    .filter(function (id) {
      return jQuery.inArray(id, this.state.store.meal) === -1;
    }.bind(this))
    .map(function (id) {
      return this.state.store.items[id];
    }.bind(this))
    .filter(function (item) {
      return (this.state.filter === ''
           || item.name.indexOf(this.state.filter) > -1);
    }.bind(this))
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
