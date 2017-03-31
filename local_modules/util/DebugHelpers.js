/**
 * helper scripts for debugging things
 * @author Paul Roth <proth@salesforce.com>
 **/

/**
 * prints an object out to console.
 * @param obj (Object)
 * @param message (String)
 **/
function prettyTrace( obj, message ){
	if( obj ){
		console.log( 'starting review of:' + message );
		for( var key in obj ){
			console.log( message + '[' + key + ']:' + (typeof obj[key] ) + '=' + obj[key] );
		}
		console.log( 'ending review of:' + message );
	} else {
		console.log( 'obj: ' + message + ' - was not sent' );
	}
}

module.exports = {
	prettyTrace : prettyTrace
};