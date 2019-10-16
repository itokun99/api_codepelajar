var bcrypt = require('bcrypt');
var Users = require('../models/User_model');
var response = require('../utils/response');
var Tokens = require('../models/Token_model');
var _ = require('lodash');

var AuthController = {
    login : async function(req, res){
        try {
            var email = req.body.email;
            var password = req.body.password;

            if(!email || email === ''){
                return response.badRequest('Fiel')
            }

            var user = await Users.findAll({
                limit: 1,
                where: { email: email }
            })

            if(!user) return response.badRequest('Account not found!');

            



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