var Project = require('../../common/models/project');
var ProjectUsers = require('../../common/models/project_users');
var config = require('../../../config');

var ProjectController = {
    signup: function(req, res, next) {
        passport.authenticate('signup', function(err, user, info) {
            if (err) {
                return next(err);
            }
            ApiResponse.send(res, {success: true, data: user, message: ''});

        })(req, res, next);
    },
    
};



module.exports = UserController;