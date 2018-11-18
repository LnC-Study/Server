var render_myPage = function(req, res){
    console.log('# API called: Render myPage');
    console.log('Headers: ', req.headers);

    /* add get data from cookie / session
       -userName
    */
    return res.status(200).render('myPage/myPage');
}

module.exports.render_myPage = render_myPage;