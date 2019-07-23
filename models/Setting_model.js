var db = require('../config/database');
var moment = require('moment');
var { sendCallBack } = require('../utils/modelHelper');



var Setting_model = {
    getSettings : function(){
        var promise = new Promise(function(resolve, reject){
            var sql = "SELECT * FROM cp_settings";
            db.query(sql, function(err, result, field){
                if(err){
                    reject(err);
                } else {
                    resolve(result, field)
                }
            })
        })
        return promise;
    }
}

module.exports = Setting_model