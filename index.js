var bodyParser = require('body-parser');
var path = require('path');

var multer = require('multer');
var upload = multer();

var express = require('express');
var app = express();

var config = require( 'config' );

//-- run node-inspector in a separate browser window
//-- then run heroku local webdebug

var debugHelpers = require('./local_modules/util/DebugHelpers');
var canvasHelpers = require( './local_modules/util/CanvasHelpers' );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, resp) {
  resp.render('pages/index');
});

function checkSignedRequest2( req, resp ){
	var signedRequest = 'cuca.monga';
	if( req.body && req.body.signed_request ){
		signedRequest = req.body.signed_request;
	}
	var secret = process.env.CONSUMER_SECRET;
	return( canvasHelpers.checkSignedRequest( signedRequest, secret ));
}

function checkAllParams( req, resp ){
	debugHelpers.prettyTrace( req.params, 'req.params' );
	debugHelpers.prettyTrace( req.query, 'req.query' );
	debugHelpers.prettyTrace( req.headers, 'req.headers' );
	debugHelpers.prettyTrace( req.body, 'req.body' );
	debugHelpers.prettyTrace( process.env, 'process.env' );
}

app.get('/callback', function(req, resp) {
	checkSignedRequest2( req, resp );
	
	resp.render('pages/callback');
});

app.get('/canvas', function(req, resp) {
	checkSignedRequest2( req, resp );
	
	resp.render('pages/canvas');
});

app.post('/canvas', function( req, resp ){
	checkSignedRequest2( req, resp );
	
	resp.render('pages/canvas');
});

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


