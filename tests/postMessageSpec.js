var chai = require('chai');
var assert = chai.assert;

//-- note that this is the container of the module.
var LnePostMessage2 = require('../src/public/js/postMessage/LNE_PostMessage2');
var PostMessage = LnePostMessage2.LNE_PostMessage;

//debugger;

//-- see here for more examples
//-- http://chaijs.com/api/assert/#method_strictequal

describe('LNE_PostMessage', function (){
	it('sender is sent transparently', function (){
		var myPostMessage = new PostMessage('testSender', 'testMessage', true, { testData: 1 });
		assert.equal(myPostMessage.sender, 'testSender');
	});

	it('messageType is sent transparently', function (){
		var myPostMessage = new PostMessage('testSender', 'testMessage', true, { testData: 1 });
		assert.equal(myPostMessage.messageType, 'testMessage');
	});

	it('isSuccessful is sent transparently', function (){
		var myPostMessage = new PostMessage('testSender', 'testMessage', true, { testData: 1 });
		assert.equal(myPostMessage.isSuccessful, true);
	});

	it('data is sent transparently', function (){
		var myPostMessage = new PostMessage('testSender', 'testMessage', true, { testData: 1 });
		var data = myPostMessage.data;
		assert.isNotNull(myPostMessage.data, 'data should not be null');
		assert.property(myPostMessage.data, 'testData', 'testData was sent, so it should be found');
		assert.strictEqual(myPostMessage.data.testData, 1,
			'testData must be a property and assigned to 1, as that was what was sent');
	});//-- etc.
});
