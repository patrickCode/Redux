var React = require("react");

export const counterReducer = (state = 0, action) => {
  if (action.type === "INCREMENT") return state + 1;
  if (action.type === "DECREMENT") return state - 1;
  return state;
};

export const Counter = ({value, onIncrement, onDecrement}) => (
    <div>
        <h1>{value}</h1>
        <button onClick={onIncrement}>+</button>
        <button onClick={onDecrement}>-</button>
    </div>
)
