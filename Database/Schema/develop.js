var config = require('../../config');
var schema = {};

schema.createSchema = function(mongoose){
    var developSchema = mongoose.Schema(config.DB_MODELS.develop);

    /* methods on model object */
    developSchema.static('get_all_projects', function(callback){
        return this.find({}, callback);
    });
    developSchema.static('get_by_project', function(_project, callback){
        return this.find({project: _project}, callback);
    });
    developSchema.static('delete_by_project', function( _project, callback){
        return this.deleteOne( { project: _project}, callback);
    });
    developSchema.static('get_center_number', function(callback){
        return this.count() + 1;
    });
    return developSchema;
};

module.exports = schema;