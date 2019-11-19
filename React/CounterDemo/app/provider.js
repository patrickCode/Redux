var React = require("react");
const { Component } = React;

// Writing Provider from scratch (actual implementation is in react-redux library)
// Provider component just renders whatever is passed to it (the children)
// It passed the context to all the children, we can keep anything in the context.
// This is one of the ways to pass the store to all the components, i.e. by keeping the store in the context
// All child components of the Provider component will get the context in the props
// <Provider store={createStore(todoApp)}><...some component...></Provider>
// All the child components will get an object called 'store' in their props
// For functional components, the context will be passed as the 2nd parameter. E.g. const Component = (props, { store }) => (<div> ... </div>)
export class Provider extends Component {
  // This code will ensure that all child components (including grand-children) get the store
  getChildContext() {
    return {
      store: this.props.store
    };
  }

  render() {
    return this.props.children;
  }
}
// Specifying the context type that the children will receive (without this the children won't receive the context)
// Provider.childContextTypes = {
//   store: React.PropTypes.object
// };
