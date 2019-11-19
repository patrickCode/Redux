const expect = require("expect");
const deepFreeze = require("deep-freeze");

const toggleTodo = (todo) => {
    // Correct - 1 (New in ES6 - Polyfills may be needed)
    // return Object.assign({}, todo, {
    //     completed: !todo.completed
    // });
    
    // Enabled in babel
    return {
        ...todo,
        completed: !todo.completed
    };
};

const testToggleTodo = () =>{
    const todoBefore = {
        id: 0,
        text: 'Learn Redux',
        completed: false
    };

    const todoAfter = {
        id: 0,
        text: 'Learn Redux',
        completed: true
    };

    deepFreeze(todoBefore);

    expect(
        toggleTodo(todoBefore)
    ).toEqual(todoAfter);
}

console.log("All tests passed");