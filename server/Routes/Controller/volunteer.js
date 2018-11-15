var render_volunteer = function(req, res){
    console.log('# API called: Get centers');

    var database = req.app.get('database');
    if (database.db){
        database.volunteerModel.get_all_centers( function(err, result){
            if( err){
                console.log('Error occurred in finding centers');
                return res.status(500).json({error: 'Error occurred in finding centers'}).end();
            }

            var _output = [];
            for (var idx = 0; idx < result.length; idx++){
                _output.push({
                    number: result[idx]._doc.number
                    , center: result[idx]._doc.center
                    , location: result[idx]._doc.location
                    , leader: result[idx]._doc.leader
                    , description: result[idx]._doc.description
                    , member: result[idx]._doc.member
                    , date: result[idx].date
                    , weeklyRecord: result[idx].weeklyRecord
                })
            }

            return res.status(200).render('volunteer', {length: result.length,
                                                        data: _output}).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

var render_volunteer_center = function(req, res){
    console.log('# API called: Get center');

    var _submittedCenter = req.params.center;
    var database = req.app.get('database');
    if( database.db){
        database.volunteerModel.get_by_center( _submittedCenter, function(err, result){
            if(err){
                console.log('Error occurred in finding center');
                return res.status(500).json({error: 'Error occurred in finding center'}).end();
            }

            if( result.length == 0)
                return res.status(404).render('404Err').end();

            return res.status(200).render('center', {data: result._doc}).end();
        })
    }
}

var register_volunteer_center = function(req, res){
    console.log('# API called: Register volunteer center');
    console.log('Headers: ', req.headers);

    //Validation
    //Token check
    //Authority check
    var _submittedCenter = req.params.center;
    var _submittedCenterData = req.body;
    var database = req.app.get('database');
    if( database.db){
        var _centerNumber = database.volunteerModel.get_volunteer_number();
        var _centerData = new database.volunteerModel({
            number: _centerNumber
            , center: _submittedCenter
            , location: _submittedCenterData.location
            , leader: _submittedCenterData.leader
            , description: _submittedCenterData.description
            , personnel: _submittedCenterData.personnel
            , date: {
                startDate : _submittedCenterData.startDate
                , endDate: _submittedCenterData.endDate
            }
        });

        // Save volunteer object
        _centerData.save( function(err){
            if(err)
                return res.status(500).json({error: 'Error occurred in creating model'}).end();
            console.log('# Successfully add volunteer data');
            console.log( _submittedCenterData);
            return res.status(201).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

var apply_volunteer_center = function(req, res){

}

var delete_volunteer_center = function(req, res){

}

module.exports.render_volunteer = render_volunteer;
module.exports.render_volunteer_center = render_volunteer_center;
module.exports.register_volunteer_center = register_volunteer_center;
module.exports.apply_volunteer_center = apply_volunteer_center;
module.exports.delete_volunteer_center = delete_volunteer_center;