/**
 * Utility methods for working with canvas.
 * @author Paul Roth <proth@salesforce.com>
 **/

var CryptoJS = require( 'crypto-js' );
 
/**
 *  Checks a signed request
 *  @param signedRequest (String)
 *  @param sharedSecret (String)
 *  @return boolean - true if passing false if not
**/
function checkSignedRequest( signedRequest, sharedSecret ){
	
	console.log( 'secret:' + sharedSecret );
	console.log( 'signed request:' + signedRequest );
	
	var matches = false;
	try {
		//-- hashed context
		var hashedContext = signedRequest.split( '.' )[0];
		var context = signedRequest.split( '.' )[1];
		
		//-- sign the hash with the secret
		var hash = CryptoJS.HmacSHA256( context, sharedSecret );
		var b64Hash = CryptoJS.enc.Base64.stringify( hash );
		
		console.log( 'what I am expecting:' + b64Hash );
		console.log( 'what I got:' + hashedContext );
		
		matches = (hashedContext === b64Hash );
		console.log( 'matches:' + matches );
	} catch( err ){
		console.error( 'error occurred while checking signed request' );
		console.error( err );
	}
	
	return( matches );
}

module.exports = {
	checkSignedRequest: checkSignedRequest
};