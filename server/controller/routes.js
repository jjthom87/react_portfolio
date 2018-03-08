var express = require('express');
var path = require('path');
var pg = require('pg');
var nodemailer = require("nodemailer");

var router = express.Router();

var localConn = {
	user: process.argv.POSTGRES_USER,
	password: process.argv.POSTGRES_PASSWORD,
	database: 'react_portfolio',
	host: 'localhost',
	port: 5432
};

let dbUrl = process.env.DATABASE_URL ? process.env.DATABASE_URL : localConn;
var pgClient = new pg.Client(dbUrl);
pgClient.connect();

router.get('/', function(req,res){
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.post('/api/message', (req,res) => {
	if(req.body.name !== '' && req.body.message !== ''){
		pgClient.query('INSERT INTO blog (name, message) VALUES ($1, $2)', [req.body.name, req.body.message], (error, queryRes) => {
			pgClient.query('SELECT * FROM blog', (error, queryRes) => {
				res.json(queryRes.rows);
			});
		});
	} else if (req.body.name === '' && req.body.message !== '') {
		pgClient.query('INSERT INTO blog (name, message) VALUES ($1, $2)', ['Guest', req.body.message], (error, queryRes) => {
			pgClient.query('SELECT * FROM blog', (error, queryRes) => {
				res.json(queryRes.rows);
			});
		});
	} else if ((req.body.name !== '' && req.body.message === '') || (req.body.name === '' && req.body.message === '')) {
		res.json("null_message")
	}
});

router.get('/api/messages', (req,res) => {
	pgClient.query('SELECT * FROM blog', (error, queryRes) => {
		res.json(queryRes.rows);
	});
});

router.post('/api/email', function(req, res){
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: process.env.EMAIL,
			pass: process.env.EMAIL_PASS
		}
	});
	var mailOptions = {
	    from: '"Bob Saget" <nycda-teach@teachthis.com>',
	    subject: 'Contact Form',
	    to: process.env.EMAIL,
	    message: 'Name: ' + req.body.name + '\n' + 'Email: ' + req.body.email + '\n' + 'Message: ' + req.body.message,
	    html: '<p> ' + 'Name: ' + req.body.name + '<br>' + 'Email: ' + req.body.email + '<br>' + 'Message: ' + req.body.message + ' </p>'
	};
	transporter.sendMail(mailOptions, function(error, info){
	    if(error){
	        res.json({error: error});
	    } else {
			res.json({success: info});
	    }
	});
});

router.get('*', (req,res) => {
	res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

module.exports = router;