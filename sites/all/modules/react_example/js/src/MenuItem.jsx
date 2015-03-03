var MenuItem = React.createClass({
  render: function () {
    var item = this.props.item;

    var inMeal = (typeof this.props.inMeal !== 'undefined' && this.props.inMeal);
    var actionClick = (inMeal)
          ? MenuStore.Actions.removeFromMeal.bind(null, item.id)
          : MenuStore.Actions.addToMeal.bind(null, item.id);

    return (
      <tr>
        <td>{item.name}</td>
        <td>{item.field_calories}</td>
        <td><input type="checkbox" disabled checked={item.field_brandon_thordarson === '1'} /></td>
        <td><input type="button" value={inMeal ? 'Remove from meal' : 'Add to meal'} onClick={actionClick} /></td>
      </tr>
    );
  },
});
