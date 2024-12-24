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
describe('checkValidCoordinate', () => {
  document.body.innerHTML = `
    <div class="left">
      <input value="A1">
      <input value="A2">
      <input value="A3">
    </div>
    <div class="right">
      <input value="">
      <input value="B2">
      <input value="B3">
    </div>
    <div class="duplicate">
      <input value="C1">
      <input value="C1">
      <input value="C3">
    </div>
  `;

  test('alerts when any input is empty', () => {
    window.alert = jest.fn();
    checkValidCoordinate('right');
    expect(window.alert).toHaveBeenCalledWith('no field must be left empty');
  });

  test('alerts when duplicate coordinates are entered', () => {
    window.alert = jest.fn();
    checkValidCoordinate('duplicate');
    expect(window.alert).toHaveBeenCalledWith("Can't place two boats on a same place");
  });

  test('sets data-coord attribute correctly for valid inputs', () => {
    checkValidCoordinate('left');
    const inputs = document.querySelectorAll('.left input');
    inputs.forEach(input => {
      expect(input.dataset.coord).toBe(input.value);
    });
  });
});