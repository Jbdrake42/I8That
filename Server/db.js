const Sequelize = require('sequelize');
const sequelize = new Sequelize('I8That', 'postgres', 'password', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to journal-walkthrough postgres database');
    },
    function(err) {
        console.log(err);
    }
);
module.exports = sequelize;