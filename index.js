const express = require('express');
const app = express();
const port = 8000;

//use express router
app.use('/',require('./routes'));

app.set('view engine','ejs');
app.set('views', './views');


app.listen(port,function(err,data){
    if(err){
        console.log(`error in runnig the server: ${err}`);

    }
    console.log(`Server is running on port: ${port}`);
});