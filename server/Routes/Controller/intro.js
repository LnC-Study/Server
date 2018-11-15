var render_intro = function(req, res){
    console.log('# API called: Render intro');
    console.log('Headers: ', req.headers);

    return res.status(200).render('intro').end();
}

module.exports.render_intro = render_intro;