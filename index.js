const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
//used for session cookie
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passsport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
// const MongoStore = require('connect-mongo')(session);
const MongoStore = require('connect-mongo');
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
const customMware = require('./config/middleware');





app.use(sassMiddleware({
    src:'./assets/scss',
    dest:'./assets/css',
    debug:true,
    outputStyle:"extended",
    prefix:'/css'
}))
app.use(express.urlencoded());
app.use(cookieParser());


app.use(express.static('./assets'));
// make the uploads path available  to the browser
app.use('/uploads',express.static(__dirname + '/uploads'));


app.use(expressLayouts);
// extract style and script from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);




app.set('view engine', 'ejs');
app.set('views', './views');
//mongo store is used to store session cookie in db
app.use(session({
    name: 'codial',
    //TODO change the secret before deployment in production mode
    secret: 'blahblah',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl: 'mongodb://localhost/codial_development',
            autoRemove: 'disabled'
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);



//use express router
app.use('/', require('./routes'));



app.listen(port, function (err, data) {
    if (err) {
        console.log(`error in runnig the server: ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});