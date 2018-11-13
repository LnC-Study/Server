var config = require('../../config');
var schema = {};

schema.createSchema = function(mongoose){
    var volunteerSchema = mongoose.Schema(config.DB_MODELS.volunteer);

    volunteerSchema.static('get_all_posts', function(callback){
        return this.find({}, callback);
    });
    volunteerSchema.static('delete_by_name', function(_name, callback){
        return this.deleteOne( { center: _name}, callback);
    });
};

module.exports = schema;