var React = require("react");
const { Todo } = require("./todo");

// Presentational component for a list of Todo items

export const TodoList = ({ todos, onTodoClick }) => (
  <ul>
    {todos.map(todo => (
      <Todo
        key={todo.id}
        text={todo.text}
        completed={todo.completed}
        onToggle={() => onTodoClick(todo.id)}
      />
    ))}
  </ul>
);
