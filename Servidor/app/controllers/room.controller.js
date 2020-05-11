const roomDao = require("../dao/room.dao");
const cloudinary = require("cloudinary").v2;
const IncomingForm = require("formidable").IncomingForm;
const FileReader = require("filereader");

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const form = new IncomingForm({ multiples: true });
  form.parse(req, function (err, fields, files) {
    req.body = fields;
    req.body.images = ["default"];
    // Save Room in the database
    roomDao.create(req, async (error, data) => {
      if (error)
        res.status(500).send({
          error,
        });
      else {
        let publicIds = [];
        if (!files.file.length) {
          //Si solamente viene un file, lo convierto en un array para poder recorrerlo
          files.file = [files.file];
        }
        const upload_res = files.file.map(
          (f) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(f);
              reader.onload = () => {
                const dataUri = reader.result;
                if (dataUri) {
                  cloudinary.uploader.upload(dataUri, function (err, res) {
                    if (err) {
                      console.log("Error en cloudinary al dar de alta la imagen :", err);
                      reject(error);
                    } else {
                      console.log("Se ha creado la imagen en cloudinary correctamente ", JSON.stringify(res));
                      publicIds.push(res.public_id);
                      resolve(res.public_id);
                    }
                  });
                }
              };
            })
        );
        // Promise.all will fire when all promises are resolved
        Promise.all(upload_res)
          .then((result) => {
            console.log("publicsId ", publicIds);
            req.body.images = publicIds;
            const idRoom = data.id_room;
            roomDao.updateById(idRoom, req, (error, data) => {
              res.send(data);
            });
          })
          .catch((error) => {
            /*  handle error */
          });
      }
    });
  });
};

// Retrieve all Rooms from the database.
exports.getAll = (req, res) => {
  roomDao.getAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else {
      let images;
      let result = [];
      data.forEach((room) => {
        let values = room.dataValues;
        images = values.image_room.split("|");
        values.images = images;
        result.push(values);
      });
      res.send(result);
    }
  });
};

exports.getRoomById = (req, res) => {
  roomDao.getRoomById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Room con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else {
      let values = data.dataValues;
      const images = values.image_room.split("|");
      values.images = images;
      res.send(values);
    }
  });
};

exports.deleteById = (req, res) => {
  roomDao.deleteById(req.params.id, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: {
            message: `No se encontro Sala con el identificador ${req.params.id}.`,
          },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else {
      const images = data.dataValues.image_room.split("|");
      console.log("images ", images);
      // Se elimina la imagen de cloudinary si la imagen no es la default
      images.map((image) => {
        console.log("image ", image);
        cloudinary.api.delete_resources(image, { invalidate: true, resource_type: "image" }, function (err, res) {
          if (err) {
            console.log("Error en cloudinary :", err);
          }
          console.log("Respuesta De cloudinary: ", res);
        });
      });

      res.send({ message: `Sala eliminada correctamente` });
    }
  });
};

exports.deleteAll = (req, res) => {
  roomDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send({ message: `All Rooms were deleted successfully! - ${data}` });
  });
};

exports.updateById = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      error: { message: "Content can not be empty!" },
    });
  }
  const id = req.params.id;
  roomDao.updateById(id, req, (error, data) => {
    if (error) {
      if (error.kind === "not_found") {
        res.status(404).send({
          error: { message: `No se encontro Room con el identificador ${id}.` },
        });
      } else {
        res.status(500).send({
          error,
        });
      }
    } else res.send({ message: `Room was updated successfully!` });
  });
};
