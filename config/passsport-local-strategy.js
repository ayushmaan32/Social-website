const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField : 'email',
     passReqToCallback : true
},function(req,email,password,done){
    //find a user and establish identity
    User.findOne({email:email},function(err,user){
        if(err){
            // console.log('error in finding user --> passport');
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password != password){
            // console.log('invalid username/password');
            req.flash('error','Invalid UserName/Password');
            return done(null,false);
        }
        return done(null,user);

    });
}
));

//serilazing the user to decide which user is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
});


//deserilazing the user from the key in cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('error in finding user --> passport');
            return done(err);
        }
        return done(null,user);
    }); 
});

//check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
    //if the user is signed in, then pass on the request to the next function(controllers's action)
    if(req.isAuthenticated()){
        return next();
    }
    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
       // req.user contains the cureent sign in user from the session cookie and we are just sending this to the local for the views
       res.locals.user = req.user;
        
    }
    next();
}




module.exports = passport;


