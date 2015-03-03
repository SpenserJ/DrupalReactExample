var Menu = React.createClass({
  getInitialState: function () {
    return {
      // An object full of item ids and their nutritional information.
      items: {},
      // An array of items that make up the user's meal.
      meal: [],
    };
  },

  componentWillMount: function () {
    jQuery.get('/sites/all/modules/react_example/js/data.json', function (data) {
      this.setState({ items: data });
    }.bind(this));
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
