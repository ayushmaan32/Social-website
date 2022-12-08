const User = require('../models/user');


module.exports.profile = function(req,res){
    // return res.end('<h1>profile is visible</h1>');

    return res.render('users', {
        title : 'Users '
    })
};
// render the sign up  page
module.exports.signUp = function(req,res){
    
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }



    return res.render('user_sign_up',{
        title: " codial | sign up"
    })
};
// render the sign in page
module.exports.signIn = function(req,res){

    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in',{
        title: " codial | sign in"
    })
};

// get the sign up data
module.exports.create = function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email : req.body.email},function(err,user){
        if(err){
            console.log('error in finding user in sign up');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating in sign up');
                    return;
                }  
                
                return res.redirect('/users/sign-in');
            })
        }
        else{
            return res.redirect('back');
        }

    })



}
//sign in and create a session for the user
module.exports.createSession = function(req,res){
    return res.redirect('/');

}
//sign out
module.exports.destroySession = function(req,res,next){
    // req.logout();
    // return res.redirect('/');
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/');
    })

}