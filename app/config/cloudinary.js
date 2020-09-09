const cloudinary = require('cloudinary');
const dotenv = require('dotenv');

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploads = (file, index, folder, public_id) => {
    public_id = `${public_id}_${index}`;
    return new Promise((resolve) => {
        cloudinary.uploader.upload(
            file,
            (result) => {
                resolve({
                    url: result.url,
                    id: result.public_id,
                });
            }, {
                resource_type: 'auto',
                folder,
                public_id,
            }
        );
    });
};
exports.deleteImages = (resources) => {
    console.log('resources ', resources);

    return new Promise((resolve, reject) => {
        cloudinary.v2.api.delete_resources(resources, { invalidate: true, resource_type: 'image' }, (err, res) => {
            if (err) {
                return reject(err);
            }
            resolve(res);
        });
    });
};