var bcrypt = require('bcrypt');
var userModel = require('../models/User_model');
var { response } = require('../utils/response');
var tokenModel = require('../models/Token_model');

var AuthController = {
    login : function(req, res){
        var email = req.body.email;
        var password = req.body.password;
        var role = req.body.role;
        switch(role){
            case "admin":
                userModel.getAdmin(email).then(function(result){
                    if(result.error){
                        console.log(result);
                        response(500, "Server error" , {} , res );
                    } else {
                        if(result.data.length === 1){
                            var admin = result.data[0];
                            var verify = bcrypt.compareSync(password, admin.user_password);
                            if(verify){
                                tokenModel.getToken(admin.user_id)
                                .then(function(result){
                                    if(result.error){
                                        console.log(result);
                                        response(500, "Server Error!!" , result.data , res );
                                    } else {
                                        if(result.data.length === 1){
                                            var token = result.data[0].token_value;
                                            admin.token = token;
                                            response(200, "Login Successfull!" , admin , res );
                                        } else {
                                            response(400, "User not allowed! duplicate token." , null , res );
                                        }
                                    }
                                })
                            } else {
                                response(400, "Wrong Password!!" , null , res );
                            }
                        } else {
                            if(result.data.length > 1){
                                response(400, "Duplicate Account detected!", result.data, res);
                            } else {
                                response(404, "Account not found!", result.data, res);
                            }
                        }
                    }
                })
                break;
            case "user":
                userModel.getUserByEmail(email).then(function(result){
                    if(result.error){
                        console.log(result);
                        response(500, "Server error" , {} , res );
                    } else {
                        if(result.data.length === 1){
                            var user = result.data[0];
                            var verify = bcrypt.compareSync(password, user.user_password);
                            user.token = token;
                            if(verify){
                                response(200, "Login Successfull!" , user , res );
                            } else {
                                response(400, "Wrong Password!!" , null , res );
                            }
                        } else {
                            if(result.data.length > 1){
                                response(400, "Duplicate Account detected!", result.data, res);
                            } else {
                                response(404, "Account not found!", result.data, res);
                            }
                        }
                    }
                })
                break;
            default:
                response(405, "Method not allowed!", null, res);
                break;
        }
    }
}

module.exports = AuthController;