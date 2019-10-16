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
    },
    updateSetting: async function(req, res){
        try{
            var site_title = req.body.site_title;
            var site_description = req.body.site_description;
            var setting_data = {
                site_title,
                site_description
            }
            var noValue = false;
            for(var key in setting_data){
                if(setting_data[key] === "" || typeof(setting_data[key]) === "undefined" || setting_data[key] === null){
                    noValue = true;
                }
            }
            
            if(!noValue){
                var update = await settingModel.updateSetting(setting_data);
                if(update.affectedRows > 0){
                    response.created('Setting updated!', null, res);
                } else {
                    response.badRequest('Something wrong, setting not updated', res);
                }
            } else {
                response.badRequest('Invalid Value', res);
            }


        } catch (e) {
            console.log(e);
            response.serverError(e, res)
        }
    }
}

module.exports = SettingController;