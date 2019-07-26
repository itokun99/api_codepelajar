var db = require('../config/database');
var bcrypt = require('bcrypt');
var moment = require('moment');
var { sendCallBack } = require('../utils/modelHelper');

var Token_model = {
    getToken : function(user_id, tokenOnly = false){
        var promise = new Promise(function(resolve, reject){
            if(tokenOnly){
                var sql = "SELECT token_value FROM cp_usertoken WHERE user_id = ?";
            } else {
                var sql = "SELECT *  FROM cp_usertoken WHERE user_id = ? ";
            }
            db.query(sql, user_id, function(err, result, field){
                if(err){
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        })
        return promise;
    },
    createToken : function(data){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync("c0d3p3l4j4r", salt);
        var promise = new Promise(function(resolve, reject){
            var sql = `INSERT INTO cp_usertoken (
                user_id,
                token,
                type,
                status
            ) VALUES ( ? , ? , ? , ? )`;
            var sqlValue = [
                data.user_id,
                hash,
                data.type,
                1
            ];
            db.query(sql, sqlValue, function(err, result, field){
                if(err){
                    reject(err)
                } else {
                    resolve(result);
                }
            })
        })
        return promise;
    }
}

module.exports = Token_model;