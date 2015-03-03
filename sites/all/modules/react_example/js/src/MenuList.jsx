var MenuList = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  render: function () {
    var ids = Object.keys(this.state.store.items);
    var items = jQuery.map(ids, function (id) {
      var key = 'menu-item-' + id;
      return (<MenuItem key={key} id={id}/>);
    });

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
