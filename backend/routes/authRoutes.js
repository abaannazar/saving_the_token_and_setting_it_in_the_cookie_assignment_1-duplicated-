const express = require('express');
const router = express.Router();
const { createToken, verifyToken } = require('../controllers/authController');

router.get('/generate', createToken);     // GET: /api/auth/generate
router.get('/verify', verifyToken);       // GET: /api/auth/verify

module.exports = router;
