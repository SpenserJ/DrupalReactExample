var Menu = React.createClass({
  render: function () {
    return (
      <div className="menu">
        <h1>It works!</h1>
      </div>
    );
  },
});

React.render(
  React.createElement(Menu),
  document.getElementById('react-tutorial')
);
