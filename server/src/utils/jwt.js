const jwt = require("jsonwebtoken");

function generateToken(userId) {
  return jwt.sign({ userId }, "secret@123@toen_mytoken_$%#!", {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  return jwt.verify(token, "secret@123@toen_mytoken_$%#!", (err, decoded) => {
    if (err) {
      return {
        message: "Token is expired",
      };
    }
    return decoded;
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
