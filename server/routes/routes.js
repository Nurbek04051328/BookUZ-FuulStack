const express = require('express');
const router = express.Router();
const API = require("../controllers/book");
const multer = require('multer');

//multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
})

let upload = multer({
    storage: storage,
}).single("image");

router.get("/", API.fetchAllBook);
router.get("/:id", API.fetchBookBYID);
router.post("/", upload, API.createBook);
router.patch("/:id", upload, API.updateBook);
router.delete("/:id", API.deleteBook);

module.exports = router;