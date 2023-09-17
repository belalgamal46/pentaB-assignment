let db = require('../fixtures/memory-db');
let { doCommand } = require('./roverActions');

function executeCommand({ command, rover }) {
  const commandsList = command.split('');
  for (const command of commandsList) {
    rover = doCommand({ command: command.toUpperCase(), rover, roverId: rover.id });
  }
  return rover;
}

function initializeRover(req, res) {
  const { x, y, direction } = req.body;
  const rover = db.createRover({ x, y, direction });
  res.status(201).json(rover);
}

function moveRover(req, res) {
  const { roverId, command } = req.body;
  let rover = db.getRoverById(roverId);

  if (!rover) {
    return res.status(404).send({ message: 'rover id does not exist please create a rover first' });
  }

  const updatedRover = executeCommand({ command, rover });
  const { x, y, direction } = updatedRover;
  res.status(200).json({
    coordinates: `(${x},${y}) ${direction}`,
    x,
    y,
    direction,
  });
}

module.exports = { initializeRover, moveRover, executeCommand };
