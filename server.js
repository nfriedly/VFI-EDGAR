const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const db = require("./db");

app.use(express.static("static"));

// set up raw endpoints for each model
Object.keys(db.models).forEach(model => {
  app.get(`/${model.toLowerCase()}`, async (req, res) => {
    const { offset = 0, limit = 10 } = req.query;
    const rows = await db.models[model].findAll({ offset, limit });
    res.json(rows);
  });
});

// get a single submission with all associated numbers and presentations
app.get("/sub/:adsh", async (req, res) => {
  const sub = await db.models.sub.findByPk(req.params.adsh, {
    include: [
      {
        all: true,
        nested: true
      }
    ]
  });
  res.json(sub);
});

// get all versions of a tag, or a single version with ?version=
app.get("/tag/:tag", async (req, res) => {
  const query = {
    where: {
      tag: req.params.tag
    }
  };
  if (req.query.version) {
    query.where.version = req.query.version;
  }
  const tag = await db.models.tag.findAll(query);
  res.json(tag);
});

app.listen(port, () => console.log(`EDGAR API app listening on port ${port}!`));
