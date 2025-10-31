const express = require("express");
const router = express.Router();
const categorySubcategories = require("../utils/categorySubcategories");

router.get("/", (req, res) => {
  res.json(categorySubcategories);
});

module.exports = router;
