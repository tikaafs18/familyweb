const express = require("express");
const { addressController } = require("../controllers");
const router = express.Router();

router.get('/all', addressController.get);
router.get('/province', addressController.getProvince);
router.get('/city', addressController.getCity);
router.get('/district', addressController.getDistrict);
router.get('/postalcode', addressController.getPostalcode);


module.exports = router ;