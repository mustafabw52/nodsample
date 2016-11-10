var mongoose = require('mongoose')
        , timestamps = require('mongoose-timestamp')
        , passportLocalMongoose = require('passport-local-mongoose')
        , mongoosePaginate = require('mongoose-paginate')
        , util = require('util')
        , StringHelper = require('../../../helpers/string')
        , Schema = mongoose.Schema
        , userTypes
        , userSchema;
userTypes = {
    values: ['normal', 'superadmin'],
    message: "Invalid user type"
};

userSchema = new Schema({
    name: {type: String},
    password: {type: String, required: true},
    status: {type: String, default: 'pending', enum: ['pending', 'active', 'inactive', 'deleted', 'verified']},
    access_token: {type: String},
    user_type: {type: String, enum: userTypes},
});

userSchema.plugin(timestamps, {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

userSchema.plugin(mongoosePaginate);




userSchema.methods.getUserData = function(req, res, where, page) {

    User.paginate(where, page, 10, function(err, pageCount, paginatedResults, itemCount) {
        if (err) {
            return next(err);
        } else {
            ApiResponse.send(res, {success: true, data: {pageCount: pageCount, items: paginatedResults, totalCount: itemCount}});
        }
    },{columns:'-password'});
};

/*
 * Generate hash password
 */
userSchema.statics.hashPassword = function(password, callback) {
    bcrypt.hash(password, null, null, callback);
};
/*
 * compare hash password
 */
userSchema.statics.comparePassword = function(password, passwordHash, callback) {
    bcrypt.compare(password, passwordHash, callback);
};


var User = mongoose.model('User', userSchema);

module.exports = User;