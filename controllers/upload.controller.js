const path = require('path');

exports.uploadImage = (req, res) => {
    let filePath = req.file.path;
    if (filePath) {
        return res.send(path.basename(filePath));
    }
    return res.status(400)
                .setHeader({'Content-Type': 'image/pjpeg'})
                .send({ msg: "Error in uploading file!" });
}

exports.getImage = (req, res) => {
    let filename = req.params.name;

    if (filename) {
        return res.sendFile(path.resolve(`./uploads/${filename}`));
    }
    return res.status(404).send({ msg: "Image not found!" });
}