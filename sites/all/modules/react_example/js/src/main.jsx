var Menu = React.createClass({
  getInitialState: function () {
    return {
      // An object full of item ids and their nutritional information.
      items: {
        '1': {
          name: 'Steak',
          calories: 420,
        }
      },
      // An array of items that make up the user's meal.
      meal: [],
    };
  },

  render: function () {
    var ids = Object.keys(this.state.items);
    var items = jQuery.map(ids, function (id) {
      var item = this.state.items[id]
        , key = 'menu-item-' + id;

      return (<h2 key={key}>{item.name}</h2>);
    }.bind(this));

    return (
      <div className="menu">
        <h1>It works!</h1>
        {items}
      </div>
    );
  },
});

React.render(
  React.createElement(Menu),
  document.getElementById('react-tutorial')
);
