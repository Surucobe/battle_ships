const Ship = require('../classes/ship');

test('Ship testing', () => {
  const small_ship = new Ship(2);

  expect(small_ship.isSunk()).toBe(false);
})