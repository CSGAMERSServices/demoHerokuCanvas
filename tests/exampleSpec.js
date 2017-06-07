var helloWorld = require( '../src/helloWorld' );


describe( 'Hello World', function () {
	it( 'says hello', function () {
		expect( helloWorld() ).toEqual('Hello world!');	
	});
});