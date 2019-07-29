var bcrypt = require('bcrypt');
var userModel = require('../models/User_model');
var tokenModel = require('../models/Token_model');
var response = require('../utils/response');
var moment = require('moment');
var _ = require('lodash')

var UserController = {
    getUser: async function(req, res){
        try {
            var user_id =  req.query.user_id
            // get user data
            var users = await userModel.selectUser(1, typeof (user_id) === "undefined" ? null : user_id );
            
            // if user data array is empty response 404
            if(users.length === 0){
                response.notFound(res)
            } else if(users.length === 1){
                if(typeof(user_id) !== "undefined"){
                    response.ok(users[0], res);
                } else {
                    response.ok({
                        users
                    }, res);
                }
            } else if(users.length > 1){
                response.ok({
                    users: users
                }, res)
            }
        } catch (e) {
            response.serverError(e, res);
        }
    },
    createUser: async function(req, res){
        try {
            var generateSalt = 10;
            var user_name = req.body.username;
            var user_fullname = req.body.fullname;
            var user_email = req.body.email;
            var user_password = bcrypt.hashSync(req.body.password, generateSalt);
            var user_create_date = moment().format('YYYY-MM-DD');
            var user_type = 1;
            var user_status = 1;
            var user_pic = 'user_default.png';
            var user_bio = req.body.bio;

            var user_data = {
                user_name,
                user_fullname,
                user_email,
                user_password,
                user_create_date,
                user_type,
                user_status,
                user_pic,
                user_bio
            }

            var notFill = false;
            for(var key in user_data){
                if(user_data[key] === "" || typeof(user_data[key]) === "undefined" || user_data[key] === null){
                    notFill = true;
                }
            }

            if(notFill){
                response.badRequest("Please complete the form!", res)                
            } else {
                var existing_email = await userModel.checkEmail(user_email);
                var existing_username = await userModel.checkUserName(user_name);

                if(!_.isEmpty(existing_email) && _.isArray(existing_email)){
                    response.badRequest("Email has taken!", res)
                } else if(!_.isEmpty(existing_username) && _.isArray(existing_username)){
                    response.badRequest("Username has taken!", res)
                } else {
                    var insert_user = await userModel.insertUser(user_data)
                    if(insert_user.affectedRows !== 0){
                        var user_id = insert_user.insertId;
                        var token_data = {
                            user_id : user_id,
                            type: 1,
                            status: 1,
                        }
                        var createToken = await tokenModel.createToken(token_data);
                        if(createToken.affectedRows !== 0){
                            response.created("Register successfull!", null, res);
                        } else {
                            response.badRequest("Registration failed!", res)
                        }
                    } else {
                        response.badRequest("Registration failed!", res)
                    }
                }
            }
        } catch (e) {
            response.serverError(e, res)
        }
    },
}

module.exports = UserController;