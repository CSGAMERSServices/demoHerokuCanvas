

module.exports = {
	
	//-- which environment
	"env": "default",
	
	//-- defaults
	"default": {
		"PORT": 5000
	},
	
	"statusCodes": {
		"unauthorized": 401,
		"unauthorizedText": "Unauthorized"
	}
};

//-- post processing
module.exports.default.STATUS_CODE = module.exports.statusCodes.unauthorized;
module.exports.default.STATUS_TEXT = module.exports.statusCodes.unauthorizedText;

