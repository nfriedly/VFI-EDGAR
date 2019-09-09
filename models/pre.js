const Sequelize = require("sequelize");

class Pre extends Sequelize.Model {}

module.exports = sequelize =>
  Pre.init(
    {
      adsh: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        comment:
          "Accession Number. The 20-character string formed from the 18-digit number assigned by the SEC to each EDGAR submission."
      },
      report: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        comment:
          "Represents the report grouping. This field corresponds to the statement (stmt) field, which indicates the type of statement. The numeric value refers to the “R file” as posted on the EDGAR Web site."
      },
      line: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        comment:
          "Represents the tag’s presentation line order for a given report. Together with the statement and report field, presentation location, order and grouping can be derived."
      },
      stmt: {
        type: Sequelize.ENUM("BS", "IS", "CF", "EQ", "CI", "UN"),
        allowNull: false,
        comment:
          "The financial statement location to which the value of the “report field pertains. (BS = Balance Sheet, IS = Income Statement, CF = Cash Flow, EQ = Equity, CI = Comprehensive Income, UN = Unclassifiable Statement)"
      },
      inpth: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment:
          "Value was presented “parenthetically” instead of in columns within the financial statements. For example: Receivables (net of allowance for bad debts of $200 in 2012) $700."
      },
      rfile: {
        type: Sequelize.ENUM("H", "X"),
        allowNull: false,
        comment:
          "The type of interactive data file rendered on the EDGAR web site, H = .htm file, X = .xml file."
      },
      tag: {
        type: Sequelize.STRING(256),
        allowNull: false,
        comment: "The tag chosen by the filer for this line item."
      },
      version: {
        type: Sequelize.STRING(20),
        allowNull: false,
        comment:
          "The taxonomy identifier if the tag is a standard tag, otherwise adsh."
      },
      plabel: {
        type: Sequelize.STRING(512),
        allowNull: false,
        comment:
          "The text presented on the line item, also known as a “preferred” label."
      },
      negating: {
        type: Sequelize.BOOLEAN,
        comment: "This field is not documented in the readme (?)"
      }
    },
    {
      sequelize,
      tableName: "pre",
      modelName: "pre",
      timestamps: false,
      comment:
        "Presentation of Statements. The PRE data set contains one row for each line of the financial statements tagged by the filer."
    }
  );
