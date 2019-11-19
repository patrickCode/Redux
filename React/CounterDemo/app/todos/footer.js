// Presentation component for the Filter Links

var React = require("react");
var { FilterLink } = require("./filterLink");

// Unrefactored code where FilterLink is a presentational component
// export const Footer = ({ currentFilter, onFilterClick }) => (
//   <p>
//     Show:
//     {"  "}
//     <FilterLink
//       filter="SHOW_ALL"
//       text="All"
//       callback={onFilterClick}
//       currentFilter={currentFilter}
//     ></FilterLink>
//     {", "}
//     <FilterLink
//       filter="SHOW_COMPLETED"
//       text="Completed"
//       callback={onFilterClick}
//       currentFilter={currentFilter}
//     ></FilterLink>
//     {", "}
//     <FilterLink
//       filter="SHOW_ACTIVE"
//       text="Active"
//       callback={onFilterClick}
//       currentFilter={currentFilter}
//     >
//       Active
//     </FilterLink>
//   </p>
// );

// Refactored code where FilterLink is a container component
export const Footer = ({ store }) => (
  <p>
    Show:
    {"  "}
    <FilterLink
      filter="SHOW_ALL"
      text="All"
      store={store}
    ></FilterLink>
    {", "}
    <FilterLink
      filter="SHOW_COMPLETED"
      text="Completed"
      store={store}
    ></FilterLink>
    {", "}
    <FilterLink
      filter="SHOW_ACTIVE"
      text="Active"
      store={store}
    >
      Active
    </FilterLink>
  </p>
);
