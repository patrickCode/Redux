const React = require("react");
const ReactRedux = require("react-redux");
const { connect } = ReactRedux;
const { Component } = React;

// Presentational Component for adding a todo

// export const AddTodo = ({ onAddClick }) => {
//   let input;
//   return (
//     <div>
//       <input
//         ref={node => {
//           input = node;
//         }}
//       />
//       <button
//         onClick={() => {
//           onAddClick(input.value);
//           input.value = "";
//         }}
//       >
//         Add
//       </button>
//     </div>
//   );
// };

// Container component for addind a todo

let todoId = 1;
export class AddTodo extends Component {
  render() {
    let input;
    return (
      <div>
        <input
          ref={node => {
            input = node;
          }}
        />
        <button
          onClick={() => {
            this.props.store.dispatch({
              type: "ADD_TODO",
              id: todoId++,
              text: input.value
            });
            input.value = "";
          }}
        >
          Add
        </button>
      </div>
    );
  }
}

map