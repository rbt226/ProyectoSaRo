var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const User = require('../models/user.model');
var configAuth = require('./auth');

module.exports = function(passport) {
    // Serializa al usuario para almacenarlo en la sesión
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // Deserializa el objeto usuario almacenado en la sesión para
    // poder utilizarlo
    passport.deserializeUser(function(obj, done) {
        done(null, obj);
    });

    passport.use(
        'local-signup',
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            function(req, email, userName, password, done) {
                process.nextTick(function() {
                    User.findOne({ where: { email: email } })
                        .then((user) => {
                            if (user) return done(null, false, req.flash('signupMessage', 'That email already taken'));
                            else {
                                var newUser = {
                                    userName,
                                    email,
                                    password: newUser.generateHash(password),
                                    image_user: 'Site/defaultUser',
                                    active_user: 1,
                                    id_role: 1,
                                    created_at: new Date(),
                                };
                                User.create(newUser)
                                    .then((newUser) => {
                                        return done(null, newUser);
                                    })
                                    .catch((error) => {
                                        throw error;
                                    });
                            }
                        })
                        .catch((error) => {
                            return done(error);
                        });
                });
            }
        )
    );

    passport.use(
        'local-login',
        new LocalStrategy({
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true,
            },
            function(req, email, password, done) {
                process.nextTick(function() {
                    User.findOne({ where: { email: email } }, function(err, user) {
                        if (err) return done(err);
                        if (!user) return done(null, false, req.flash('loginMessage', 'No User found'));
                        if (!user.validPassword(password)) {
                            return done(null, false, req.flash('loginMessage', 'invalid password'));
                        }
                        return done(null, user);
                    });
                });
            }
        )
    );

    passport.use(
        new GoogleStrategy({
                clientID: configAuth.googleAuth.clientID,
                clientSecret: configAuth.googleAuth.clientSecret,
                callbackURL: configAuth.googleAuth.callbackURL,
            },
            function(accessToken, refreshToken, profile, done) {
                process.nextTick(function() {
                    User.findOne({ where: { provider_id: profile.id, provider: profile.provider } })
                        .then((user) => {
                            if (user) return done(null, user);
                            else {
                                var newUser = {
                                    provider: profile.provider,
                                    provider_id: profile.id,
                                    provider_token: accessToken,
                                    user_name: profile.emails[0].value,
                                    email: profile.emails[0].value,
                                    image_user: profile.photos[0] ? profile.photos[0].value : 'Site/defaultUser',
                                    active_user: 1,
                                    id_role: 1,
                                    created_at: new Date(),
                                };
                                User.create(newUser)
                                    .then((newUser) => {
                                        return done(null, newUser);
                                    })
                                    .catch((error) => {
                                        throw error;
                                    });
                            }
                        })
                        .catch((error) => {
                            return done(error);
                        });
                });
            }
        )
    );
};