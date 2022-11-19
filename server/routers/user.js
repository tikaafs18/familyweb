const express = require("express");
const { userController, addressController } = require("../controllers");
const router = express.Router();

router.get('/all', userController.all);
router.post('/add', userController.add, addressController.add, userController.addDad, userController.addMom, userController.addFamily, userController.addChild);

module.exports = router;