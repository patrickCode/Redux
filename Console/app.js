const { createStore, applyMiddleware } = require("redux");

const defaultState = {
  courses: [
    {
      name: "Learning React",
      topic: "React"
    },
    {
      name: "Learning Angular",
      topic: "Angular"
    },
    {
      name: "Using Redux with Angular",
      topic: "Angular"
    }
  ]
};

function reducer(state, action) {
  switch (action.type) {
    // When 'ADD_COURSE' is fired then create a new state object with the course from the middleware
    case "ADD_COURSE": 
      return Object.assign({}, state, {
        courses: [...state.courses, action.course]
      });
    default:
      return state;
  }
  return state;
}

// Middleware which will be called whenver an action is fired
const logger = store => next => action => {
    console.log('dispatching', action);
    let result = next(action);
    console.log('state after action', store.getState());
    return result;
}

//For creating the store you need to pass the reducer and the initial state
const store = createStore(reducer, defaultState, applyMiddleware(logger));

// This is analogous to a vew engine. It takes a function and calls the function with the current state.
function addView(viewFunc) {
  viewFunc(defaultState);
  store.subscribe(() => {
    viewFunc(store.getState());
  });
}

addView(state => {
  console.log(`There are ${state.courses.length} courses in the library`);
});

addView(state => {
  console.log(
    `The latest course in the library: ${
      state.courses[state.courses.length - 1].name
    }`
  );
});

// Dispatching an action ADD_COURSE
store.dispatch({
  type: "ADD_COURSE",
  course: {
    name: "New Course",
    type: "New Type"
  }
});
