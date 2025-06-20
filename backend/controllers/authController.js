const jwt = require('jsonwebtoken');

exports.createToken = (req, res) => {
  const payload = {
    id: 1,
    username: 'kalvianUser'
  };

  // Encrypt / sign the token
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    algorithm: process.env.JWT_ALGORITHM,
    expiresIn: '1h'
  });

  console.log('🔐 Encrypted Token:', token);

  res.json({ message: 'Token created successfully', token });
};

exports.verifyToken = (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) return res.status(400).json({ error: 'Token is required' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('🔓 Decrypted Data:', decoded);
    res.json({ message: 'Token verified successfully', data: decoded });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
};
