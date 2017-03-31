//-- to test it locally:
//heroku local web - but use the signed request from restlet

//-- to test in heroku
//https://ticket-scale-import.herokuapp.com/canvas -- but used the signed request from restlet

//-- to test within visualforce
//https://lne--dev0--c.cs2.visual.force.com/apex/TEST_TicketScaleImport

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

function checkForSignedRequest( req, resp ){
	var signedRequest = 'cuca.monga';
	if( req.body && req.body.signed_request ){
		signedRequest = req.body.signed_request;
	}
	var secret = process.env.CONSUMER_SECRET;
	
	if( !canvasHelpers.checkSignedRequest( signedRequest, secret )){
		resp.render( 'pages/error', {
			errMsg: 'not a valid signed request'
		});
	}
	return( canvasHelpers.checkSignedRequest( signedRequest, secret ));
}

function checkAllParams( req, resp ){
	debugHelpers.prettyTrace( req.params, 'req.params' );
	debugHelpers.prettyTrace( req.query, 'req.query' );
	debugHelpers.prettyTrace( req.headers, 'req.headers' );
	debugHelpers.prettyTrace( req.body, 'req.body' );
	debugHelpers.prettyTrace( process.env, 'process.env' );
}

/**
 *  Handles if the callback page is requested
 *  @param req (request)
 *  @param resp (response)
**/
function handleCallback( req, resp ){
	if( !checkForSignedRequest( req, resp )) return;
	
	resp.render('pages/callback');
}

/**
 *  Handles if the callback page is requested
 *  @param req (request)
 *  @param resp (response)
**/
function handleCanvasRequest( req, resp ){
	if( !checkForSignedRequest( req, resp )) return;
	
	var userInfo = canvasHelpers.getUserInfo( req.body.signed_request, process.env.CONSUMER_SECRET );
	
	resp.render('pages/canvas', {
		CLIENT_ID: process.env.CONSUMER_KEY,
		USERNAME: userInfo.context.user.fullName,
		TOKEN: userInfo.oauthToken
	});
}

app.get('/callback', handleCallback );
app.get('/canvas', handleCanvasRequest );
app.post('/canvas', handleCanvasRequest);

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


