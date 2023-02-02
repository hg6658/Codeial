var GitHubStrategy = require('passport-github').Strategy;
const passport = require('passport');
const crypto = require('crypto');
const User = require('../models/user');

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_SECRET_KEY,
    callbackURL: "http://localhost:8000/users/auth/github/callback",
  },
  function(accessToken, refreshToken, profile, done){
    // find a user
    User.findOne({email: String(profile.username)}).exec(function(err, user){
        if (err){console.log('error in finding user', err); return;}
        
        if (user){
            // if found, set this user as req.user
            return done(null, user);
        }else{
            // if not found, create the user and set it as req.user
            User.create({
                name: String(profile.displayName),
                email: String(profile.username),
                password: crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if (err){console.log('error in creating user ', err); return;}

                return done(null, user);
            });
        }

    }); 
}
));


module.exports = passport;