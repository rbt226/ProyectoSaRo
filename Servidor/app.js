var createError = require("http-errors");
var express = require("express");
const cors = require("cors");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cloudinary = require("cloudinary").v2;

var roleRouter = require("./app/routes/role");
var permissionRouter = require("./app/routes/permission");
var occupationRouter = require("./app/routes/occupation");
var configRouter = require("./app/routes/configuration");
var userRouter = require("./app/routes/user");
var clientRouter = require("./app/routes/client");
var bookingRouter = require("./app/routes/booking");
var roomRouter = require("./app/routes/room");
var emailRouter = require("./app/routes/email");

var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/roles", roleRouter);
app.use("/permissions", permissionRouter);
app.use("/occupations", occupationRouter);
app.use("/configurations", configRouter);
app.use("/users", userRouter);
app.use("/clients", clientRouter);
app.use("/bookings", bookingRouter);
app.use("/rooms", roomRouter);

app.use("/email", emailRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

// cloudinary configuration
cloudinary.config({
  cloud_name: "djbmfd9y6",
  api_key: "771838748496195",
  api_secret: "yn9HS_biy7UuFGtTZVxhIytA7kg",
});

module.exports = app;
