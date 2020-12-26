const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/upload.controller');
const db = require('../middlewares/db.middleware');

const storage = db.storage;

const upload = multer({storage});

const router = express.Router();

router.post("/", upload.single('image'), uploadController.uploadImage);

router.get("/:name", uploadController.getImage);

module.exports = router;