const expect = require("expect");
const deepFreeze = require("deep-freeze");

// Here we are breaking the main reducer into 2 reducer based on a single object and an array of objects

// This is a reducer where the state is a single todo
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

// For this reducer the state is the list of todo objects
const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, todo(undefined, action)];
    case "TOGGLE_TODO": {
      return state.map(t => todo(t, action));
    }
  }
};

const testAddTodos = () => {
  const stateBefore = [];
  const action = {
    type: "ADD_TODO",
    id: 0,
    text: "Learn Redux"
  };
  const stateAfter = [
    {
      id: 0,
      text: "Learn Redux",
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

const testToggleTodo = () => {
  const stateBefore = [
    {
      id: 0,
      text: "Learn React",
      completed: false
    },
    {
      id: 1,
      text: "Learn Redux",
      completed: false
    }
  ];
  const stateAfter = [
    {
      id: 0,
      text: "Learn React",
      completed: false
    },
    {
      id: 1,
      text: "Learn Redux",
      completed: true
    }
  ];

  const action = {
    type: "TOGGLE_TODO",
    id: 1
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(todos(stateBefore, action)).toEqual(stateAfter);
};

testAddTodos();
testToggleTodo();
console.log("All Tests Passed");
