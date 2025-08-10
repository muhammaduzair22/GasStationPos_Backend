const express = require("express");
const router = express.Router();
const masterRecordController = require("../controllers/masterRecordController");
const { protect } = require("../middleware/authMiddleware");

router.use(protect());

router.post("/", masterRecordController.createRecord);
router.get("/", masterRecordController.getAllRecords);
router.get("/:id", masterRecordController.getRecordById);
router.put("/:id", masterRecordController.updateRecord);
router.delete("/:id", masterRecordController.deleteRecord);

module.exports = router;
