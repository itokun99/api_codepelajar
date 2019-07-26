var settingModel = require('../models/Setting_model');
var userModel = require('../models/User_model');
var tokenModel = require('../models/Token_model');
var response = require('../utils/response');


var SettingController = {
    getInitSetting : async function(req, res){
        try {
            var data = await settingModel.getSettings().then(function(state){ return state });
            // data is array, so destruct with object;
            if(data.length === 1){
                response.ok(data[0], res);
            } else {
                response.badRequest("Incorrect in server!", res);
            }
        } catch (e) {
            console.log(e);
            response.serverError(e, res);
        }
    }
}

module.exports = SettingController;