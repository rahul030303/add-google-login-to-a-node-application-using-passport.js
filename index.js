// client id = 528010840966-k6dlpkubo777g6jcqmo58hv0cglh3b6d.apps.googleusercontent.com
//  client secret = lKXUFhzm_SLL_QHQeekOYnsI

const express = require('express');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');
const app = express();

app.get('/',(req,res)=>{
    res.send("<h1>Hello World</h1>");
})

const PORT = process.env.PORT || 5000;

passport.use(
    new googleStrategy({
        clientID:keys.googleClientId,
        clientSecret:keys.googleClientSecret,
        callbackURL:"/auth/google/callback"
    },
    (accessToken, refreshToken, profile, cb)=>{
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        console.log(cb);
        }
    )
)

app.get("/auth/google",passport.authenticate('google',{scope:['profile']} 
))

app.get("/auth/google/callback",passport.authenticate('google'),
    function (req,res){
        // console.log("successful authentication");
        res.redirect('/');
    }
)

app.listen(PORT,()=>{
    console.log("app is listening on port "+ PORT);
})


