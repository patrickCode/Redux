// Presentational Component for a single component

var React = require("react");

export const Todo = ({
    onToggle,
    completed,
    text
}) => (
  <li
    onClick={onToggle}
    style={{
      textDecoration: completed ? "line-through" : "none"
    }}
  >
    {text}
  </li>
);
