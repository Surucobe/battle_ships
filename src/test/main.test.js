import Ship from '../classes/ship';
const computer = require('../classes/computer')

test('Ship testing', () => {
  const small_ship = new Ship(2, '', [[0,5],[1,2]]);

  expect(small_ship.isSunk()).toBe(false);
  expect(small_ship.hp).toBe(2);
})

test('Computer testing', () => {
  const computer = new computer('pc')

  expect(computer.name).toBe('pc');
})