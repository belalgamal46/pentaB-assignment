let db = require('../fixtures/memory-db');

function turnLeft({ roverId, rover }) {
  let { x, y, direction } = rover;
  const left = {
    North: () => db.updateRover({ roverId, x, y, direction: 'West' }),
    South: () => db.updateRover({ roverId, x, y, direction: 'East' }),
    East: () => db.updateRover({ roverId, x, y, direction: 'North' }),
    West: () => db.updateRover({ roverId, x, y, direction: 'South' }),
  };
  const actionFn = left[direction];
  return actionFn();
}

function turnRight({ roverId, rover }) {
  let { x, y, direction } = rover;
  const right = {
    North: () => db.updateRover({ roverId, x, y, direction: 'East' }),
    South: () => db.updateRover({ roverId, x, y, direction: 'West' }),
    East: () => db.updateRover({ roverId, x, y, direction: 'South' }),
    West: () => db.updateRover({ roverId, x, y, direction: 'North' }),
  };
  const actionFn = right[direction];
  return actionFn();
}

function moveForward({ roverId, rover }) {
  let { x, y, direction } = rover;
  let forward = {
    North: () => db.updateRover({ roverId, x, y: ++y, direction }),
    East: () => db.updateRover({ roverId, x: ++x, y, direction }),
    South: () => db.updateRover({ roverId, x, y: --y, direction }),
    West: () => db.updateRover({ roverId, x: --x, y, direction }),
  };
  const actionFn = forward[direction];
  return actionFn();
}

function moveBackward({ roverId, rover }) {
  let { x, y, direction } = rover;
  let backward = {
    North: () => db.updateRover({ roverId, x, y: --y, direction }),
    East: () => db.updateRover({ roverId, x: --x, y, direction }),
    South: () => db.updateRover({ roverId, x, y: ++y, direction }),
    West: () => db.updateRover({ roverId, x: ++x, y, direction }),
  };
  const actionFn = backward[direction];
  return actionFn();
}

function doCommand({ command, roverId, rover }) {
  let action = {
    R: () => turnRight({ rover, roverId }),
    L: () => turnLeft({ rover, roverId }),
    B: () => moveBackward({ roverId, rover }),
    F: () => moveForward({ roverId, rover }),
  };

  const actionFn = action[command];
  return actionFn();
}

module.exports = {
  doCommand,
  turnLeft,
  turnRight,
  moveForward,
  moveBackward,
};
