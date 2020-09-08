
const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

//
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  //User.findById(id, function(err, user) {
    done(null, user);
  //});
});
//

passport.use(new GoogleStrategy({
    clientID: "576219748492-nsi2lemsel4j225g7u03n614e3bm06in.apps.googleusercontent.com",
    clientSecret: "-dFxrSSBHcWolm99H5QdDcvh",
   callbackURL: "http://localhost:8000/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    
    // });
     done(null, profile);
    console.log(done(null, profile))
  }
));


//


 