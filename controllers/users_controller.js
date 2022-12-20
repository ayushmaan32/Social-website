const { use } = require('passport');
const User = require('../models/user');


module.exports.profile = function(req,res){
    // return res.end('<h1>profile is visible</h1>');

    User.findById(req.params.id, function(err,user){
        return res.render('users', {
            title : 'Users ',
            profile_user: user
        });
    })

    
};

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id , req.body, function(err,update){
          return res.redirect('back');
        })

    }else{
        return res.status(401).send('Unauthorized')
    }
}
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

    req.flash('success',"LoggIn Successfully")
    return res.redirect('/');

}
//sign out
module.exports.destroySession = function(req,res,next){
    // req.logout();
    // return res.redirect('/');
    
    req.logout(function(err) {
        req.flash('success'," Logged Out Successfully ")
        if (err) { return next(err); }
        res.redirect('/');
    })

}

