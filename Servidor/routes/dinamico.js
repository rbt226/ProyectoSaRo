var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/:datoURL/:masParametros", function (req, res, next) { // SI o si debe recibir dos parametros
  //info dinamica
  res.send(
    "info Dinamica " + req.params.datoURL + " " + req.params.masParametros
  );
});
module.exports = router; // esto exporta el modulo
