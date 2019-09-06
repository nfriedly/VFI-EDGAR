const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./db');

app.use(express.static('static'));

['num', 'pre', 'sub', 'tag'].forEach(table => {
    app.get(`/${table}`, async (req, res) => {
        const { offset=0, limit=10 } = req.query;
        const rows = await db.select('*').from(table).offset(offset).limit(limit);
        res.json(rows);
    });
});


app.listen(port, () => console.log(`EDGAR API app listening on port ${port}!`));