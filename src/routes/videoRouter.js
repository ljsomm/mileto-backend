const videoController = require('../controllers/videoController');
const userMiddlewares = require('../middlewares/userMiddlewares');
const multer = require('multer')(require('../config/multer').video);
const router = require('express').Router();

router.get('/videos', videoController.index);
router.post('/section/:id/video', userMiddlewares.authorization, multer.single('course-video'), videoController.store);
router.post('/video/:id/user', userMiddlewares.authorization, videoController.associate);
router.put('/video/:id', userMiddlewares.authorization, multer.single('course-video'), videoController.update);
router.delete('/video/:id', userMiddlewares.authorization, videoController.delete);

module.exports = router;