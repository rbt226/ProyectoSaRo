var createError = require('http-errors');
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cloudinary = require('cloudinary').v2;
var passport = require('passport');
var flash = require('connect-flash');

var roleRouter = require('./app/routes/role');
var permissionRouter = require('./app/routes/permission');
var occupationRouter = require('./app/routes/occupation');
var configRouter = require('./app/routes/configuration');
var userRouter = require('./app/routes/user');
var clientRouter = require('./app/routes/client');
var bookingRouter = require('./app/routes/booking');
var roomRouter = require('./app/routes/room');
var emailRouter = require('./app/routes/email');
var featureRouter = require('./app/routes/feature');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

require('./app/config/passport')(passport);

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/roles', roleRouter);
app.use('/permissions', permissionRouter);
app.use('/occupations', occupationRouter);
app.use('/configurations', configRouter);
app.use('/users', userRouter);
app.use('/clients', clientRouter);
app.use('/bookings', bookingRouter);
app.use('/rooms', roomRouter);
app.use('/email', emailRouter);
app.use('/features', featureRouter);

app.use(logErrors);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.log('.');
    console.log('****************');
    console.log('Codigo Error: ', err.code);
    console.log('-------------');
    console.log('Error: ', err.message);
    console.log('-------------');
    console.log('Codigo Stack: ', err.stack.errors ? err.stack.errors[0].message : '');
    console.log('****************');
    console.log('.');

    next(err);
}

function errorHandler(err, req, res, next) {
    delete err.stack;
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.json(err);
}
// cloudinary configuration
cloudinary.config({
    cloud_name: 'djbmfd9y6',
    api_key: '771838748496195',
    api_secret: 'yn9HS_biy7UuFGtTZVxhIytA7kg',
});

module.exports = app;