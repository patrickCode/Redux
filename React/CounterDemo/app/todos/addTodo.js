const React = require("react");
const ReactRedux = require("react-redux");
const { connect } = ReactRedux;
const { Component } = React;
const { object } = require("prop-types");

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
// let todoId = 1;
// export class AddTodo extends Component {
//   render() {
//     let input;
//     return (
//       <div>
//         <input
//           ref={node => {
//             input = node;
//           }}
//         />
//         <button
//           onClick={() => {
//             this.props.store.dispatch({
//               type: "ADD_TODO",
//               id: todoId++,
//               text: input.value
//             });
//             input.value = "";
//           }}
//         >
//           Add
//         </button>
//       </div>
//     );
//   }
// }

// Higher order component
let todoId = 1;
export class AddTodo extends Component {
  render() {
    console.log(this.context);
    console.log(this.props);
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
            this.props.onClick(todoId++, input.value);
            input.value = "";
          }}
        >
          Add
        </button>
      </div>
    );
  }
}

AddTodo.contextTypes = {
  store: object
}

const mapDispatchToProps = dispatch => {
  return {
    onClick: (id, text) =>
      dispatch({
        type: "ADD_TODO",
        id: id,
        text: text
      })
  };
};

const mapStateToProps = state => {
  return {};
};

export const AddTodoConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTodo);
