const expect = require('expect');

const counter = (state, action) => {
    if (typeof state === undefined) // Initial state condition
        return 0;

    if (action.type === 'INCREMENT')
        return state + 1;
    if (action.type === 'DECREMENT')
        return state - 1;
    return state;
}

expect(
    counter(0, {type: 'INCREMENT'})
).toEqual(1);

expect(
    counter(1, {type: 'INCREMENT'})
).toEqual(2);

expect(
    counter(2, {type: 'DECREMENT'})
).toEqual(1);

expect(
    counter(1, {type: 'DECREMENT'})
).toEqual(0);

expect(
    counter(1, {type: 'UNKNOWN'})
).toEqual(1);

console.log("All tests are successfull");