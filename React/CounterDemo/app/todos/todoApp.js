// Refactorer Code
// Container component

const { combineReducers } = require("Redux");
var React = require("react");
const { Component } = React;
const { VisibleTodoList } = require("./visibleTodoList");
const { AddTodo } = require("./addTodo");
const { Footer } = require("./footer");

const visibilityFilter = (state = "SHOW_ALL", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// This is a reducer where the state is a single todo.
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      } else {
        return {
          ...state,
          completed: !state.completed
        };
      }
    default:
      return state;
  }
};

// For this reducer the state is the list of todo objects
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// Combine Reducer
// The todos field inside the state object will be managed by the 'todos' reducer. This reducer will only be exposed the todos field.
// The visibilityFilter field inside the state object will be managed by the 'visiblityFilter' reducer
export const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

// const getVisibleTodos = (todos, filter) => {
//   switch (filter) {
//     case "SHOW_ALL":
//       return todos;
//     case "SHOW_COMPLETED":
//       return todos.filter(t => t.completed);
//     case "SHOW_ACTIVE":
//       return todos.filter(t => !t.completed);
//   }
// };

// let todoId = 0;
export class TodoApp extends Component {
  render() {
    // const { todos, filter, store } = this.props; //Deconstruction so that we don't have to write this.props everytime
    // const { store } = this.props;
    // const { store } = this.context;
    // console.log(this.props);
    // console.log(this.context);
    // return (<div></div>);
    return (
      <div>
        {/* Presentational - <AddTodo onAddClick={text => this.props.onAdd(todoId++, text)} /> */}
        {/* <AddTodo store={store} /> */}
        <AddTodo />
        
        {/*  Presentational - <TodoList todos={getVisibleTodos(todos, filter)} onTodoClick={this.props.onToggle} /> */}
        {/* Passing Store via props <VisibleTodoList store={store} /> */}
        <VisibleTodoList />
        
        {/*  Presentational -  <Footer currentFilter={filter} onFilterClick={this.props.setFilter} /> */}
        {/* <Footer store={store} /> */}
      </div>
    );
  }
}
