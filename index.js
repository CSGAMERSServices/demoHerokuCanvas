var bodyParser = require('body-parser');
var path = require('path');
var CryptoJS = require( 'crypto-js' );

var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, resp) {
  resp.render('pages/index');
});

function checkSignedRequest( req, resp ){
	console.log( 'consumerKey:' + process.env.CONSUMER_KEY );
	console.log( 'consumerSecret:' + process.env.CONSUMER_SECRET );
	
	var consumerKey = process.env.CONSUMER_KEY;
	var consumerSecret = process.env.CONSUMER_SECRET;
	
	if( !req.body ){
		console.log( 'req.body was not found' );
	} else {
		console.log( 'all fields in req.body' );
		for( var key in req.body ){
			console.log( 'req.body[' + key + '](' + (typeof req.body[key] ) + ')=' + req.body[key] );
		}
		console.log( 'done looking through all fields in req.body' );
	}
	
	var signedRequest = req.get( 'signed_request' );
	console.log( 'req.get:' + signedRequest );
	
	signedRequest = 'cuca.cuca';
	if( req.body && req.body.signed_request ){
		signedRequest = req.body.signed_request;
	}
	console.log( 'signedRequest:' + signedRequest );
	/*
	var hashedContext = signedRequest.split( '.' )[0];
	var context = signedRequest.split( '.' )[1];
	
	var hash = CryptoJS.HmacSHA256( context, shared );
	var b64Hash = CrytpoJS.enc.Base64.stringify( hash );
	
	console.log( 'what I am expecting:' + b64Hash );
	console.log( 'what I got:' + hashedContext );
	*/
	
	return( true );
}

app.get('/callback', function(req, resp) {
	checkSignedRequest( req, resp );
	
	resp.render('pages/callback');
});

app.get('/canvas', function(req, resp) {
	checkSignedRequest( req, resp );
	
	resp.render('pages/canvas');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


