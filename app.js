let express = require('express');
let roverRouter = require('./routes/rover');

let app = express();
app.use(express.json());

app.use('/', roverRouter);

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});

module.exports = app;
