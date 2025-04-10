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





module.exports = { createToken };