var Request     = require( "request" ),
    config      = require( "../config" ),
    Querystring = require( "querystring" ),
    crypto      = require( "crypto" );

module.exports = {
    verifyOtp : function( authCode,next ) {
        
        app_id                  = config.accountkit.app_id;
        app_secret              = config.accountkit.account_kit_secret;
        token_exchange_base_url = config.accountkit.access_token_url;
        me_endpoint_base_url    = config.accountkit.verify_url;
        
        
        var app_access_token = ['AA', app_id, app_secret].join('|');
        var params = {
          grant_type: 'authorization_code',
          code: authCode,
          access_token: app_access_token
        };

        // exchange tokens
        var token_exchange_url = token_exchange_base_url + '?' + Querystring.stringify( params );
        
        try{

            Request.get({url: token_exchange_url, json: true}, function(err, resp, respBody) {
                
                if( err ){
                    next({ status : 2 });
                    return;
                }
                
                if( respBody.hasOwnProperty( 'error' ) ){
                    next({ status : 2 });
                    return;
                }
                
              
                var view = {
                    user_access_token: respBody.access_token,
                    expires_at: respBody.expires_at,
                    user_id: respBody.id,	
                };

                //Generating app secret proof using sha256. Ref : https://developers.facebook.com/docs/graph-api/securing-requests
                hash = crypto.createHmac('sha256', app_secret ).update( respBody.access_token ).digest( 'hex' )


                // get account details at /me endpoint
                var me_endpoint_url = me_endpoint_base_url + '?access_token=' + respBody.access_token + '&appsecret_proof='+ hash;

                Request.get({url: me_endpoint_url, json:true }, function(err, resp, respBody) {
                    // send login_success.html
                    if( err ){
                      
                        next({ status : 2});
                        return;
                    }

                    if( respBody.hasOwnProperty( 'error' ) ){
                        console.log( err );
                        next({ status : 2});
                        return;
                    }

                  
                    if (respBody.phone) {
                      view.phone_num = respBody.phone.number;
                    } else if (respBody.email) {
                      view.email_addr = respBody.email.address;
                    }

                    next({ status : 1, data : respBody.phone.number });
                    return ;
                });
            });
        }catch( err ){
            next({ status : 2 });
        }
    }
}