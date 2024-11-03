const Ship = require('../classes/ship');

test('Ship testing', () => {
  const small_ship = new Ship(2, '', [[0,5],[1,2]]);

  expect(small_ship.isSunk()).toBe(false);
  expect(small_ship.hp).toBe(2);
})