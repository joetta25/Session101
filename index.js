var express = require('express');
var session = require('express-session');
var db = require('./models');
var ejs = require('ejs');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');


var app = express();

app.use(bodyParser.urlencoded({ extended: false }))
//initialize connect-session-sequelize

var SequelizeStore = require('connect-session-sequelize')(session.store);
 
//connect sequlize session to our DB

 var myStore = new SequelizeStore({
     db: db.sequelize
 });



// I am setting the store up to use myStore where we connect the DB details

app.use(session({
    secret: 'mySecret',
    resave: false,
    saveUninitialized: true,
    store: myStore
}));

myStore.sync();



// SETTING UP EJS
app.set('view engine','ejs');
app.set('views', 'app/views');


// Serving Static files 
app.use(express.static('public'));

// Setting up the routes 

// This route is checking to see if the user has a session in place already, 
app.get("/signup", (req,res) =>{
    if(req.session.user_id !== undefined){
        res.redirect("/welcome");
        return;
    }

  res.render('signup')
})

app.listen(3000, function () {
    console.log("listening on port 3000...")
  })
