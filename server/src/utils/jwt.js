const jwt = require("jsonwebtoken");

function generateToken(userId) {
  return jwt.sign({ userId }, "secret@123@toen_mytoken_$%#!", {
    expiresIn: "1d",
  });
}

function verifyToken(token) {
  return jwt.verify(token, "secret@123@toen_mytoken_$%#!");
}

module.exports = {
  generateToken,
  verifyToken,
};
