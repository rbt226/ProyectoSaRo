var express = require('express');
var router = express.Router();
var passport = require('passport');
const jwt = require('jsonwebtoken');
const upload = require('../config/multer');

var user = require('../controllers/user.controller');
var client = require('../controllers/client.controller');


/* POST - Sign Up*/
router.post('/signUp', upload.single('file'), client.signUp);

/* POST - Get a User By Email */
router.post('/byEmail', user.getUserByEmail);

/* POST - Sign In*/
router.post('/signIn', user.signIn);

/* POST - Create a user */
router.post('/create', user.create);

/* POST - Update the user with the specific id */
router.post('/:id', user.updateById);

/* DELETE - Delete the user with the specific id */
router.delete('/:id', user.deleteById);

/* GET - Obtain the user with the specific id */
router.get('/:id', user.getUserById);

/* GET - Obtain all users. */
router.get('/', user.getAll);

/* DELETE - Delete all users */
router.delete('/', user.deleteAll);

router.post(
    '/login',
    passport.authenticate('local-login', {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash: true,
    })
);

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: 'http://localhost:4200/' }), (req, res) => {
    try {
        const { state } = req.query;
        console.log('------------------SET TOKEN-------', req.user.dataValues.id_user);

        // const { returnTo } = JSON.parse(new Buffer(state, 'base64').toString());
        const returnTo = "http://localhost:4200/";
        if (typeof returnTo === 'string') {
            res.data = jwt.sign({ _id: req.user.dataValues.id_user }, "secretKey");
            console.log('------------------REQ-------', res.data);
            return res.redirect(returnTo);
        }
    } catch {
        // just redirect normally below
    }
    res.redirect('/');
});

// router.get(
//     '/auth/google/callback',
//     passport.authenticate('google', {
//         successRedirect: 'http://localhost:4200/',
//         failureRedirect: 'http://localhost:4200/',
//     }),

//     setTokenCookie
// );

function setTokenCookie(req, res) {
    console.log('------------------SET TOKEN-------', JSON.stringify(req));
}

module.exports = router; // esto exporta el modulo