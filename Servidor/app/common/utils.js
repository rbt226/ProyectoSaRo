var jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorize Request");
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log("emtrr ",req.headers.authorization);

  if (token === "null") {
    return res.status(401).send("Unauthorize Request");
  }
  const payload = jwt.verify(token, "secretKey");
  req.userId = payload._id;
  next();
};
