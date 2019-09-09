const Sequelize = require('sequelize');

class Sub extends Sequelize.Model {}

module.exports = sequelize => Sub.init({
    "adsh": {
        "type": Sequelize.STRING(20),
        "primaryKey": true,
        "comment": "Accession Number. The 20-character string formed from the 18-digit number assigned by the SEC to each EDGAR submission. (nnnnnnnnnn-nn-nnnnnn)"
    },
    "cik": {
        "type": Sequelize.INTEGER,
        "allowNull": false,
        "comment": "Central Index Key (CIK). Ten digit number assigned by the SEC to each registrant that submits filings."
    },
    "name": {
        "type": Sequelize.STRING(150),
        "allowNull": false,
        "comment": "Name of registrant. This corresponds to the name of the legal entity as recorded in EDGAR as of the filing date."
    },
    "sic": {
        "type": Sequelize.INTEGER,
        "allowNull": true,
        "comment": "Standard Industrial Classification (SIC). Four digit code assigned by the SEC as of the filing date, indicating the registrant’s type of business."
    },
    "countryba": {
        "type": Sequelize.STRING(2),
        "allowNull": false,
        "comment": "The ISO 3166-1 country of the registrant's business address."
    },
    "stprba": {
        "type": Sequelize.STRING(2),
        "allowNull": true,
        "comment": "The state or province of the registrant’s business address, if field countryba is US or CA."
    },
    "cityba": {
        "type": Sequelize.STRING(30),
        "allowNull": false,
        "comment": "The city of the registrant's business address."
    },
    "zipba": {
        "type": Sequelize.STRING(10),
        "allowNull": true,
        "comment": "The zip code of the registrant’s business address."
    },
    "bas1": {
        "type": Sequelize.STRING(40),
        "allowNull": true,
        "comment": "The first line of the street of the registrant’s business address."
    },
    "bas2": {
        "type": Sequelize.STRING(40),
        "allowNull": true,
        "comment": "The second line of the street of the registrant’s business address."
    },
    "baph": {
        "type": Sequelize.STRING(20),
        "allowNull": true,
        "comment": "The phone number of the registrant’s business address."
    },
    "countryma": {
        "type": Sequelize.STRING(2),
        "allowNull": true,
        "comment": "The ISO 3166-1 country of the registrant's mailing address."
    },
    "stprma": {
        "type": Sequelize.STRING(2),
        "allowNull": true,
        "comment": "The state or province of the registrant’s mailing address, if field countryma is US or CA."
    },
    "cityma": {
        "type": Sequelize.STRING(30),
        "allowNull": true,
        "comment": "The city of the registrant's mailing address."
    },
    "zipma": {
        "type": Sequelize.STRING(10),
        "allowNull": true,
        "comment": "The zip code of the registrant’s mailing address."
    },
    "mas1": {
        "type": Sequelize.STRING(40),
        "allowNull": true,
        "comment": "The first line of the street of the registrant’s mailing address."
    },
    "mas2": {
        "type": Sequelize.STRING(40),
        "allowNull": true,
        "comment": "The second line of the street of the registrant’s mailing address."
    },
    "countryinc": {
        "type": Sequelize.STRING(3),
        "allowNull": false,
        "comment": "The country of incorporation for the registrant."
    },
    "stprinc": {
        "type": Sequelize.STRING(2),
        "allowNull": true,
        "comment": "The state or province of incorporation for the registrant, if countryinc is US or CA."
    },
    "ein": {
        "type": Sequelize.INTEGER,
        "allowNull": true,
        "comment": "Employee Identification Number, 9 digit identification number assigned by the Internal Revenue Service to business entities operating in the United States."
    },
    "former": {
        "type": Sequelize.STRING(150),
        "allowNull": true,
        "comment": "Most recent former name of the registrant, if any."
    },
    "changed": {
        "type": Sequelize.STRING(8),
        "allowNull": true,
        "comment": "Date of change from the former name, if any."
    },
    "afs": {
        "type": Sequelize.ENUM('1-LAF', '2-ACC', '3-SRA', '4-NON', '5-SML' ),
        "allowNull": true,
        "comment": "Filer status with the SEC at the time of submission: 1-LAF=Large Accelerated, 2-ACC=Accelerated, 3-SRA=Smaller Reporting Accelerated, 4-NON=Non-Accelerated, 5-SML=Smaller Reporting Filer, NULL=not assigned."
    },
    "wksi": {
        "type": Sequelize.BOOLEAN,
        "allowNull": false,
        "comment": "Well Known Seasoned Issuer (WKSI). An issuer that meets specific SEC requirements at some point during a 60-day period preceding the date the issuer satisfies its obligation to update its shelf registration statement."
    },
    "fye": {
        "type": Sequelize.STRING(4),
        "allowNull": false,
        "comment": "Fiscal Year End Date, rounded to nearest month-end. (mmdd)"
    },
    "form": {
        "type": Sequelize.STRING(10),
        "allowNull": false,
        "comment": "The submission type of the registrant’s filing."
    },
    "period": {
        "type": Sequelize.DATEONLY, // todo: validate input mapping
        "allowNull": false,
        "comment": "Balance Sheet Date, rounded to nearest month-end. (yymmdd)"
    },
    "fy": {
        "type": Sequelize.INTEGER,
        "allowNull": false,
        "comment": "Fiscal Year Focus (as defined in EFM Ch. 6). (yyyy)"
    },
    "fp": {
        "type": Sequelize.ENUM("FY","Q1","Q2","Q3","Q4","H1","H2","M9","T1","T2","T3","M8","CY"),
        "allowNull": false,
        "comment": "Fiscal Period Focus (as defined in EFM Ch. 6) within Fiscal Year. The 10-Q for the 1st, 2nd and 3rd quarters would have a fiscal period focus of Q1, Q2 (or H1), and Q3 (or M9) respectively, and a 10-K would have a fiscal period focus of FY."
    },
    "filed": {
        "type": Sequelize.DATEONLY, // todo: validate input mapping,
        "allowNull": false,
        "comment": "The date of the registrant’s filing with the Commission. (yymmdd)"
    },
    "accepted": {
        "type": Sequelize.DATE,
        "allowNull": false,
        "comment": "The acceptance date and time of the registrant’s filing with the Commission. Filings accepted after 5:30pm EST are considered filed on the following business day. (yyyy‑mm‑dd hh:mm:ss)"
    },
    "prevrpt": {
        "type": Sequelize.BOOLEAN,
        "allowNull": false,
        "comment": "Previous Report –TRUE indicates that the submission information was subsequently amended."
    },
    "detail": {
        "type": Sequelize.BOOLEAN,
        "allowNull": false,
        "comment": "TRUE indicates that the XBRL submission contains quantitative disclosures within the footnotes and schedules at the required detail level (e.g., each amount)."
    },
    "instance": {
        "type": Sequelize.STRING,
        "allowNull": false,
        "comment": "The name of the submitted XBRL Instance Document (EX-101.INS) type data file. The name often begins with the company ticker symbol."
    },
    "nciks": {
        "type": Sequelize.INTEGER,
        "allowNull": false,
        "comment": "Number of Central Index Keys (CIK) of registrants (i.e., business units) included in the consolidating entity’s submitted filing."
    },
    "aciks": {
        "type": Sequelize.STRING,
        "allowNull": true,
        "comment": "Additional CIKs of co-registrants included in a consolidating entity’s EDGAR submission, separated by spaces. If there are no other co-registrants (i.e., nciks=1), the value of aciks is NULL. For a very small number of filers, the list of co-registrants is too long to fit in the field. Where this is the case, PARTIAL will appear at the end of the list indicating that not all co-registrants’ CIKs are included in the field; users should refer to the complete submission file for all CIK information."
    }
},{
    sequelize,
    tableName: 'sub',
    modelName: 'sub',
    timestamps: false,
    comment: "The submissions data set contains summary information about an entire EDGAR submission."
});