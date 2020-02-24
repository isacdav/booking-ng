const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user');
const RentalCtrl = require('../controllers/rental');

router.get('/secret', UserCtrl.authMiddleware, RentalCtrl.secret);

router.get('/manage', UserCtrl.authMiddleware, RentalCtrl.getRentalsByUser);

router.get('/:rentalId', RentalCtrl.getRental);

router.patch('/:id', UserCtrl.authMiddleware, RentalCtrl.updateRental);

router.delete('/:id', UserCtrl.authMiddleware, RentalCtrl.deleteRental);

router.post('', UserCtrl.authMiddleware, RentalCtrl.crateRental);

router.get('', RentalCtrl.getRentals);

module.exports = router;
