const { createStore } = require('Redux');

const counter = (state = 0, action) => {
    if (action.type === 'INCREMENT')
        return state + 1;
    if (action.type === 'DECREMENT')
        return state - 1;
    return state;
}

const store = createStore(counter);



// Get the state of the store
console.log(store.getState());

const render = () => {
    console.log("State changed. New counter - " + store.getState())
}

// Subscribes to all changes in the state. Any change in the state will trigger the render method.
store.subscribe(render);

// Throws action
console.log("Throwing increment action");
store.dispatch({type: 'INCREMENT'});
