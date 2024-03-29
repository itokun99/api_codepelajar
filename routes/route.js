var UserController = require('../controllers/UserController');
var AuthController = require('../controllers/AuthController');
var SettingController = require('../controllers/SettingController');

var routes = function(app){
    //user routes
    app.route('/api/users').get(UserController.getUsers);
    app.route('/api/user').post(UserController.createUser);


    //auth routes
    app.route('/api/auth').post(AuthController.login);
    
    // default response
    app.route("*").get(function(req, res){
        res.status(405);
        res.json({
            status : 405,
            message : "method not allowed!"
        })
        res.end();
    })
}

module.exports = routes;