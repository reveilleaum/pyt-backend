const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const activityCtrl = require('../controllers/activity');

router.get('/', auth, activityCtrl.getAllActivities);
router.post('/', auth, multer, activityCtrl.createActivity);
router.get('/:id', auth, activityCtrl.getOneActivity);
router.put('/:id', auth, multer, activityCtrl.modifyActivity);
router.delete('/:id', auth, activityCtrl.deleteActivity);

module.exports = router;
