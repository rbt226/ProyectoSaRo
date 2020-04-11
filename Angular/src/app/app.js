var http = require("http");

var servidor = http.createServer(function (peticion, respuesta) {
  // peticion: hora, ip, url, navegador
  respuesta.writeHead(200, { "Content-type": "text/html" }); //cuando todo esta bien
  respuesta.write("Respuesta  para la direccion" + peticion.url); 
});

servidor.listen(3200); // aca le decis el puerto

console.log("ejecutando servidor");
