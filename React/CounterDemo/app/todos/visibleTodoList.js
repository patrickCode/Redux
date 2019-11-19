// Container component for the Todo List
const React = require("react");
const ReactRedux = require("react-redux");
const { connect } = ReactRedux;
const { Component } = React;
const { TodoList } = require("./todoList");

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

const mapStateToProps = state => {
  return {
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTodoClick: id =>
      dispatch({
        type: "TOGGLE_TODO",
        id: id
      })
  };
};

class VisibleTodoListComponent extends Component {
//   componentDidMount() {
//     // const { store } = this.props.store; - Getting store from props
//     const { store } = this.props; // Getting store from context (Provider)
//     this.unsubscribe = store.subscribe(() => {
//       this.forceUpdate();
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

  render() {
    // const state = this.context.store.getState();

    return (
    //   <TodoList
    //     todos={getVisibleTodos(state.todos, state.visibilityFilter)}
    //     onTodoClick={id =>
    //       this.props.store.dispatch({
    //         type: "TOGGLE_TODO",
    //         id: id
    //       })
    //     }
    //   />
    <TodoList
        todos={this.props.todos}
        onTodoClick={this.props.onTodoClick}
      />
    );
  }
}

// VisibleTodoList.contextTypes = {
//     store: React.PropTypes.object
// };

export const VisibleTodoList = connect(
    mapStateToProps,
    mapDispatchToProps
  )(VisibleTodoListComponent);
