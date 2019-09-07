# EDGAR Data API

Tool to serve up EDGAR data from a local database. 
Includes a script to fetch recent sample data and import it into a SQLite DB.

## Setup

### Prerequisites

The create_db.sh script requires:

* Bash
* SQLite 3

The server.js requires:

* Node.js >= 8
* data/edgar.db

### Getting started

1. Run `create_db.sh` to generate the `edgar.db` database.
2. Then run `npm start` to start the HTTP API server.
3. Visit https://localhost:3000 to see several examples of using the API


## Todo

* Provide combined views of the data from multiple tables
* Cleanup the files used to create the DB
* Set up indexes and maybe foreign keys in the database
* Use correct data-types in the db (default is all text)
* Use correct data-types in JS (e.g. Date)