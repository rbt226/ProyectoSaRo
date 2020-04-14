var jwt = require("jsonwebtoken");

exports.updateElement = (element, tableName, idTable) => {
  var query = "";
  for (properties in element) {
    if (query != "" && element[properties]) {
      query = query + ",";
    }
    if (element[properties]) {
      query = query + properties + " = '" + element[properties] + "'";
    }
  }
  query =
    "UPDATE " + tableName + " SET " + query + " WHERE " + idTable + " = ?";

  return query;
};

exports.verifyToken = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Unauthorize Request");
  }
  const token = req.headers.authorization.split("")[1];
  if (token === "null") {
    return res.status(401).send("Unauthorize Request");
  }
  const payload = jwt.verify(token, "secretKey");
  req.userId = payload._id;
  next();
};
