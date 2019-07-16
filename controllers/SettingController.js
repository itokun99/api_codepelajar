var settingModel = require('../models/Setting_model');
var userModel = require('../models/User_model');
var { response } = require('../utils/response');
var tokenModel = require('../models/Token_model');


var SettingController = {
    getInitSetting : function(req, res){
        settingModel.getSettings()
        .then(function(result){
            if(result.error){
                response(500, "Server Error", null, res)
            } else {
                if(result.data.length === 1){
                    response(200, "Success", result.data[0], res);
                } else {
                    response(500, "Server Error", null, res)
                }
            }
        })
    }
}

module.exports = SettingController;