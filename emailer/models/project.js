var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , util = require('util')
        , StringHelper = require('../../../helpers/string')
        , Schema = mongoose.Schema
        , peojectSchema;

projectSchema = new Schema({
    project_name: {type: String},
});

projectSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

projectSchema.plugin(mongoosePaginate);


projectSchema.methods.getProjectData = function(req, res, where, page) {
    Project.paginate(where, page, 10, function(err, pageCount, paginatedResults, itemCount) {
        if (err) {
            return next(err);
        } else {
            ApiResponse.send(res, {success: true, data: {pageCount: pageCount, items: paginatedResults, totalCount: itemCount}});
        }
    }, {columns: '-password'});
};



var Project = mongoose.model('Project', projectSchema);

module.exports = Project;