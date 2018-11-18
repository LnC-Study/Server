var config = require('../../config');
var schema = {};

schema.createSchema = function(mongoose){
    var boardSchema = mongoose.Schema( config.DB_MODELS.board);

    /* methods on model object */
    boardSchema.static('get_all_boards', function(callback){
        return this.find({}, callback);
    });
    boardSchema.static('get_by_number', function(_number, callback){
        return this.find({number:_number}, callback);
    });
    boardSchema.static('delete_by_number', function(_number, callback){
        return this.deleteOne( {number: _number}, callback);
    });
    boardSchema.static('get_board_number', function(callback){
        return this.count() + 1;
    });
    return boardSchema;
};

module.exports = schema;