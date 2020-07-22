const roomDao = require("../dao/room.dao");
const cloudinary = require("cloudinary").v2;
const IncomingForm = require("formidable").IncomingForm;
const FileReader = require("filereader");
const utils = require("../common/utils");

exports.create = (req, res) => {
  const form = new IncomingForm({ multiples: true });
  form.parse(req, function (err, fields, files) {
    req.body = fields;
    const name = req.body.name;
    const response = "R07";
    roomDao.getRoomByName(name, (error, resp) => {
      if (error) return res.status(500).send(error);
      if (utils.isResponseOk(resp)) return res.send(utils.createWarningResponse(response, "Ya existe una sala con ese nombre"));
      // si no existe la sala continuo con el create
      req.body.images = ["Site/noImage"];
      roomDao.create(req, async (error, resp) => {
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
            const idRoom = resp.id_room;
            roomDao.updateById(idRoom, req, (error, resp) => {
              res.send(resp);
            });
          })
          .catch((error) => {
            console.log("Error al crear la sala al subir imágenes: ", error);
            res(utils.createErrorResponse(response, "Error al crear la sala"));
          });
      });
    });
  });
};

exports.getRoomById = (req, res) => {
  roomDao.getRoomById(req.params.id, (error, resp) => {
    if (error) return res.status(500).send(error);
    if (!utils.isResponseOk(resp)) return res.send(resp);
    let data = resp.data;
    const images = data.image_room.split("|");
    data.images = images;
    resp.data = data;
    res.send(resp);
  });
};

exports.updateById = (req, res) => {
  const id = req.params.id;
  roomDao.updateById(id, req, (error, resp) => {
    if (error) return res.status(500).send(error);
    res.send(resp);
  });
};

exports.deleteById = (req, res) => {
  roomDao.deleteById(req.params.id, (error, resp) => {
    if (error) return res.status(500).send(error);
    if (!utils.isResponseOk(resp)) return res.send(resp);

    const images = resp.data.image_room.split("|");
    // Se elimina la imagen de cloudinary si la imagen no es la default
    images.map((image) => {
      cloudinary.api.delete_resources(image, { invalidate: true, resource_type: "image" }, function (err, res) {
        if (err) {
          console.log("Error en cloudinary :", err);
        }
        console.log("Respuesta De cloudinary: ", res);
      });
    });
    res.send(resp);
  });
};

exports.getAll = (req, res) => {
  roomDao.getAll((error, resp) => {
    if (error) return res.status(500).send(error);
    let images;
    let result = [];
    resp.data.forEach((room) => {
      let values = room.dataValues;
      images = values.image_room.split("|");
      values.images = images;
      result.push(values);
    });
    resp.data = result;
    res.send(resp);
  });
};

exports.deleteAll = (req, res) => {
  roomDao.deleteAll((error, resp) => {
    if (error) return res.status(500).send(error);
    res.send(resp);
  });
};
