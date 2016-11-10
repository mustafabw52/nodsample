var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , util = require('util')
        , Schema = mongoose.Schema
        , peojectSchema;

projectSchema = new Schema({
    project_name: {type: String},
});

projectSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});




projectSchema.statics.projectList = function(req, callback) {
    var where = {},
      page = req.params.page || 1,
      sortBy = {};
      sortBy.created_at = -1;;
    Project.paginate(where, {
            page: page,
            limit: 10
        }, callback);
};

projectSchema.statics.createProject = function(req, callback) {
    Project.create({project_name: req.body.project_name}, function(err, model) {
                        if (err) {
                            callback(err);
                        } else {
                            callback(null, model);
                        }
                    }); 
};

projectSchema.plugin(mongoosePaginate);
var Project = mongoose.model('Project', projectSchema);

module.exports = Project;