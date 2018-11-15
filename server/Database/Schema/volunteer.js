var config = require('../../config');
var schema = {};

schema.createSchema = function(mongoose){
    var volunteerSchema = mongoose.Schema(config.DB_MODELS.volunteer);

    /* methods on model object */
    volunteerSchema.static('get_all_centers', function(callback){
        return this.find({}, callback);
    });
    volunteerSchema.static('get_by_center', function( _center, callback){
        return this.find({ center: _center}, callback);
    });
    volunteerSchema.static('delete_by_center', function(_center, callback){
        return this.deleteOne( { center: _center}, callback);
    });

    return volunteerSchema;
};

module.exports = schema;