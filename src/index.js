
//-- used to access canvas multi-part body signatures
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

//-- used to determine files / paths
var path = require('path');

//-- express
var express = require('express');
var app = express();

//-- used to specify config variables
var config = require( 'config' );

//-- helpers for debugging code
var debugHelpers = require('./local_modules/util/DebugHelpers');

//-- helpers for handling canvas requests
var canvasHelpers = require( './local_modules/util/CanvasHelpers' );

//-- required to parse canvas/multi-part requests
//-- always needs to be first.
//app.use( bodyParser.json() );
//app.use( bodyParser.urlencoded({ extended: true }));

//-- configure express (using the current directory
app.set('port', (process.env.PORT || config.default.PORT ));
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//-- cannot be moved/ must be here?

/**
 * Determines the signed request for a request.
 * @param req (Request)
 * @return (String)
 **/
function getSignedRequest( req ){
	var result = ( process.env.EX_SIGNED_REQUEST || "bad.signed_request" );
	
	//-- always use the request sent by body if one was sent though.
	if( req.body && req.body.signed_request ){
		result = req.body.signed_request;
	}
	
	return( result );
}

/**
 * Determines the shared secret
 * @visibility - private
 * @return (String)
 */
function getSharedSecret(){
	return( process.env.CONSUMER_SECRET || 'bad.shared_secret' );
}

/**
 * Verifies a request is signed.
 * <p>Defaults the signed request using EX_SIGNED_REQUEST if one was sent though</p>
 * 
 * @param req (Request) - assumed multi-part.body.signed_request has been sent
 * @param resp (Response) - response to be returned.
 * @return (Boolean) - if the request was authorized (true) or not(false)
 */
function checkForSignedRequest( req, resp ){
	
	//-- default using the ex signed request if it is present
	var signedRequest = getSignedRequest( req );
	
	var secret = getSharedSecret();
	
	var isValidRequest = canvasHelpers.validateSignedRequest( signedRequest, secret );
	if( !isValidRequest ){
		resp.render( 'pages/error', {
			errMsg: 'not a valid signed request'
		});
	}
	return( isValidRequest );
}

//-- page handlers

/**
 * Handler for the initial / page
 * @param req (request)
 * @param resp (Response)
 **/
function handleDefault(req, resp) {
  resp.status( config.statusCodes.unauthorized )
  	.send( config.statusCodes.unauthorizedText );
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
	
	var userInfo = canvasHelpers.getSignedRequestContext( req );
	
	resp.render('pages/canvas', {
		CLIENT_ID: process.env.CONSUMER_KEY,
		USERNAME: userInfo.context.user.fullName,
		INSTANCE_URL: userInfo.client.instanceUrl,
		TOKEN: userInfo.client.oauthToken,
		USER_INFO: userInfo
	});
}

app.get('/', handleDefault );
app.get('/canvas', handleCanvasRequest );
app.post('/canvas', handleCanvasRequest);

//-- deprecated, do not expect users to authorize.
app.get('/callback', handleCallback );

app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


