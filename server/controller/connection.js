var pg = require('pg');
var localConn = {
	user: process.argv.POSTGRES_USER,
	password: process.argv.POSTGRES_PASSWORD,
	database: 'react_portfolio',
	host: 'localhost',
	port: 5432
};
var pgClient = new pg.Client(process.env.DATABASE_URL || localConn);
module.exports = pgClient;