var config = require('../../config');
var schema = {};

schema.createSchema = function(mongoose){
    var boardSchema = mongoose.Schema( config.DB_MODELS.board);

    boardSchema.static('get_all_posts', function(callback){
        return this.find({}, callback);
    });
    boardSchema.static('delete_by_number', function(_number, callback){
        return this.deleteOne( {number: _number}, callback);
    });
};

module.exports = schema;