"use strict";var Menu=React.createClass({displayName:"Menu",getInitialState:function(){return{items:{},meal:[]}},componentWillMount:function(){jQuery.get("/sites/all/modules/react_example/js/data.json",function(e){this.setState({items:e})}.bind(this))},render:function(){var e=Object.keys(this.state.items),t=jQuery.map(e,function(e){var t=this.state.items[e],a="menu-item-"+e;return React.createElement("tr",{key:a},React.createElement("td",null,t.name),React.createElement("td",null,t.field_calories))}.bind(this));return React.createElement("div",{className:"menu"},React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("td",null,"Name"),React.createElement("td",null,"Calories"))),React.createElement("tbody",null,t)))}});React.render(React.createElement(Menu),document.getElementById("react-tutorial"));
//# sourceMappingURL=react_example.js.map