var bcrypt = require('bcrypt');
var Users = require('../models/User_model');
var Tokens = require('../models/Token_model');
var response = require('../utils/response');
var _ = require('lodash');

var UserController = {
    getUsers: async function(req, res){
        try {
            var users = await Users.findAll();
            if(users){
                response.ok(users, res);
            }
        } catch (e) {
            response.serverError(e, res);
        }
    },
    createUser: async function(req, res){
        try {
            var salt = 10;
            var name = req.body.name;
            var email = req.body.email;
            var password = req.body.password;

            var dataUser = {
                name, email, password
            }
            var empty = false;
            Object.keys(dataUser).forEach(function(key){
                if(!dataUser[key] && dataUser[key] === ''){
                    empty = true;
                }
            })
            var exist_email = await Users.findAll({
                limit: 1,
                where: { email: email }
            });

            if(empty) return response.badRequest('Field cannot be empty!', res);
            if(exist_email && !_.isEmpty(exist_email)) return response.badRequest('Email is already registered!', res);

            password = await bcrypt.hash(password, salt);
            token = await bcrypt.hash('@c0d3p3l4j4rd0tc0m', salt);
            if(password){
                var insertedUser = await Users.create({
                    name: name,
                    email: email,
                    password: password,
                    type: 1,
                    status: 1,
                })
                
                if(insertedUser && !_.isEmpty(insertedUser.dataValues)) {
                    console.log(insertedUser.dataValues)
                    var userData = insertedUser.dataValues;
                    var createToken = await Tokens.create({
                        user_id: userData.id,
                        token: token,
                        status: 1,
                        type: 'admin'
                    })
                    if(createToken && !_.isEmpty(createToken.dataValues)){
                        response.created('User created successfull!', userData, res)
                    }
                }
            }
        } catch (e) {
            response.serverError(e, res);
        }
    }
}

module.exports = UserController;