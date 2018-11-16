var config = require('../../config');
var fileSystem = require('fs');
var render_main = function(req, res){
    console.log('# API called: Render main');
    var _carouselImage = [];
    var _noticesTop3 = [];
    var _volunteerTop3 = [];

    fileSystem.readdir('./Public/image/carousel', function(err, result){
        if(err)
            console.log('There`s no carousel image file');
        console.log(result);
        for(var idx = 0; idx < result.length; idx++)
            _carouselImage.push('./Public/image/carousel/' + result[idx]);

        console.log('\tCarousel images: ' + _carouselImage);
        // read notice & volunteer data from database
        var database = req.app.get('database');
        if( database.db){
            database.noticeModel.get_all_notices(function(err, result){
                if(err)
                    console.log('Error occurred in finding notices');
                if( result && result.length > 0){
                    for( var idx = 0; idx < result.length; idx++){
                        _noticesTop3.push( result._doc[idx]);
                        if( idx == config.MAIN_NOTICES) break;
                    }
                }
            });

            database.volunteerModel.get_all_centers( function(err, result){
                if(err)
                    console.log('Error occurred in finding notices');
                if( result && result.length > 0){
                    for( var idx = 0; idx < result.length; idx++){
                        _volunteerTop3.push( result._doc[idx]);
                        if( idx == config.MAIN_VOLUNTEERS) break;
                    }
                }

                res.status(200).render('main/index.ejs', {carouselData: _carouselImage
                    , noticeData: _noticesTop3
                    , volunteerData: _volunteerTop3});
            });
        }


    });
};

module.exports.render_main = render_main;