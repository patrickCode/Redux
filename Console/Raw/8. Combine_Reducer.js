// Combine Reducer created from scratch
const combineReducers = reducers => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
        nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

// Store created from scratch
const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);

    if (listeners.length > 0) listeners.forEach(listener => listener());
  };

  const subscribe = listener => {
    listeners.push(listener);

    //unsubscribe method
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  };

  // A blank action is fired when createStore is called to ensure that there is an initial state to the app
  dispatch({});

  return { getState, dispatch, subscribe };
};

// Reducer - 1
const visibilityFilter = (state = "hidden", action) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};

// Reducer - 2.1
// This is a reducer where the state is a single todo.
const todo = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case "TOGGLE_TODO":
      if (state.id !== action.id) {
        return state;
      } else {
        return {
          ...state,
          completed: !state.completed
        };
      }
    default:
      return state;
  }
};

// Reducer 2
// For this reducer the state is the list of todo objects
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO":
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

// Main - Combine Reducer
// The todos field inside the state object will be managed by the 'todos' reducer. This reducer will only be exposed the todos field.
// The visibilityFilter field inside the state object will be managed by the 'visiblityFilter' reducer
const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
});

// Alternate Combine Reducer
// If we strictly follow the pattern that we will name the reducer after the field that the reducer is managing then we can simplify the combineRedicer declaration
// const todoApp = combineReducers({
//     todos, visibilityFilter
//   });

const store = createStore(todoApp);

console.log(store.getState());

const render = () => {
  console.log("State changed. " + JSON.stringify(store.getState()));
};
store.subscribe(render);

store.dispatch({
  type: "ADD_TODO",
  id: 0,
  text: "Learn Redux"
});

store.dispatch({
  type: "ADD_TODO",
  id: 1,
  text: "Learn React"
});

store.dispatch({
  type: "TOGGLE_TODO",
  id: 1
});

store.dispatch({
  type: "SET_VISIBILITY_FILTER",
  filter: "visible"
});
