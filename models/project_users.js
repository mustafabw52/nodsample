var mongoose = require('mongoose')
    , timestamps = require('mongoose-timestamp')
    , mongoosePaginate = require('mongoose-paginate')
    , util = require('util')
    //, StringHelper = require('../../../helpers/string')
    , Schema = mongoose.Schema
    , projectUsersSchema
    , userRoles = {
        values: ['developer', 'manager'],
        message: "Invalid user role"
    };

projectUsersSchema = new Schema({
    project_id: {type: Schema.Types.ObjectId, ref: 'Project', default: null},
    user_id: {type: Schema.Types.ObjectId, ref: 'User', default: null},
    user_role: {type: String, enum: userRoles},
});



projectUsersSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});






projectUsersSchema.statics.projectUsers = function(req, callback) {
    var where = {project_id:req.params.id},
        page = req.params.page || 1,
        sortBy = {};
    sortBy.created_at = -1;
    ProjectUsers.paginate(where, {
        page: page,
        limit: 10
    }, callback);
};

projectUsersSchema.statics.assignProjectToUser = function(req, callback) {
    ProjectUsers.create(req.body, function(err, model) {
        if (err) {
            callback(err);
        } else {
            callback(null, model);
        }
    });
};

projectUsersSchema.plugin(mongoosePaginate);
var ProjectUsers = mongoose.model('ProjectUsers', projectUsersSchema);

module.exports = ProjectUsers;