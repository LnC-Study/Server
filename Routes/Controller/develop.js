var render_develop = function(req, res){
    console.log('# API called: Get develops');

    var database = req.app.get('database');
    if( database.db){
        database.developModel.get_all_projects( function(err, result){
            if(err){
                console.log('Error occurred in finding projects');
                return res.status(500).end();
            }

            var _output = {};
            for (var idx = 0; idx < result.length; idx++){
                var _curSemester = result[idx]._doc.semester;

                if( _curSemester in _output == false)
                    _output._curSemester = [];

                _output[_curSemester].push( result[idx]._doc)
            }

            return res.status(200).render('develop', {data:_output});
        });
    }
    else
        return res.status(500).json({error: 'Error occurred in loading database'}).end();
};

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
                return res.status(404).render('404Err');

            return res.status(200).render('project', result._doc);
        });
    }
    else
        return res.status(500);
};

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
            , semester: _submittedProjectData.semester
            , leader: _submittedProjectData.leader
            , description: _submittedProjectData.description
            , personnel: _submittedProjectData.personnel
        });

        // Save project object
        _projectData.save( function(err){
            if(err)
                return res.status(500).end();
            console.log('# Successfully add develop data');
            console.log( _submittedProjectData);
            return res.status(201).end();
        });
    }
    else
        return res.status(500).end();
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