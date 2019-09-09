# EDGAR Data API

Tool to serve up EDGAR data from a local database.
Includes a script to fetch recent sample data and import it into a SQLite DB.

## Setup

### Prerequisites

- Bash ("Git Bash" works on Windows)
- SQLite 3
- Node.js >= 8

### Getting started

1. Run `create_db.sh` to generate the `edgar.db` database.
2. Then run `npm start` to start the HTTP API server.
3. Visit https://localhost:3000 to see several examples of using the API

## Thoughts on the project

The original request here was fairly open-ended, but I believe this meets the goals of storing the data in a repeatable fashion and making it available to a front-end.

It seems that the Submissions are the primary data here, and that when viewing a given Submission, the associated Numbers and Presentation of Statements data would also be desired. So, the primary API endpoint combines all three of these together.
It makes for a fairly heavy request, but it seemed like the most-appropriate option.

I considered also including the Tag data with a Submission but decided against it, as the data there seems like it would less commonly be required.
Also to keep the Submission response size and time from balooning any further.

Normally I'd add some unit and integration tests, but the linting (`npm run lint`) will have to do for now.
