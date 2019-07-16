var bcrypt = require('bcrypt');
var userModel = require('../models/User_model');
var { response } = require('../utils/response');
var tokenModel = require('../models/Token_model');

var UserController = {
    getUser : function(req, res){
        var user_id =  req.params.user_id; 
        userModel.getUser(typeof (user_id) === "undefined" ? null : user_id )
        .then(function(result){
            if(result.error){
                console.log(result);
                response(500, "Server error" , {} , res );
            } else {
                var users = result.data;
                if(users.length > 0){
                    response(200, "Data founded" , users, res );
                } else {
                    response(404, "Data not found", users, res);
                }
            }
        })
    },
    createUserAdmin : function(req, res){
        var salt = 10;
        var user_data = {
            email : req.body.email,
            password : bcrypt.hashSync(req.body.password, salt),
            name : req.body.name,
            fullname : req.body.fullname,
        }

        userModel.checkUserEmail(user_data.email)
        .then(function(result){
            if(result.error){
                response(500, "Server error 1" , null , res );
            } else if(result.data.length > 0) {
                response(400, "User with email is exist!" , null , res );
            } else {
                userModel.createUserAdmin(user_data)
                .then(function(result){
                    if(result.error){
                        response(500, "Server error 2" , null , res );
                    } else {
                        // response(200, "Create user is completed!!" , result.data , res );
                        if(result.data.affectedRows > 0){
                            var user_id = result.data.insertId;
                            var token_data = {
                                user_id,
                                token_level : 1
                            }
                            tokenModel.createToken(token_data)
                            .then(function(result){
                                if(result.error){
                                    console.log(result);
                                    response(500, "Server error 3" , null , res );
                                } else {
                                    response(200, "Create user is completed!!" , null , res );
                                }
                            })
                        } else {
                            response(400, "Failed to create user!" , null , res );
                        }
                    }
                })
            }
        })
    }
}

module.exports = UserController;