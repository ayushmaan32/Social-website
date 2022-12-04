module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for cordial!');

    return res.render('home',{
        title:"home"
    })
}
// module.exports.actionname = function(req,res){}