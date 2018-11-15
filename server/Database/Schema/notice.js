var config = require('../../config');
var schema = {};

schema.createSchema = function(mongoose){
    var noticeSchema = mongoose.Schema(config.DB_MODELS.notice);

    /* methods on model object */
    noticeSchema.static('get_all_notices', function(callback){
        return this.find({}, callback);
    });
    noticeSchema.static('get_by_number', function(_number, callback){
        return this.find({number: _number}, callback);
    });
    noticeSchema.static('delete_by_number', function(_number, callback){
        return this.deleteOne( {number: _number}, callback);
    });
    noticeSchema.static('get_notice_number', function(callback){
        return this.count() + 1;
    });

    return noticeSchema;
};

module.exports = schema;