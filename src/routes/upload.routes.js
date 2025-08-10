const express = require("express");
const router = express.Router();
const { upload, uploadExcel } = require("../controllers/uploadController");

router.post("/upload-excel", upload, uploadExcel);

module.exports = router;
