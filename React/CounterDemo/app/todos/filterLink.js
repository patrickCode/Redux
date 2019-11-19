// Presentation component for the Filter Link

var React = require("react");
var { Component } = React;

// Refactored to include another level of container component + presentational component
// To many presentational components will cause issues where we will have to pass too many props

// export const FilterLink = ({ filter, callback, text, currentFilter }) => {
//   if (filter === currentFilter) {
//     return <span>{text}</span>;
//   }
//   return (
//     <a
//       href="#"
//       onClick={e => {
//         e.preventDefault();
//         callback(filter);
//       }}
//     >
//       {text}
//     </a>
//   );
// };

const Link = ({ active, text, onClick }) => {
  if (active) return <span>{text}</span>;

  return (
    <a
      href="#"
      onClick={e => {
        e.preventDefault();
        onClick();
      }}
    >
      {text}
    </a>
  );
};

export class FilterLink extends Component {

  componentDidMount() {

  }

  componentWillUnmount() { 

  }

  render() {
    const props = this.props;
    const state = this.props.store.getState(); // State is passed

    return (
      <Link
        active={props.filter === state.visibilityFilter}
        onClick={() => {
          this.props.store.dispatch({
            type: "SET_VISIBILITY_FILTER",
            filter: props.filter
          });
        }}
        text={props.text}
      />
    );
  }
}
