var helloWorld = require('../src/helloWorld');
var assert = require('assert');


describe('Hello World', function (){
	it('says hello', function (){
		assert.equal(helloWorld(), 'Hello world!');
	});
});
