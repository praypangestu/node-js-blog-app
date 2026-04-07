const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key'; // Harus sama dengan sebelumnya

module.exports = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ error: 'Access denied' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    res.status(403).json({ error: 'Invalid token' });
  }
};