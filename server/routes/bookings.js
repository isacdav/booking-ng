const express = require('express');
const router = express.Router();
const UserCtrl = require('../controllers/user');
const BookingCrtl = require('../controllers/booking');

router.post('', UserCtrl.authMiddleware, BookingCrtl.createBooking);

module.exports = router;
