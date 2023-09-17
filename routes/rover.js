let express = require('express');
let router = express.Router();
let { initializeRover, moveRover } = require('../core/marsTranslator');

router.post('/init-rover', initializeRover);
router.post('/move-rover', moveRover);

module.exports = router;
