var render_notice = function(req, res){
    console.log('# API called: Get notices');

    var database = req.app.get('database');
    if( database.db){
        database.noticeModel.get_all_notices( function(err, result){
            if(err){
                console.log('Error occurred in finding notices');
                return res.status(500).end();
            }

            var _output = [];
            for (var idx = 0; idx < result.length; idx++){
                _output.push(result[idx]._doc);
            }

            return res.status(200).render('notice', {noticeData: _output}).end();
        });
    }
    else
        return res.status(500).end();
}

var write_notice = function(req, res){
    console.log('# API called: Write notice');
    console.log('Headers: ', req.headers);

    //Validation
    //Token check
    //Authority check
    _submittedNoticeData = req.body;
    var database = req.app.get('database');
    if (database.db){
        _noticeNumber = database.noticeModel.get_notice_number();
        var _noticeData = new database.noticeModel({
            number: _noticeNumber
            , writer: _submittedNoticeData.writer
            , title: _submittedNoticeData.title
            , description: _submittedNoticeData.description
        });

        // Save notice object
        _noticeData.save( function(err){
            if (err)
                return res.status(500).json({error: 'Error occurred in creating board model'}).end();
            console.log('# Successfully add notice data');
            console.log( _submittedNoticeData);
            return res.status(201).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

var render_notice_number = function(req, res){
    console.log('# API called: Get notice');

    var _submittedNoticeNumber = req.params.number;
    if( !_submittedNoticeNumber || isNaN(_submittedNoticeNumber))
        return res.status(404).render('404Err').end();

    var database = req.app.get('database');
    if( database.db){
        database.noticeModel.get_by_number( _submittedNoticeNumber, function(err, result){
            if(err){
                console.log('Error occurred in finding notices');
                return res.status(500).json({error: 'Error occurred in finding model'}).end();
            }

            return res.status(200).render('notice', {data: result._doc[0]}).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

module.exports.render_notice = render_notice;
module.exports.write_notice = write_notice;
module.exports.render_notice_number = render_notice_number;