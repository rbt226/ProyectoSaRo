const roomDao = require("../dao/room.dao");
const cloudinary = require("cloudinary").v2;
const IncomingForm = require("formidable").IncomingForm;
const FileReader = require("filereader");

exports.create = (req, res) => {
  const form = new IncomingForm({ multiples: true });
  form.parse(req, function (err, fields, files) {
    req.body = fields;
    const name = req.body.name;
    roomDao.getRoomByName(name, (error, data) => {
      if (error) return res.status(500).send(error);
      if (data.code.indexOf("W") === -1)
        // si no existe la sala continuo con el create
        return result(null, utils.createWarningResponse(response, "Ya existe una sala con ese nombre"));

      req.body.images = ["Site/noImage"];
      roomDao.create(req, async (error, data) => {
        if (error) return res.status(500).send(error);
        let publicIds = [];
        if (!files.file.length) {
          //Si solamente viene un file, lo convierto en un array para poder recorrerlo
          files.file = [files.file];
        }
        let index = 1;
        const upload_res = files.file.map(
          (f) =>
            new Promise((resolve, reject) => {
              const reader = new FileReader();
              reader.readAsDataURL(f);
              reader.onload = () => {
                const dataUri = reader.result;
                const publicId = req.body.name + "_" + index;
                index++;
                if (dataUri) {
                  cloudinary.uploader.upload(dataUri, { public_id: publicId, tags: "Salas", folder: "Salas" }, function (err, res) {
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
            req.body.images = publicIds;
            const idRoom = data.id_room;
            roomDao.updateById(idRoom, req, (error, data) => {
              res.send(data);
            });
          })
          .catch((error) => {
            console.log("Error al crear la sala al subir imágenes: ", error);
            result(utils.createErrorResponse(response, "Error al crear la sala"));
          });
      });
    });
  });
};

exports.getRoomById = (req, res) => {
  roomDao.getRoomById(req.params.id, (error, data) => {
    if (error) return res.status(500).send(error);
    if (data.code.indexOf("W") !== -1) return res.send(data);

    let values = data.dataValues;
    const images = values.image_room.split("|");
    values.images = images;
    res.send(data);
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  roomDao.updateById(id, req, (error, data) => {
    if (error) return res.status(500).send(error);
    if (data.code.indexOf("W") !== -1) return res.send(data);
    res.send(data);
  });
};

exports.deleteById = (req, res) => {
  roomDao.deleteById(req.params.id, (error, data) => {
    if (error) return res.status(500).send(error);
    if (data.code.indexOf("W") !== -1) return res.send(data);

    const images = data.dataValues.image_room.split("|");
    // Se elimina la imagen de cloudinary si la imagen no es la default
    images.map((image) => {
      cloudinary.api.delete_resources(image, { invalidate: true, resource_type: "image" }, function (err, res) {
        if (err) {
          console.log("Error en cloudinary :", err);
        }
        console.log("Respuesta De cloudinary: ", res);
      });
    });
    res.send(data);
  });
};

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

exports.deleteAll = (req, res) => {
  roomDao.deleteAll((error, data) => {
    if (error)
      res.status(500).send({
        error,
      });
    else res.send({ message: `All Rooms were deleted successfully! - ${data}` });
  });
};
