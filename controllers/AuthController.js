var bcrypt = require('bcrypt');
var userModel = require('../models/User_model');
var response = require('../utils/response');
var tokenModel = require('../models/Token_model');
var _ = require('lodash');

var AuthController = {
    login : async function(req, res){
        try {
            var email = req.body.email;
            var password = req.body.password;
            var data = [];
            var existing_email = await userModel.checkEmail(email);
            var existing_username = await userModel.checkUserName(email);
            if(!_.isEmpty(existing_email) && _.isArray(existing_email)) data = existing_email;
            if(!_.isEmpty(existing_username) && _.isArray(existing_username)) data = existing_username;
            if(_.isEmpty(data)){
                response.badRequest("User email/username not registered!", res)
            } else {
                var users = data;
                if(_.isEqual(users.length, 1)){
                    var user = users[0];
                    var verify_password = bcrypt.compareSync(password, user.user_password);
                    if(verify_password){
                        var token_data = await tokenModel.getToken(user.user_id);
                        if(!_.isEmpty(token_data) && _.isArray(token_data)){
                            var user_token = token_data[0].token;
                            user.token = user_token;
                            response.ok(user,res);
                        } else {
                            response.badRequest("User authorize is missing! please contact administrator", res);
                        }
                    } else {
                        response.badRequest("Wrong password!", res);
                    }
                } else {
                    response.badRequest("User cannot login!", res)
                }
            }

        } catch (e){
            response.serverError(e, res)
        }
    },
    isAuthorized: async function(req, res, next){
        try{
            var token = req.headers.token;
            if(!token) response.unauthorized(res);
            var exist_token = await tokenModel.checkToken(token);
            if(token && !_.isEmpty(exist_token)){
                next();
            } else {
                response.unauthorized(res);
            }
        } catch (e) {
            response.serverError(e, res)
        }
    }
}

module.exports = AuthController;