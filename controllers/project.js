var ProjectModel = require('../models/project');
var ProjectUsers = require('../models/project_users');

var ProjectController = {
    create: function(req, res, next) {
         ProjectModel.createProject(req, function (err,data) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: data,
                        message: 'Project Successfully created.'
                    });
                }
            });
    },
    projectList: function(req, res, next) {
         ProjectModel.projectList(req, function (err,paginatedResults, pageCount, itemCount) {
                if (err) {
                    res.json({success: false, data: err, message: ''});
                } else {
                    res.json({
                        success: true,
                        data: {totalItems: itemCount, page: pageCount, items: paginatedResults},
                        message: 'Project Successfully created.'
                    });
                }
            });
    }
};



module.exports = ProjectController;