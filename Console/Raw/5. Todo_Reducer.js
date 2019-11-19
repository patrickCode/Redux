const expect = require("expect");
const deepFreeze = require("deep-freeze");

const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO': {
        return state.map(todo => {
            if (todo.id !== action.id) {
                return todo;
            } else {
                return {
                    ...todo,
                    completed: !todo.completed
                }
            }
        })
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
      type: 'TOGGLE_TODO',
      id: 1
  };

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
      todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodos();
testToggleTodo();
console.log("All Tests Passed");
