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
