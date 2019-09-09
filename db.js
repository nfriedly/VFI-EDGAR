const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./edgar.db"
});

// all available at sequelize.models.*
const Sub = require("./models/sub")(sequelize);
// eslint-disable-next-line no-unused-vars
const Tag = require("./models/tag")(sequelize);
const Num = require("./models/num")(sequelize);
const Pre = require("./models/pre")(sequelize);

Sub.hasMany(Num, { foreignKey: "adsh" }); // works - e.g. 0001558370-19-003039
Sub.hasMany(Pre, { foreignKey: "adsh" }); // works

module.exports = sequelize;
