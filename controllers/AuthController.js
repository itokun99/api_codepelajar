var bcrypt = require('bcrypt');
var userModel = require('../models/User_model');
var response = require('../utils/response');
var tokenModel = require('../models/Token_model');
var _ = require('lodash');

var AuthController = {
    login : async function(req, res){
        try {
            var user_data = [];
            var email = req.body.email;
            var password = req.body.password;

            var existing_email = await userModel.checkEmail(email);
            var existing_username = await userModel.checkUserName(email);
            if(_.isEmpty(existing_email) && !_.isArray(existing_email)){
                response.badRequest("User with email not registered!", null, res)
            } else if(_.isEmpty(existing_username) && !_.isArray(existing_username)){
                response.badRequest("User with username not registered!", null, res)
            } else {
                var users = existing_email | existing_username;
                if(users.length === 1){
                    var user = users[0];
                    var token_data = tokenModel.getToken(user.user_id);
                    if(!_.isEmpty(token_data) && _.isArray(token_data)){
                        
                    } else {

                    }
                } else {
                    response.badRequest("User cannot login!", null, res)
                }
            }

        } catch (e){

        }
    }
}

module.exports = AuthController;