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
    },
    updateSetting: function(data){
        return new Promise(function(resolve, reject){
            var sql =  `
                UPDATE cp_settings
                SET site_title = '${data.site_title}' ,
                site_description = '${data.site_description}'
                WHERE id = 1
            `;
            db.query(sql, function(err, result){
                if(err){
                    reject(err)
                } else {
                    console.log(result)
                    resolve(result);
                }
            })
        })
    }
}

module.exports = Setting_model