var render_develop = function(req, res){
    console.log('# API called: Get develops');

    var database = req.app.get('database');
    if( database.db){
        database.developModel.get_all_projects( function(err, result){
            if(err){
                console.log('Error occurred in finding projects');
                return res.status(500).json({error: 'Error occurred in finding projects'}).end();
            }

            var _output = [];
            for (var idx = 0; idx < result.length; idx++){
                _output.push({
                    project: result[i]._doc.project
                    , leader: result[i]._doc.leader
                    , description: result[i]._doc.description
                    , member: result[i]._doc.member
                    , personnel: result[i]._doc.personnel
                    , date: result[i]._doc.date
                })
            }

            return res.status(200).render('develop', {length: result.length,
                                                      data: _output}).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

var render_develop_project = function(req, res){
    console.log('# API called: Get project');

    var _submittedProject = req.params.project;
    var database = req.app.get('database');
    if( database.db){
        database.developModel.get_by_project( _submittedProject, function(err, result){
            if( err){
                console.log('Error occurred in finding project');
                return res.status(500).json({error: 'Error occurred in finding project'});
            }

            if( result.length == 0)
                return res.status(404).render('404Err').end();

            return res.status(200).render('project', {data: result._doc}).end();
        });
    }
    else
        return res.status(500).json({error:'Error occurred in loading database'}).end();
}

var register_develop_project = function(req, res){
    console.log('# API called: Register develop project');
    console.log('Headers: ', req.headers);

    //Validation
    //Token check
    //Authority check
    var _submittedProject = req.params.project;
    var _submittedProjectData = req.body;
    var database = req.app.get('database');
    if( database.db){
        var _projectData = new database.developModel({
            project: _submittedProject
            , leader: _submittedProjectData.leader
            , description: _submittedProjectData.description
            , personnel: _submittedProjectData.personnel
            , date: {
                startDate: _submittedProjectData.startDate
                , endDate: _submittedProjectData.endDate
            }
        });

        // Save project object
        _projectData.save( function(err){
            if(err)
                return res.status(500).json({error: 'Error occurred in creating develop model'}).end();
            console.log('# Successfully add develop data');
            console.log( _submittedProjectData);
            return res.status(201).end();
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
}

var apply_develop_project = function(req, res){

}

var delete_develop_project = function(req, res){

}

module.exports.render_develop = render_develop;
module.exports.render_develop_project = render_develop_project;
module.exports.register_develop_project = register_develop_project;
module.exports.apply_develop_project = apply_develop_project;
module.exports.delete_develop_project = delete_develop_project;