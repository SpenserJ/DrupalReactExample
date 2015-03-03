var MenuItem = React.createClass({
  mixins: [Reflux.connect(MenuStore.Store, 'store')],

  render: function () {
    var item = this.state.store.items[this.props.id]
      , key = 'menu-item-' + this.props.id;

    return (
      <tr key={key}>
        <td>{item.name}</td>
        <td>{item.field_calories}</td>
        <td><input type="checkbox" disabled checked={item.field_brandon_thordarson === '1'} /></td>
      </tr>
    );
  },
});
