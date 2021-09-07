
require('dotenv').config();

let express = require('express');
let app = express();
let sequelize = require('./Db');


let food = require('./Controllers/Food-controller');
let user = require('./Controllers/User-controller');
const cors = require('cors');

sequelize.sync();

app.use(require('./Middleware/Headers'));

app.use(express.json());

app.use('/food', food);

app.use('/user', user);

app.use(require('./Middleware/Validate-session'));

app.listen(3000, function () {
  console.log('App is listening on port 3000');
});
app.use(cors({ origin: 'http://localhost:3001' }));
