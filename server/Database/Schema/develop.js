var config = require('../../config');
var schema = {};

schema.createSchema = function(mongoose){
    var developSchema = mongoose.Schema(config.DB_MODELS.develop);

    developSchema.static('get_all_projects', function(callback){
        return this.find({}, callback);
    });
    developSchema.static('delete_by_name', function( _name, callback){
        return this.deleteOne( { project: _name}, callback);
    });

    return developSchema;
};

module.exports = schema;