const {
    Strategy,
    ExtractJwt
} = require('passport-jwt');
const passport = require('passport');
const {
    user
} = require('../db/models')


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'luthfibitly.com';
opts.audience = 'luthfibitly';


passport.use(new Strategy(opts, async (jwt_payload, done) => {

    try {
        const data = await user.findOne({
            where: {
                username: jwt_payload.username
            }
        })

        if (data) {
            return done(null, data);
        } else {
            return done(null, false);
        }
    } catch (error) {
        return done(error, false);
    }
}))

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    user.findById(id, function(err,user) {
        done(err,user);
    });
  });

module.exports = passport;