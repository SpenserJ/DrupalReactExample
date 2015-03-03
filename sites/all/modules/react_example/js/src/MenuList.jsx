var MenuList = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  render: function () {
    var ids = Object.keys(this.state.store.items);
    ids = ids.filter(function (id) {
      return jQuery.inArray(id, this.state.store.meal) === -1;
    }.bind(this));
    var items = jQuery.map(ids, function (id) {
      var item = this.state.store.items[id]
        , key = 'menu-item-' + id;

      return (<MenuItem key={key} item={item}/>);
    }.bind(this));

    return (
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
    );
  },
});
