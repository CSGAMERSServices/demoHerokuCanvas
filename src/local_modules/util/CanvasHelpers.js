/**
 * Utility methods for working with canvas.
 * @author Paul Roth <proth@salesforce.com>
 **/

//-- cryptography library
var CryptoJS = require( 'crypto-js' );

//-- used to access canvas multi-part body signatures
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();



 
/**
 *  Checks a signed request
 *  @param signedRequest (String)
 *  @param sharedSecret (String)
 *  @return boolean - true if passing false if not
**/
function validateSignedRequest( signedRequest, sharedSecret ){
	
	var matches = false;
	
	var hashedContext, b64Hash, context, hash;
	
	try {
		//-- hashed context
		hashedContext = signedRequest.split( '.' )[0];
		context = signedRequest.split( '.' )[1];
		
		//-- sign the hash with the secret
		hash = CryptoJS.HmacSHA256( context, sharedSecret );
		b64Hash = CryptoJS.enc.Base64.stringify( hash );
		
		matches = (hashedContext === b64Hash );
		
	} catch( err ){
		console.error( 'error occurred while checking signed request' );
		console.error( err );
	}
	
	if( matches ){
		console.log( 'signed_request matches' );
	} else {
		console.error( 'signed_request DOES NOT MATCH' +
			'\nExpecting:' + b64Hash +
			'\nFound:' + hashedContext
		);
	}
	
	return( matches );
}

/**
 * Get user context
 * @param signedRequest (String)
 * @param sharedSecret (String)
 * @return UserInfo (Object)
 **/
function getSignedRequestContext( signedRequest, sharedSecret ){
	var results = {};
	
	//-- hashed context
	var hashedContext = signedRequest.split( '.' )[0];
	var context = signedRequest.split( '.' )[1];
	
	var words = CryptoJS.enc.Base64.parse(context);
	var textString = CryptoJS.enc.Utf8.stringify(words);
	
	//-- @TODO: remove
	console.log( 'signed request context:' ); console.log( textString );
	
	return( JSON.parse( textString ));
}

module.exports = {
	validateSignedRequest: validateSignedRequest,
	getSignedRequestContext: getSignedRequestContext
};