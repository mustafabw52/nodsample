var passport = require('passport');
var User = require('../models/user');

var UserController = {
    signup: function (req, res, next) {
        console.log(req.body);
            var token = Math.random().toString(36).substr(2);
        User.create({username: req.body.username, password: req.body.password, user_type: req.body.user_type,status: 'active',access_token: token}, function (err, data) {
            if (err)
                return next(err);

            res.json({success: true, data: data, message: "user Successfully created."});
        });
    },
    login: function (req, res, next) {
        var where = {username: req.body.username, password: req.body.password}
        User.findOne(where, function (err, model) {
            if (err)
                return next(err);
            var token = Math.random().toString(36).substr(2);
            console.log(model);
            model.access_token=token;
            model.save(function (err, data) {
                if (err)
                    return next(err);
                res.json({success: true, data: model, message: "logged in Successfully "});
            });
        });

    },
    logout: function (req, res, next) {

        var where = {access_token: req.query.access_token}
        User.findOne(where, function (err, model) {
            if (err)
                return next(err);
            model.access_token="";
            model.save(function (err, data) {
                if (err)
                    return next(err);
                res.json({success: true, data: [], message: "log out Successfully."});
            });
        });


    },
    
    list: function (req, res, next) {

        User.find({status:"active"}, function (err, data) {
            if (err)
                return next(err);            
            res.json({success: true, data: data, message: "user list "});
            
        });


    },
     delete: function (req, res, next) {
          User.remove({_id:req.params.id}, function (err, data) {
            if (err)
                return next(err);            
                res.json({success: true, data: data, message: "user successfully deleted. "});
            
        });


    }
};



module.exports = UserController;