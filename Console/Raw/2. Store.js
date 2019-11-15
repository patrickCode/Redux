const expect = require("expect");

const counter = (state = 0, action) => {
  if (action.type === "INCREMENT") return state + 1;
  if (action.type === "DECREMENT") return state - 1;
  return state;
};

// Store created from scratch
const createStore = reducer => {
  let state;
  let listeners = [];

  const getState = () => state;

  const dispatch = action => {
    state = reducer(state, action);

    if (listeners.length > 0)
      listeners.forEach(listener => listener());
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

const store = createStore(counter);

// Get the state of the store
console.log(store.getState());

const render = () => {
  console.log("State changed. New counter - " + store.getState());
};

// Subscribes to all changes in the state. Any change in the state will trigger the render method.
store.subscribe(() => {
  console.log("State changed. New counter - " + store.getState());
});

// Throws action
console.log("Throwing increment action");
store.dispatch({ type: "INCREMENT" });
