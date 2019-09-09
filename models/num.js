const Sequelize = require('sequelize');

class Num extends Sequelize.Model {}
module.exports = sequelize => Num.init({
    "adsh": {
        "type": Sequelize.STRING(20),
        "primaryKey": true,
        "comment": "Accession Number. The 20-character string formed from the 18-digit number assigned by the SEC to each EDGAR submission."
    },
    "tag": {
        "type": Sequelize.STRING(256),
        "primaryKey": true,
        "comment": "The unique identifier (name) for a tag in a specific taxonomy release."
    },
    "version": {
        "type": Sequelize.STRING(20),
        "primaryKey": true,
        "comment": "For a standard tag, an identifier for the taxonomy; otherwise the accession number where the tag was defined."
    },
    "ddate": {
        "type": Sequelize.DATEONLY, // todo: ensure the original format, "DATE (yyyymmdd)", maps to this
        "primaryKey": true,
        "comment": "The end date for the data value, rounded to the nearest month end."
    },
    "qtrs": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "comment": "The count of the number of quarters represented by the data value, rounded to the nearest whole number. “0” indicates it is a point-in-time value."
    },
    "uom": {
        "type": Sequelize.STRING(20),
        "primaryKey": true,
        "comment": "The unit of measure for the value."
    },
    "coreg": {
        "type": Sequelize.INTEGER,
        "primaryKey": true,
        "comment": "If specified, indicates a specific co-registrant, the parent company, or other entity (e.g., guarantor). NULL indicates the consolidated entity."
    },
    "value": {
        "type": Sequelize.DOUBLE(28, 4), // the EDGAR docs describe this as NUMBER(28,4) but with a max size of 16 (?)
        "allowNull": true,
        "comment": "The value. This is not scaled, it is as found in the Interactive Data file, but is limited to four digits to the right of the decimal point."
    },
    "footnote": {
        "type": Sequelize.STRING(512),
        "allowNull": true,
        "comment": "The text of any superscripted footnotes on the value, as shown on the statement page, truncated to 512 characters, or if there is no footnote, then this field will be blank."
    }
}, {
    sequelize,
    tableName: 'num',
    modelName: 'num',
    timestamps: false,
    comment: 'The NUM data set contains numeric data, one row per data point in the financial statements.'
});

