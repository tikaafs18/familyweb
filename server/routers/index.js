const userRouter = require('./user');
const addressRouter = require('./adress');

const router = require('express').Router();

router.use('/user', userRouter);
router.use('/address', addressRouter);

module.exports = router;