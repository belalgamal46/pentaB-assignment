const { v4: uuid } = require('uuid');

let db = {
  rover: new Map(),
};

function createRover({ x, y, direction }) {
  const roverId = uuid();
  db.rover.set(roverId, { x, y, direction });
  return { id: roverId, x, y, direction };
}

function getRoverById(roverId) {
  const rover = db.rover.get(roverId);
  if (!rover) return null;
  return { ...rover, id: roverId };
}

function updateRover({ roverId, x, y, direction }) {
  db.rover = db.rover.set(roverId, { x, y, direction });
  return { x, y, direction };
}

module.exports = { createRover, getRoverById, db, updateRover };
