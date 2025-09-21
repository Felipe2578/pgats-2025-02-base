const express = require('express');
const router = express.Router();
const checkoutController = require('../controllers/checkoutController');
const authenticateJWT = require('../middleware/auth');

// Protect checkout routes with JWT authentication
router.post('/', authenticateJWT, checkoutController.checkout);

module.exports = router;
