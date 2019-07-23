var bcrypt = require('bcrypt');
var userModel = require('../models/User_model');
var response = require('../utils/response');
var tokenModel = require('../models/Token_model');

var UserController = {
    getUser : async function(req, res){
        try {
            var user_id =  req.params.user_id; 
            var users = await userModel.getUser(typeof (user_id) === "undefined" ? null : user_id )
            .then(function(state){ return state })
            if(users.length > 0){
                response.ok(users, res);
            } else {
                response.notFound(res)
            }
        } catch (e) {
            response.serverError(e, res);
        }
    },
}

module.exports = UserController;