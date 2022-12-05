module.exports.home = function(req,res){
    // return res.end('<h1> Express is up for cordial!');
    console.log(req.cookies);
    

    return res.render('home',{
        title:"home"
    })
}
// module.exports.actionname = function(req,res){}