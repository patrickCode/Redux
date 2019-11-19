var React = require("react");
// var { Provider } = require("./provider");
var ReactRedux = require("react-redux");
const { Provider } = ReactRedux;
var ReactDOM = require("react-dom");
var { createStore } = require("redux");
var { Counter, counterReducer } = require("./counter");
var { TodosComponent, todoApp } = require("./todo");

require("./index.css");

var { TodoApp } = require("./todos/todoApp");

const store = createStore(counterReducer);
var todoStore = createStore(todoApp);

class App extends React.Component {
  // addTodo(todoId, todoText) {
  //   todoStore.dispatch({
  //     type: "ADD_TODO",
  //     text: todoText,
  //     id: todoId
  //   });
  // }

  // toggleTodo(todoId) {
  //   todoStore.dispatch({
  //     type: "TOGGLE_TODO",
  //     id: todoId
  //   });
  // }

  // updateVisibility(filter) {
  //   todoStore.dispatch({
  //     type: "SET_VISIBILITY_FILTER",
  //     filter: filter
  //   });
  // }

  render() {
    return (
      <div>
        <h1>React + Redux App</h1>
        <h2>Counter</h2>
        <Counter
          value={store.getState()}
          onIncrement={() => store.dispatch({ type: "INCREMENT" })}
          onDecrement={() => store.dispatch({ type: "DECREMENT" })}
        />
        <h2>TODO App</h2>
        {/* Unrefactored code
        <TodosComponent
          todos={todoStore.getState().todos}
          filter={todoStore.getState().visibilityFilter}
          onAdd={this.addTodo.bind(this)}
          onToggle={this.toggleTodo.bind(this)}
          setFilter={this.updateVisibility.bind(this)}
        /> */}

        {/* Refactored 1 - With all presentational components
        <TodoApp
          todos={todoStore.getState().todos}
          filter={todoStore.getState().visibilityFilter}
          onAdd={this.addTodo.bind(this)}
          store={todoStore}
          onToggle={this.toggleTodo.bind(this)}
        /> */}

        {/* Refactored 2 - Passing the state using props
        <TodoApp store={todoStore} /> */}

        {/* Refactored 3 - Passing the state using context (provider) */}
        <Provider store={todoStore}>
          <TodoApp />
        </Provider>
      </div>
    );
  }
}

const render = () => {
  // ReactDOM.render(<App />, document.getElementById("app"));
  ReactDOM.render(
    <Provider store={todoStore}>
      <TodoApp />
    </Provider>,
    document.getElementById("app")
  );
};

store.subscribe(render);
todoStore.subscribe(render);

render();
