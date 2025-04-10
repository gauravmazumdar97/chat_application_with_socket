const jwt = require('jsonwebtoken');




const verifyToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  
  const token = authHeader.split(' ')[1]; // Extract the token after "Bearer"

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded token data (e.g., user ID) to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('JWT verification error:', error);
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = verifyToken;