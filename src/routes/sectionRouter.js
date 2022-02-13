const sectionController = require('../controllers/sectionController');
const userMiddlewares = require('../middlewares/userMiddlewares');

const router = require('express').Router();

router.get('/sections', userMiddlewares.authorization, sectionController.index);
router.get('/course/:id/sections', userMiddlewares.authorization, sectionController.show);
router.post('/course/:courseId/section', userMiddlewares.authorization, sectionController.store);
router.put('/section/:sectionId', userMiddlewares.authorization, sectionController.update);
router.delete('/section/:sectionId', userMiddlewares.authorization, sectionController.delete);

module.exports = router;