var React = require("react");
var ReactDOM = require("react-dom");
var { createStore } = require("redux");
var { Counter, counterReducer } = require("./counter");
var { TodoComponent, todoApp } = require("./todo");
require("./index.css");

const store = createStore(counterReducer);
var todoStore = createStore(todoApp);
// todoStore.dispatch({
//   type: "ADD_TODO",
//   text: 'Test',
//   id: -1
// })

class App extends React.Component {
  addTodo(todoId, todoText) {
    todoStore.dispatch({
      type: "ADD_TODO",
      text: todoText,
      id: todoId
    });
  }

  toggleTodo(todoId) {
    todoStore.dispatch({
      type: "TOGGLE_TODO",
      id: todoId
    });
  }

  updateVisibility(filter) {
    todoStore.dispatch({
      type: 'SET_VISIBILITY_FILTER',
      filter: filter
    })
  }

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
        <TodoComponent
          todos={todoStore.getState().todos}
          filter={todoStore.getState().visibilityFilter}
          onAdd={this.addTodo.bind(this)}
          onToggle={this.toggleTodo.bind(this)}
          setFilter={this.updateVisibility.bind(this)}
        />
      </div>
    );
  }
}

const render = () => {
  ReactDOM.render(<App />, document.getElementById("app"));
};

store.subscribe(render);
todoStore.subscribe(render);

render();
