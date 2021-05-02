const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');

router.get('/', auth, stuffCtrl.getAllTrips);
router.post('/', auth, multer, stuffCtrl.createTrip);
router.get('/:id', auth, stuffCtrl.getOneTrip);
router.put('/:id', auth, multer, stuffCtrl.modifyTrip);
router.delete('/:id', auth, stuffCtrl.deleteTrip);

module.exports = router;
