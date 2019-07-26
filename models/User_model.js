var db = require('../config/database');
var moment = require('moment');

var User_model = {
    selectUser : (user_type, user_id = null) => {
        var promise = new Promise(function(resolve, reject){
            var sql = `SELECT *  FROM cp_users WHERE user_type = ? ${user_id !== null ? 'AND user_id = ?' : ""}`;
            var sqlValue = [user_type, user_id];
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
    insertUser : function(user_data){
        return new Promise(function(resolve, reject){
            var sql = `INSERT INTO cp_users (
                user_name, 
                user_fullname, 
                user_email, 
                user_password, 
                user_create_date, 
                user_type, 
                user_status, 
                user_pic, 
                user_bio
            ) VALUES (?,?,?,?,?,?,?,?,?)`;
            var sqlValue = [
                user_data.user_name, 
                user_data.user_fullname, 
                user_data.user_email,
                user_data.user_password, 
                user_data.user_create_date, 
                user_data.user_type, 
                user_data.user_status, 
                user_data.user_pic, 
                user_data.user_bio
            ]
            db.query(sql, sqlValue, function(err, result){
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    updateUser: function(user_id, user_data){
        return new Promise(function(resolve, reject){
            var sql = `UPDATE cp_users 
            SET user_name = ?,
            user_fullname = ?, 
            user_email = ?,
            user_password = ?, 
            user_create_date = ?, 
            user_type = ?,
            user_status = ?, 
            user_pic = ?, 
            user_bio = ?  
            WHERE ?`;

            var sqlValue = [
                user_data.user_name, 
                user_data.user_fullname, 
                user_data.user_email,
                user_data.user_password, 
                user_data.user_create_date, 
                user_data.user_type, 
                user_data.user_status, 
                user_data.user_pic, 
                user_data.user_bio,
                user_id
            ]
            
            db.query(sql, sqlValue, function(err, result){
                if(err){
                    reject(err);
                } else {
                    resolve(result)
                }
            })
        })
    },
    deleteUser: function(user_id){
        return new Promise(function(resolve, reject){
            var sql = `DELETE FROM cp_users WHERE user_id = ${user_id}`;
            db.query(sql, function(err, result){
                if(err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    checkEmail: function(user_email){
        return new Promise(function(resolve, reject){
            var sql = `SELECT * FROM cp_users WHERE user_email = '${user_email}'`;
            db.query(sql, function(err, result, field){
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
    checkUserName: function(user_name){
        return new Promise(function(resolve, reject){
            var sql = `SELECT * FROM cp_users WHERE user_name = '${user_name}'`;
            db.query(sql, function(err, result, field){
                if(err){
                    reject(err);
                } else {
                    resolve(result);
                }
            })
        })
    },
}

module.exports = User_model;