var render_myPage = function(req, res){
    console.log('# API called: Render myPage');
    console.log('Headers: ', req.headers);

    return res.status(200).render('myPage').end();
}

module.exports.render_myPage = render_myPage;