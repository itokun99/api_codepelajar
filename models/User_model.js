var db = require('../config/database');
var { sendCallBack } = require('../utils/modelHelper');
var moment = require('moment');

var User_model = {
    getUser : (user_id = null) => {
        var promise = new Promise(function(resolve, reject){
            var sql = `SELECT *  FROM cp_users WHERE user_type != 1 ${user_id !== null ? 'AND user_id = ?' : ""}`;
            var sqlValue = [];
            if( user_id !== null ) sqlValue[0] = user_id;
            db.query( sql, sqlValue ,function(err, result, field){
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        })
        return promise;
    },
    getUserByEmail : (email) => {
        var promise = new Promise(function(resolve, reject){
            var sql = "SELECT *  FROM cp_users WHERE user_type != 1 AND user_email = ?";
            var sqlValue = [ email ];
            db.query( sql, sqlValue ,function(err, result, field){
                if(err){
                    console.log(err);
                    resolve(sendCallBack(true, err));
                } else {
                    resolve(sendCallBack(false, result));
                }
            });
        })
        return promise;
    },
    getAdmin : (email) => {
        var promise = new Promise(function(resolve, reject){
            var sql = "SELECT *  FROM cp_users WHERE user_type = 1 AND user_email = ?";
            var sqlValue = [ email ];
            db.query( sql, sqlValue ,function(err, result, field){
                if(err){
                    console.log(err);
                    resolve(sendCallBack(true, err));
                } else {
                    resolve(sendCallBack(false, result));
                }
            });
        })
        return promise;
    },
    createUserAdmin : (user_data) => {
        var promise = new Promise(function(resolve, reject){
            var sql = `INSERT INTO cp_users 
                (
                    user_id, 
                    user_email, 
                    user_password, 
                    user_name, 
                    user_fullname, 
                    user_type, 
                    user_created_date, 
                    user_status
                ) VALUES ("", ? , ? , ?, ?, ?, ? , ? )`;
            var sqlValue = [
                user_data.email,
                user_data.password,
                user_data.name,
                user_data.fullname,
                1,
                moment().format('YYYY-MM-DD'),
                1
            ];
            db.query(sql, sqlValue, function(err, result, field){
                if(err){
                    console.log(err);
                    resolve(sendCallBack(true, err));
                } else {
                    resolve(sendCallBack(false, result))
                }
            })
        });
        return promise;
    },
    checkUserEmail : (email) => {
        var promise = new Promise(function(resolve, reject){
            var sql = "SELECT user_email  FROM cp_users WHERE user_email = ?";
            var sqlValue = [ email ];
            db.query( sql, sqlValue ,function(err, result, field){
                if(err){
                    console.log(err);
                    resolve(sendCallBack(true, err));
                } else {
                    resolve(sendCallBack(false, result));
                }
            });
        })
        return promise;
    },

    createNewUser : function(data){
        return new Promise(function(resolve, reject){
            var sql = `INSERT INTO cp_users (
                'user_id',
                'user_name',
                'user_fullname', 
                'user_email', 
                'user_password', 
                'user_create_date', 
                'user_type', 
                'user_status', 
                'user_pic', 
                'user_bio'
            ) VALUES ('', ?, ?, ?, ?, ?, ?, ?, ?, ? )`;
            var sqlValue = [ 
                data.user_fullname, 
                data.user_name,
                data.user_email, 
                data.user_password, 
                data.user_create_date, 
                data.user_type, 
                data.user_status, 
                data.user_pic, 
                data.user_bio
            ]
        })
    }
}

module.exports = User_model;