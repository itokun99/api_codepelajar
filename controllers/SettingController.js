var settingModel = require('../models/Setting_model');
var userModel = require('../models/User_model');
var tokenModel = require('../models/Token_model');
var response = require('../utils/response');


var SettingController = {
    getInitSetting : async function(req, res){
        try {
            var data = await settingModel.getSettings().then(function(state){ return state });
            response.ok(data, res);
        } catch (e) {
            console.log(e);
            response.serverError(e, res);
        }
    }
}

module.exports = SettingController;