var config = require('../../config');
var crypto = require('crypto');

var schema = {};

schema.createSchema = function(mongoose){
    var userSchema = mongoose.Schema(config.DB_MODELS.user);

    /* password process */
    userSchema.method('encrypt_password', function( plainText, inSalt){
        if (inSalt)
            return crypto.createHmac( 'sha1', inSalt).update(plainText).digest('hex');
        else
            return crypto.createHmac( 'sha1', this.salt).update(plainText).digest('hex');
    });

    userSchema.method('make_salt', function(){
        return Math.round((new Date().valueOf() * Math.random())) + '';
    });

    userSchema.virtual('password').set( function(_password){
        this.password = _password;
        this.salt = this.make_salt();
        this.hashedPassword = this.encrypt_password( _password);
        console.log('Virtual password: ' + this.hashedPassword);
    }).get(function(){ return this.password});

    userSchema.method('authenticate', function(_plainText, _inSalt, _hashedPassword){
        if (_inSalt){
            console.log('Authenticate -> %s : %s', this.encrypt_password(_plainText, _inSalt), _hashedPassword);
            return this.encrypt_password(_plainText, _inSalt) == _hashedPassword;
        } else{
            console.log('Authenticate -> %s : %s', this.encrypt_password(plainText), this.hashedPassword);
            return this.encrypt_password(_plainText) == this.hashedPassword;
        }
    });

    /* validation */
    var valid_presenceOf = function( _value){
        return _value && _value.length;
    };

    userSchema.pre('save', function(next){
        if( !this.isNew) return next();

        if( !valid_presenceOf(this.password))
            next( new Error('Invalid password field'));
        else
            next();
    });

    userSchema.path('email').validate(function (_email) {
        return _email.length;
    }, 'No email column value');

    userSchema.path('hashedPassword').validate(function (_hashedPassword) {
        return _hashedPassword.length;
    }, 'No hashed_password column value');

    /* methods on model object */
    userSchema.static('find_by_email', function(_email, callback){
        return this.find({email: _email}, callback);
    });
    userSchema.static('delete_by_number', function(_number, callback){
        return this.deleteOne( {number: _number}, callback);
    });

    return userSchema;
};

module.exports = schema;