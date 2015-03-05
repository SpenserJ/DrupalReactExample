"use strict";var MenuStore={};!function(){var e={items:{},meal:[]};MenuStore.Actions=Reflux.createActions(["initMenu","addToMeal","removeFromMeal"]),MenuStore.Store=Reflux.createStore({listenables:[MenuStore.Actions],getInitialState:function(){return e},onInitMenu:function(t){jQuery.extend(e.items,t),this.trigger(e)},onAddToMeal:function(t){t=""+t,-1===jQuery.inArray(t,e.meal)&&(e.meal.push(t),this.trigger(e))},onRemoveFromMeal:function(t){t=""+t,e.meal=jQuery.grep(e.meal,function(e){return t!=e}),this.trigger(e)}})}(),jQuery.get("/sites/all/modules/react_example/js/data.json",function(e){MenuStore.Actions.initMenu(e)});var MealPlanner=React.createClass({displayName:"MealPlanner",mixins:[Reflux.connect(MenuStore.Store,"store")],render:function(){var e=this.state.store.meal.map(function(e){return this.state.store.items[e]}.bind(this));if(0===e.length)return null;var t=e.map(function(e){var t="menu-item-"+e.id;return React.createElement(MenuItem,{key:t,item:e,inMeal:"true"})}),a=e.reduce(function(e,t){return e.calories+=parseInt(t.field_calories,10)||0,e.total_fats+=parseInt(t.field_total_fats,10)||0,e.carbohydrates+=parseInt(t.field_carbohydrates,10)||0,e.dietary_fiber+=parseInt(t.field_dietary_fiber,10)||0,e},{calories:0,total_fats:0,carbohydrates:0,dietary_fiber:0}),n=React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("td",null,"Calories"),React.createElement("td",null,"Total Fats"),React.createElement("td",null,"Carbohydrates"),React.createElement("td",null,"Dietary Fiber"))),React.createElement("tbody",null,React.createElement("tr",null,React.createElement("td",null,a.calories),React.createElement("td",null,a.total_fats),React.createElement("td",null,a.carbohydrates),React.createElement("td",null,a.dietary_fiber))));return React.createElement("div",{className:"meal-planner"},React.createElement("h1",null,"Meal Planner"),React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("td",null,"Name"),React.createElement("td",null,"Calories"),React.createElement("td",null,"Brandon Approved?"))),React.createElement("tbody",null,t)),n)}}),MenuItem=React.createClass({displayName:"MenuItem",render:function(){var e=this.props.item,t="undefined"!=typeof this.props.inMeal&&this.props.inMeal,a=t?MenuStore.Actions.removeFromMeal.bind(null,e.id):MenuStore.Actions.addToMeal.bind(null,e.id);return React.createElement("tr",null,React.createElement("td",null,e.name),React.createElement("td",null,e.field_calories),React.createElement("td",null,React.createElement("input",{type:"checkbox",disabled:!0,checked:"1"===e.field_brandon_thordarson})),React.createElement("td",null,React.createElement("input",{type:"button",value:t?"Remove from meal":"Add to meal",onClick:a})))}}),MenuList=React.createClass({displayName:"MenuList",mixins:[Reflux.connect(MenuStore.Store,"store")],getInitialState:function(){return{terms:[],vegetarian:!1,brandon:!1}},updateFilter:function(e){var t={};e instanceof Array?t.terms=e:t[e.target.name]="checkbox"===e.target.type?e.target.checked:e.target.value,this.setState(t)},render:function(){var e=Object.keys(this.state.store.items).filter(function(e){return-1===jQuery.inArray(e,this.state.store.meal)}.bind(this)).map(function(e){return this.state.store.items[e]}.bind(this)).filter(function(e){if(0===this.state.terms.length)return!0;var t=this.state.terms.filter(function(t){return e.name.indexOf(t)>-1});return t.length===this.state.terms.length}.bind(this)).filter(function(e){return this.state.vegetarian===!1||e.field_vegetarian==this.state.vegetarian}.bind(this)).filter(function(e){return this.state.brandon===!1||e.field_brandon_thordarson==this.state.brandon}.bind(this)).map(function(e){return React.createElement(MenuItem,{key:"menu-item-"+e.id,item:e})});return React.createElement("div",{className:"menu-items"},React.createElement("h1",null,"Menu Items"),React.createElement("span",null,React.createElement("label",null,"Search Terms: "),React.createElement(ReactTagsInput,{ref:"terms",onChange:this.updateFilter})),React.createElement("span",null,React.createElement("label",null,"Vegetarian: "),React.createElement("input",{type:"checkbox",name:"vegetarian",onChange:this.updateFilter})),React.createElement("span",null,React.createElement("label",null,"Brandon Approved: "),React.createElement("input",{type:"checkbox",name:"brandon",onChange:this.updateFilter})),React.createElement("table",null,React.createElement("thead",null,React.createElement("tr",null,React.createElement("td",null,"Name"),React.createElement("td",null,"Calories"),React.createElement("td",null,"Brandon Approved?"))),React.createElement("tbody",null,e)))}});React.render(React.createElement("div",{className:"menu"},React.createElement(MealPlanner,null),React.createElement(MenuList,null)),document.getElementById("react-tutorial"));
//# sourceMappingURL=react_example.js.map