var ProjectModel = require('../models/project');
var ProjectUsersModel = require('../models/project_users');

var ProjectUsersController = {
    create: function(req, res, next) {
         ProjectUsersModel.assignProjectToUser(req, function (err,data) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: data,
                        message: 'Project Successfully assigned.'
                    });
                }
            });
       
    },
    projectUsers: function(req, res, next) {
          ProjectUsersModel.projectUsers(req, function (err,paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: paginatedResults},
                        message: ''
                    });
                }
            });
    }
};



module.exports = ProjectUsersController;