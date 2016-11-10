var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , mongoosePaginate = require('mongoose-paginate')
        , util = require('util')
        , StringHelper = require('../../../helpers/string')
        , Schema = mongoose.Schema
        , peojectUsersSchema
        , userRoles = {
            values: ['developer', 'manager'],
            message: "Invalid user role"
        };

peojectUsersSchema = new Schema({
    project_id: {type: Schema.Types.ObjectId, ref: 'Project', default: null}, ,
            user_id: {type: Schema.Types.ObjectId, ref: 'User', default: null}, ,
            user_role: {type: String, enum: userRoles},
});



peojectUsersSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

peojectUsersSchema.plugin(mongoosePaginate);




peojectUsersSchema.methods.getProjectData = function(req, res, where, page) {
    Project.paginate(where, page, 10, function(err, pageCount, paginatedResults, itemCount) {
        if (err) {
            return next(err);
        } else {
            ApiResponse.send(res, {success: true, data: {pageCount: pageCount, items: paginatedResults, totalCount: itemCount}});
        }
    }, {columns: '-password'});
};



var ProjectUsers = mongoose.model('ProjectUsers', projectUsersSchema);

module.exports = ProjectUsers;