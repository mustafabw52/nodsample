
!(function() {
    var UserModel = require('../models/user'),
            ProjectUserModel = require('../models/project_users');

    var Auth = {
        isManagerAuthenticated: function(req, res, next) {
            var token = Auth._getToken(req);
            if (token) {
                UserModel.findOne({access_token: token}, function(err, user) {
                    if (err) {
                        res.json({success: false, data: err, message: ''});
                    }
                    if (!user) {
                        res.json({success: false, data: [], message: 'Invalid access token.'});
                    } else {
                        ProjectUserModel.findOne({user_id: user._id}, function(err, projectUser) {
                            if (err) {
                                res.json({success: false, data: [], message: 'Invalid user access.'});
                            } else {
                                if (projectUser.user_role === 'manager') {
                                    req.user = user;
                                    return next(null, user, {scope: 'all'});
                                } else {
                                    res.json({success: false, data: [], message: 'Only manager can access developer list of this project.'});
                                }

                            }
                        });


                    }

                });
            } else {
                var err = new Error('Access token is missing');
                return next(err);
            }
        },
        isSuperAdminAuthenticated: function(req, res, next) {
            var token = Auth._getToken(req);
            if (token) {
                UserModel.findOne({access_token: token}, function(err, user) {
                    if (err) {
                        res.json({success: false, data: err, message: ''});
                    }
                    if (!user) {
                        res.json({success: false, data: [], message: 'Invalid access token.'});
                    } else {
                        if (user.user_type === 'superadmin')
                        {
                            req.user = user;
                            return next(null, user, {scope: 'all'});

                        }
                        else
                        {
                            res.json({success: false, data: [], message: 'Only super admin can access all user list or all project list.'});
                        }
                    }

                });
            } else {
                var err = new Error('Access token is missing');
                return next(err);
            }
        },
        _getToken: function(req) {
            var token;

            if (req.headers && req.headers.authorization) {
                var parts = req.headers.authorization.split(' ');
                if (parts.length == 2) {
                    var scheme = parts[0]
                            , credentials = parts[1];

                    if (/^Bearer$/i.test(scheme)) {
                        token = credentials;
                    }
                } else {

                }
            }

            if (req.body && req.body.access_token) {
                if (token) {

                }
                token = req.body.access_token;
            }

            if (req.query && req.query.access_token) {

                token = req.query.access_token;
            }
            return token;
        }
    };

    module.exports = Auth;
})
        ();