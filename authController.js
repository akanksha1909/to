var jwt     = require( "jsonwebtoken" ); //Package used for session validation
var config  = require( "./config" ); 

	auth = {
	    authenticate : function(req, res, next){
		var token = req.body.authorization || req.query.authorization || req.headers['authorization'];
		if (token) {
		    jwt.verify(token, config.jwtsecret, function(err, decoded) {
		        if (err) {
		            return res.status(401).json({ status: 3, message: 'Authentication Failed.' });
		        } else {
		            req.authenticated = decoded;
		            next();
		        }
		    });
		} else {
		    return res.status(401).send({
		        status: 3,
		        message: 'No token provided.'
		    });
		}
	    }
	};
module.exports = auth;