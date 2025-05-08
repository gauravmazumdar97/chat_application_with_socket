const jwt = require('jsonwebtoken');



/**
 * Function to create a JWT token
 * @param {Object} payload - The data to encode in the token (e.g., user ID, email)
 * @param {String} secret - The secret key to sign the token
 * @param {Object} options - Additional options for the token (e.g., expiration time)
 * @returns {String} - The generated JWT token
 */
const createToken = (payload, secret, options = {}) => {
  return jwt.sign(payload, secret, options);
};

/**
 * Function to verify a JWT token
 * @param {String} token - The JWT token to verify
 * @param {String} secret - The secret key to verify the token
 * @returns {Object} - The decoded token payload if valid
 * @throws {Error} - If token is invalid or expired
 */
const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};

module.exports = {
  createToken,
  verifyToken,
};