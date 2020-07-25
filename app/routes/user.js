var express = require("express");
var router = express.Router();

var user = require("../controllers/user.controller");

/* POST - Get a User By Email */
router.post("/byEmail", user.getUserByEmail);

/* POST - Sign In*/
router.post("/signIn", user.signIn);

/* POST - Sign Up*/
router.post("/signUp", user.signUp);

/* POST - Create a user */
router.post("/create", user.create);

/* POST - Update the user with the specific id */
router.post("/:id", user.updateById);

/* DELETE - Delete the user with the specific id */
router.delete("/:id", user.deleteById);

/* GET - Obtain the user with the specific id */
router.get("/:id", user.getUserById);

/* GET - Obtain all users. */
router.get("/", user.getAll);

/* DELETE - Delete all users */
router.delete("/", user.deleteAll);

module.exports = router; // esto exporta el modulo
