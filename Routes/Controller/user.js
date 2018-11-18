const mongoose = require('mongoose');
var config = require('../../config');

var authorize_user = function(req, res){
    console.log('# API called: Authorize user');
    console.log('Headers: ', req.headers);

    // Validation
    // Token check
    // Authority check

    // Session
    mongoose.connect( config.DB_URL);

    var _submittedUserData = req.body;
    var database = req.app.get('database');
    if( database.db){
        database.userModel.find_by_email()
    }

    if( database.db){
        database.UserModel.findByEmail(_submittedUserData.email, function(err, results){
            if(err)
                return res.status(500).end();

            if( results.length > 0){
                console.log('Find user matched with %s', _submittedUserData.email);
                var _user = new database.userModel({email: _submittedUserData.email});
                var AUTHENTICATED = _user.authenticate( _submittedUserData.password,
                                                        results[0]._doc.salt, results[0]._doc.hashedPassword);
                var _userData = {userName: results[0]._doc.userName,
                                authority: results[0]._doc.authority};
                // Token?

                if( AUTHENTICATED){
                    console.log('Password match!');
                    req.session.logined = true;
                    req.session.userEmail = results[0]._doc.email;
                    // 작업중 ~
                    return res.status(200).json({data: _userData}).end();
                }
                else{
                    console.log('Password unmatch!');
                    return res.status(400).end();
                }
            }
            else
                return res.status(500).end();
        });
    }
    else
        return res.status(500).end();
}

var register_user = function(req, res){
    console.log('# API called: Register user');

    var _submittedUserData = req.body;

    var database = req.app.get('database');
    if( database.db){
        var _userData = new database.userModel({
            email: _submittedUserData.email
            , userName: _submittedUserData.userName
            , hashedPassword: _submittedUserData.password
        });

        // Save user object
        _userData.save( function(err){
            if(err)
                return res.status(500);
            console.log('# Successfully register user data');
            console.log( _submittedUserData);
            return res.status(201);
        });
    }
    else
        return res.status(500).end();
}

var render_signIn = function(req, res){
    console.log('# API called: Render intro');
    console.log('Headers: ', req.headers);
    return res.render('./myPage/signIn');
};

var render_signUp = function(req,res){
    console.log('# API called: Render intro');
    console.log('Headers: ', req.headers);
    return res.render('./myPage/signUp');
};

var logout_user = function(req, res){
    req.session.destroy();
    res.redirect('/');
};

module.exports.authorize_user = authorize_user;
module.exports.register_user = register_user;
module.exports.render_signIn = render_signIn;
module.exports.render_signUp = render_signUp;
module.exports.logout_user = logout_user;