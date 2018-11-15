var render_board = function(req, res){
    console.log('# API called: Get boards');

    var database = req.app.get('database');
    if (database.db){
        database.boardModel.get_all_boards( function(err, result){
            if(err){
                console.log('Error occurred in finding boards');
                return res.status(500).json({error: 'Error occurred in finding boards'}).end();
            }

            var _output = [];
            for (var idx = 0; idx < result.length; idx++){
                _output.push({
                    number: result[idx]._doc.number
                    , writer: result[idx]._doc.writer
                    , title: result[idx]._doc.title
                    , description: result[idx]._doc.description
                    , createdAt: result[idx]._doc.createdAt
                })
            }

            return res.status(200).render('board',{length: result.length,
                                                    data: _output}).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

var write_board = function(req, res){
    console.log('# API called: Write board');
    console.log('Headers: ', req.headers);

    //Validation
    //Token check
    //Authority check
    var _submittedBoardData = req.body;
    var database = req.app.get('database');
    if (database.db){
        _boardNumber = database.boardModel.get_board_number();
        var _boardData = new database.boardModel({
            number: _boardNumber
            , writer: _submittedBoardData.writer
            , title: _submittedBoardData.title
            , description: _submittedBoardData.description
        });

        // Save board object
        _boardData.save( function(err){
            if (err)
                return res.status(500).json({error: 'Error occurred in creating board model'}).end();
            console.log('# Successfully add board data');
            console.log( _submittedBoardData);
            return res.status(201).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

var render_board_number = function(req, res){
    console.log('# API called: Get board');

    var _submittedBoardNumber = req.params.number;
    if (!_submittedBoardNumber || isNaN(_submittedBoardNumber))
        return res.status(404).render('404Err').end();

    var database = req.app.get('database');
    if (database.db){
        database.boardModel.get_by_number(_submittedBoardNumber, function(err, result){
            if(err){
                console.log('Error occurred in finding boards');
                return res.status(500).json({error: 'Error occurred in finding boards'}).end();
            }

            return res.status(200).render('board',{data : result[0]._doc}).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

module.exports.render_board = render_board;
module.exports.write_board = write_board;
module.exports.render_board_number = render_board_number;