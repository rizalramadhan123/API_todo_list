const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Ambil token dari header
  const token = req.header('Authorization');

  // Cek apakah ada token
  if (!token || !token.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Mengambil token tanpa kata 'Bearer'
    const decoded = jwt.verify(token.split(' ')[1], process.env.JWT_SECRET);
    req.user = decoded;  // Menyimpan user ID dari token ke req.user
    next();  // Lanjut ke middleware atau endpoint berikutnya
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = authMiddleware;
