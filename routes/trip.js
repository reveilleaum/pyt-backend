const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const tripCtrl = require('../controllers/trip');

router.get('/', auth, tripCtrl.getAllTrips);
router.post('/', auth, multer, tripCtrl.createTrip);
router.get('/:id', auth, tripCtrl.getOneTrip);
router.put('/:id', auth, multer, tripCtrl.modifyTrip);
router.delete('/:id', auth, tripCtrl.deleteTrip);

module.exports = router;
