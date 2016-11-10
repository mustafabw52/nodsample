var passport = require('passport');
var User = require('../../common/models/user');
var config = require('../../../config');

var UserController = {
    
    
    
    
    
    signup: function(req, res, next) {
        passport.authenticate('signup', function(err, user, info) {
            if (err) {
                return next(err);
            }
            ApiResponse.send(res, {success: true, data: user, message: ''});

        })(req, res, next);
    },
    
    login: function(req, res, next) {
        passport.authenticate('login', function(err, user, info) {
            if (err) {
                return next(err);
            }
            req.logIn(user, function(err) {
                if (err) {
                    return next(err);
                } else {
                    LoginHistory.create({user_id: user.id}, function(err, data) {
                    });
                    ApiResponse.send(res, {success: true, data: user, message: ''});
                }
            });
        })(req, res, next);
    },
    logout: function(req, res, next) {

        if (req.user !== undefined) {
            User.findOne({'_id': req.user._id}, function(err, user) {
                if (err) {
                    return next(err);
                }
                console.log(user);
                if (!user) {
                    ApiResponse.send(res, {
                        success: true,
                        data: [],
                        message: LocaleMessage.getSuccessMessage('error_occured')
                    });
                } else {
                    if (user.user_type === "learner" || user.user_type === "tutor") {
                        user.set('access_token', '');
                        user.save(function(err) {
                            console.log(err);
                            if (err)
                                return done(err);
                            req.logout();
                            ApiResponse.send(res, {
                                success: true,
                                data: [],
                                message: LocaleMessage.getSuccessMessage('user_logout')
                            });
                        })
                    }
                    else
                    {
                        ApiResponse.send(res, {
                            success: true,
                            data: [],
                            message: LocaleMessage.getSuccessMessage('user_logout')
                        });
                    }
                }
            });
        }
        else {
            ApiResponse.send(res, {
                success: true,
                data: [],
                message: LocaleMessage.getSuccessMessage('error_occured')
            });
        }


    },
    
};



module.exports = UserController;