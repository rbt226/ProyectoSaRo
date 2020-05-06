/*
Envío de Mails utilizando librería Nodemailer
 */

var nodemailer = require("nodemailer");

exports.sendEmail = (req, res) => {
    console.log("llego al back");

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

    var mailOptions = {
        from: "consultorios.del.parque2020@gmail.com",
        to: "consultorios.del.parque2020@gmail.com",
        subject: "Nuevo Contacto de: " + req.body.name,
        html: '<p>' + req.body.msg + '</p><p>&nbsp;</p><p>Firma:&nbsp;<strong>' + req.body.name + '</strong>&nbsp;</p><p>Email:&nbsp;<strong>' + req.body.mail + '</strong></p><p>&nbsp;</p>',
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            res.status(404).send({
                error: {
                    message: "Lo sentimos, el mensaje no fue enviado: ",
                },
            });
        } else {
            res.send({
                message: "Mensaje enviado! " + info,
            });
        }
    });
};