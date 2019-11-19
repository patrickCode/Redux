const { createStore, combineReducers } = require("Redux");
var React = require("react");
const { Component } = React;

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

export const FilterLink = ({ filter, callback, text, currentFilter }) => {
    if (filter === currentFilter) {
        return (
        <span>{text}</span>
        )
    }
  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        callback(filter);
      }}
    >
      {text}
    </a>
  );
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case "SHOW_ALL":
      return todos;
    case "SHOW_COMPLETED":
      return todos.filter(t => t.completed);
    case "SHOW_ACTIVE":
      return todos.filter(t => !t.completed);
  }
};

let todoId = 0;
export class TodoComponent extends Component {
  render() {
      const {
          todos,
          filter
      } = this.props; //Deconstruction so that we don't have to write this.props everytime
      const visibleTodos = getVisibleTodos(
          todos,
          filter
      );
    return (
      <div>
        <input
          ref={node => {
            this.input = node;
          }}
        />
        <button
          onClick={() => {
            this.props.onAdd(todoId++, this.input.value);
            this.input.value = "";
          }}
        >
          Add
        </button>
        <ul>
          {/* 1. Showing all the todos
          {this.props.todos.map(todo => (
            <li
              key={todo.id}
              onClick={() => this.props.onToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </li>
          ))} */}
          {visibleTodos.map(todo => (
            <li
              key={todo.id}
              onClick={() => this.props.onToggle(todo.id)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none"
              }}
            >
              {todo.text}
            </li>
          ))}
        </ul>
        <p>
          Show:
          {"  "}
          <FilterLink
            filter="SHOW_ALL"
            text="All"
            callback={this.props.setFilter}
            currentFilter={filter}
          ></FilterLink>
          {"  "}
          <FilterLink
            filter="SHOW_COMPLETED"
            text="Completed"
            callback={this.props.setFilter}
            currentFilter={filter}
          ></FilterLink>
          {"  "}
          <FilterLink
            filter="SHOW_ACTIVE"
            text="Active"
            callback={this.props.setFilter}
            currentFilter={filter}
          >
            Active
          </FilterLink>
        </p>
      </div>
    );
  }
}
