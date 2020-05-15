/*
Envío de Mails utilizando librería Nodemailer
 */

var nodemailer = require("nodemailer");
const utils = require("./utils");

var from = "consultorios.del.parque2020@gmail.com";
var to = null;
var subject = null;
var msg = null;
var newPass = null;

exports.sendEmail = (req, res) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com ",
    port: 465,
    auth: {
      user: "consultorios.del.parque2020@gmail.com",
      pass: "Facil12.",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  if (req.body.action == "contact") {
    to = "consultorios.del.parque2020@gmail.com";
    subject = "Nuevo Contacto de: " + req.body.name;
    msg =
      "<p>" +
      req.body.msg +
      "</p><p>&nbsp;</p><p>Firma:&nbsp;<strong>" +
      req.body.name +
      "</strong>&nbsp;</p><p>Email:&nbsp;<strong>" +
      req.body.mail +
      "</strong></p><p>&nbsp;</p>";
  } else {
    newPass = generatePassword();
    to = req.body.to;
    subject = "Consultorios del Parque - Olvide mi contraseña ";
    msg =
      '<p>Hola,</p> <p> Recibimos tu solicitud para cambiar tu contraseña.</p> <p> Por favor ingresa a <a href = "https://delparqueconsultorios.com" target = "_blank" > consultoriosdelparque.com </a> con la siguiente contraseña:</p> <p> <strong> ' +
      newPass +
      " </strong></p> <p> ¡Recuerda cambiarla enseguida! </p>";
  }

  var mailOptions = {
    from,
    to,
    subject,
    html: msg,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    const response = "E01";
    if (error) return res.status(500).send(utils.createErrorResponse(response, "Lo sentimos, el mensaje no fue enviado, por favor inténtelo más tarde"));
    return res.send(utils.createSuccessResponse(response, "El correo se ha enviado correctamente"));
  });
};

function generatePassword() {
  var length = 6,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}
