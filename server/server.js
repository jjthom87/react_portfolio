var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require("path");
var pgClient = require("./controller/connection.js")
pgClient.connect();

var PORT = process.env.PORT || 3000;

app.use(express.static("./client/public"));

app.use(bodyParser.json({ limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use("/", require('./controller/routes.js'));

io.on('connection', function (socket) {
  // socket.emit('news', { hello: 'world' });
  // socket.on('my other event', function (data) {
  //   console.log(data);
  // });

	app.post('/api/message', (req,res) => {
		if(req.body.name !== '' && req.body.message !== ''){
			pgClient.query('INSERT INTO blog (name, message) VALUES ($1, $2)', [req.body.name, req.body.message], (error, queryRes) => {
				pgClient.query('SELECT * FROM blog', (error, queryRes) => {
					socket.emit('messages', queryRes.rows);
				});
			});
		} else if (req.body.name === '' && req.body.message !== '') {
			pgClient.query('INSERT INTO blog (name, message) VALUES ($1, $2)', ['Guest', req.body.message], (error, queryRes) => {
				pgClient.query('SELECT * FROM blog', (error, queryRes) => {
					socket.emit('messages', queryRes.rows);
				});
			});
		} else if ((req.body.name !== '' && req.body.message === '') || (req.body.name === '' && req.body.message === '')) {
			res.json("null_message")
		}
	});

	pgClient.query('SELECT * FROM blog', (error, queryRes) => {
		socket.emit('messages', queryRes.rows);
	});
});

// Starting our express server
server.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
