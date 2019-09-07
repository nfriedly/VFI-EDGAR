const db = require('knex')({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
        filename: './data/edgar.db',
    },
});

module.exports = db;