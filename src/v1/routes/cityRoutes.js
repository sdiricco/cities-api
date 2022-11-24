const express = require("express");
const cityController = require("../../controllers/cityController");

const router = express.Router();

router.get("/", cityController.getCities);
router.get("/:_id", cityController.getCity);

module.exports = router;