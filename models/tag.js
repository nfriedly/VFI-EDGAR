const Sequelize = require("sequelize");

class Tag extends Sequelize.Model {}

module.exports = sequelize =>
  Tag.init(
    {
      tag: {
        type: Sequelize.STRING(256),
        primaryKey: true,
        comment:
          "The unique identifier (name) for a tag in a specific taxonomy release."
      },
      version: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        comment:
          "For a standard tag, an identifier for the taxonomy; otherwise the accession number where the tag was defined."
      },
      custom: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment:
          "1 if tag is custom (version=adsh), 0 if it is standard. Note: This flag is technically redundant with the version and adsh columns."
      },
      abstract: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        comment: "1 if the tag is not used to represent a numeric fact."
      },
      datatype: {
        type: Sequelize.STRING(20),
        allowNull: true,
        comment:
          "If abstract=1, then NULL, otherwise the data type (e.g., monetary) for the tag."
      },
      iord: {
        type: Sequelize.ENUM("I", "D"),
        allowNull: false,
        comment:
          "If abstract=1, then NULL; otherwise, “I” if the value is a point-in time, or “D” if the value is a duration."
      },
      crdr: {
        type: Sequelize.ENUM("C", "D"),
        allowNull: true,
        comment:
          "If datatype = monetary, then the tag’s natural accounting balance (debit or credit); if not defined, then NULL."
      },
      tlabel: {
        type: Sequelize.STRING(512),
        allowNull: true,
        comment:
          "If a standard tag, then the label text provided by the taxonomy, otherwise the text provided by the filer. A tag which had neither would have a NULL value here."
      },
      doc: {
        type: Sequelize.STRING,
        allowNull: true,
        comment:
          "The detailed definition for the tag. If a standard tag, then the text provided by the taxonomy, otherwise the text assigned by the filer. Some tags have neither, and this field is NULL."
      }
    },
    {
      sequelize,
      tableName: "tag",
      modelName: "tag",
      timestamps: false,
      comment:
        "The TAG data set contains all standard taxonomy tags, not just those appearing in submissions to date, and also includes all custom taxonomy tags defined in the submissions.  The source is the “as filed” XBRL filer submissions.  The standard tags are derived from taxonomies in http://www.sec.gov/info/edgar/edgartaxonomies.shtml."
    }
  );
