const db = require('knex')({
    dialect: 'sqlite3',
    connection: {
        filename: './data/edgar.db',
    },
});

module.exports = db;