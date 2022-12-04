module.exports.profile = function(req,res){
    // return res.end('<h1>profile is visible</h1>');

    return res.render('users', {
        title : 'Users '
    })
}